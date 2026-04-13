# AWS Migration Instructions

This document outlines all the terminal commands executed to migrate the `react-portfolio` web application to AWS using Amazon S3 (static hosting), CloudFront (CDN + HTTPS), ACM (SSL certificate), and Route 53 (DNS logic). It serves as a reference for future automated deployments or re-configurations.

> **Note on Environment:**  
> During the deployment, an environment variable `AWS_EC2_METADATA_DISABLED=true` was prepended to some `aws` commands to bypass local network timeouts on MacOS when the AWS CLI incorrectly tries to fetch EC2 IMDSv2 metadata.

---

### Step 1: Prepare the Static Build
We must resolve dependencies and compile the single-page application into static HTML/JS/CSS assets.

```bash
# 1. Install Node.js package dependencies
yarn install

# 2. Build the production-optimized files into the `/build` folder
yarn build
```

---

### Step 2: Establish the Object Storage (S3)
S3 simply hosts our flat `.html`, `.js`, and `.css` files.

```bash
# 1. Create the S3 bucket to perfectly match the target DNS name.
aws s3api create-bucket \
    --bucket nsethi.me \
    --region us-east-1

# 2. Disable default 'Block Public Access' blockades.
aws s3api delete-public-access-block \
    --bucket nsethi.me

# 3. Inject a Bucket Policy that strictly allows everyone (Principal "*") to `s3:GetObject` on all objects inside the bucket.
aws s3api put-bucket-policy \
    --bucket nsethi.me \
    --policy '{"Version":"2012-10-17","Statement":[{"Sid":"PublicReadGetObject","Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::nsethi.me/*"}]}'

# 4. Enable Static Web Hosting, and configure 404/Error requests to intelligently feed back into 'index.html' (useful for SPAs).
aws s3api put-bucket-website \
    --bucket nsethi.me \
    --website-configuration '{"IndexDocument":{"Suffix":"index.html"},"ErrorDocument":{"Key":"index.html"}}'

# 5. Iteratively upload the local `.build/` folder cleanly into our S3 bucket.
aws s3 sync build/ s3://nsethi.me --delete
```

---

### Step 3: SSL / TLS Automation (ACM)
We provision an Amazon SSL certificate in `us-east-1` (obligatory for CloudFront edge distribution) spanning both the root domain and the `www` hostname.

```bash
# 1. Request the certificate using DNS verification.
aws acm request-certificate \
  --domain-name nsethi.me \
  --subject-alternative-names www.nsethi.me \
  --validation-method DNS \
  --region us-east-1 \
  --output json

# 2. Get the unique verification tokens needed for Step 3.2.
aws acm describe-certificate \
  --certificate-arn <certificate-arn> \
  --region us-east-1 \
  --query "Certificate.DomainValidationOptions" 
  
# 3. Submit the resulting DNS verification (CNAME) tokens natively via Route 53.
aws route53 change-resource-record-sets \
  --hosted-zone-id <hosted-zone-id> \
  --change-batch '{ "Changes": [{ "Action": "UPSERT", "ResourceRecordSet": { "Name": "...", "Type": "CNAME", "TTL": 300, "ResourceRecords": [{"Value": "..."}] } }] }'
```

---

### Step 4: Content Delivery Network (CloudFront)
A CloudFront distribution securely terminates SSL, heavily caches assets globally at Edge nodes, and directs traffic to the insecure S3 bucket endpoint.

Instead of provisioning a brand new distribution, the CLI retrieved the architecture of your previously-provisioned inactive `nsethi.me` CloudFront instance, modified its manifest dynamically, and re-uploaded it.

```bash
# 1. Look up any existing distributions associated with 'nsethi.me'.
aws cloudfront list-distributions

# 2. Pull down the exact active configuration schema of that distribution ID.
aws cloudfront get-distribution-config \
    --id E5LI5XZNWARVJ \
    --output json > existing-cf-config.json

# 3. Push the deeply updated JSON file which includes:
#    - Mapping to the new S3 bucket (`nsethi.me.s3-website-us-east-1.amazonaws.com`)
#    - Redirects for 403 & 404s dynamically triggering 200 `index.html` responses.
#    - Binding the new Validated SSL `ACMCertificateArn`.
aws cloudfront update-distribution \
    --id E5LI5XZNWARVJ \
    --distribution-config file://new-cf-config.json \
    --if-match "E1S8M918W3ROLK"
```

---

### Step 5: Domain Routing (Route 53)
Map the user-friendly addresses perfectly onto the `d1rhub0gtsm37w.cloudfront.net` origin generated above.

```bash
# Update A (IPv4) and AAAA (IPv6) Alias Records for the APEX address (nsethi.me) and Subdomain (www.nsethi.me).
aws route53 change-resource-record-sets \
  --hosted-zone-id Z08862522SALP1VPU19KJ \
  --change-batch file://r53-changes.json 
```

*(Where `r53-changes.json` contained an action to heavily map the `CloudFront` AliasTarget using the universal CloudFront zone id: `Z2FDTNDATAQYW2`)*

---

### Step 6: Testing
Verify the deployments globally over local cURLs mapping HTTP -> HTTPS redirection flawlessly.

```bash
curl -I -s https://nsethi.me
curl -I -s http://nsethi.me
```