#!/bin/bash

set -e
S3_BUCKET=ks-static-assets
CLOUDFRONT_ID=EH0YGOZRL8UI3

hugo -b https://static.fiks.ks.no/teknisk-dokumentasjon/

# Sync to s3
aws s3 sync public s3://$S3_BUCKET/teknisk-dokumentasjon --delete

# Invalidate cloudfront cache
# Set AWS_PAGER, or else program is not returning exit code, as seen here
# https://github.com/aws/aws-cli/issues/4973
AWS_PAGER="" aws cloudfront create-invalidation \
--distribution-id ${CLOUDFRONT_ID} \
--paths /teknisk-dokumentasjon/*


git reset