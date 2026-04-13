# AWS Migration Architecture

Below is the detailed architectural flow for the deployed `react-portfolio` on AWS. 

It highlights the full user request lifecycle: from DNS resolution with Route 53, through the globally distributed CloudFront Edge network with SSL termination, down to the scalable S3 storage backend with Single-Page Application (SPA) error handling.

```mermaid
flowchart TD
    %% Define Styles
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:white;
    classDef client fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef s3 fill:#3F8624,stroke:#232F3E,stroke-width:2px,color:white;
    classDef cf fill:#8C4FFF,stroke:#232F3E,stroke-width:2px,color:white;
    classDef r53 fill:#F58536,stroke:#232F3E,stroke-width:2px,color:white;
    classDef acm fill:#DD344C,stroke:#232F3E,stroke-width:2px,color:white;

    %% Nodes
    User(("🌐 Internet User\n(Browser)")):::client

    subgraph AWS_Global ["🌍 AWS Global Edge Network"]
        DNS["🗺️ Route 53\n(Hosted Zone: nsethi.me)"]:::r53
        CF["⚡ CloudFront Distribution\n(d1rhub0gtsm37w.cloudfront.net)"]:::cf
        ACM["🔒 ACM (Certificate Manager)\n(us-east-1)"]:::acm
    end

    subgraph AWS_Region ["🇺🇸 AWS Region (us-east-1)"]
        S3["🪣 S3 Bucket\n(nsethi.me.s3-website-us-east-1.amazonaws.com)"]:::s3
    end

    %% Connections
    User -- "1. Types https://nsethi.me" --> DNS
    DNS -- "2. Resolves A/AAAA Alias\nto CloudFront Edge IP" --> User
    
    User -- "3. HTTPS Request" --> CF
    CF -. "4. Enforces TLS/SSL" .- ACM
    
    CF -- "5a. Cache Hit (Fast Response)" --> User
    CF -- "5b. Cache Miss (Fetch Origin)" --> S3
    
    S3 -- "6. Returns index.html, js, css" --> CF
    
    %% Handling SPA fallbacks
    S3 -. "If 404 (React Route e.g. /about)" .-> CF
    CF -. "Intercepts 404/403\nRewrites to 200 OK + index.html" .-> User
```

### Flow Breakdown

1. **Route 53 (DNS):** A user types `nsethi.me` or `www.nsethi.me`. Route 53 uses an `Alias (A / AAAA)` record to smoothly route the user to the nearest CloudFront Edge location.
2. **CloudFront (CDN):** CloudFront receives the request.
   - It references **AWS Certificate Manager (ACM)** to securely terminate the SSL connection (`HTTPS`).
   - Any raw `HTTP` requests are forcefully given a `301 Redirect` back to `HTTPS`.
3. **Amazon S3 (Origin):** If CloudFront does not have the asset cached natively, it executes a fetch to the S3 Bucket configured for Static Website Hosting.
4. **SPA Fallback (React Router):** Because React relies on client-side routing, directly visiting a link like `/about` natively throws a `404 Not Found` in S3. CloudFront's **Custom Error Responses** catch these `403` and `404` errors, mutating them into a `200 OK`, and returning the root `index.html` file so React can render the page correctly!
