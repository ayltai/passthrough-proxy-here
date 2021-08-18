# Here API pass-through proxy server

[![GitHub workflow status](https://img.shields.io/github/workflow/status/ayltai/passthrough-proxy-here/CI?style=flat)](https://github.com/ayltai/passthrough-proxy-here/actions)
![Maintenance](https://img.shields.io/maintenance/yes/2021)
[![Release](https://img.shields.io/github/release/ayltai/passthrough-proxy-here.svg?style=flat)](https://github.com/ayltai/passthrough-proxy-here/releases)
[![License](https://img.shields.io/github/license/ayltai/passthrough-proxy-here.svg?style=flat)](https://github.com/ayltai/passthrough-proxy-here/blob/master/LICENSE)

A pass-through proxy to communicate with [Here](https://darksky.net) API server.

## How it works

It acts as a simple web proxy that sends all requests it receives to `https://[service].search.hereapi.com`. You may need to send your secret key to the proxy if it is a protected API. Check the official [documentation](https://developer.here.com/documentation/).

The proxy runs on AWS Lambda.

## Supported APIs

* `/v1/autocomplete`
* `/v1/geocode`

## Setup

[Terraform](https://www.terraform.io) is used for deployment on AWS.

### Development

[LocalStack](https://localstack.cloud) is used to provide local AWS services.

**Requirements**

* [Docker](https://www.docker.com)

**Steps**

1. Start LocalStack
   ```shell
   docker run --rm -it -p 4566:4566 -p 4571:4571 -e "SERVICES=iam,lambda,apigateway,cloudwatch,logs,sts" localstack/localstack
   ```
2. Run Terraform scripts
   ```shell
   cd terraform/local
   terraform init
   terraform apply -auto-approve
   ```
3. Take note of the outputs when Terraform completes. Example:
   ```shell
   Outputs:

   rest_api_url = "http://localhost:4566/restapis/7rujauhl95/api/_user_request_"
   ```
4. Test the deployed endpoint
   ```shell
   curl http://localhost:4566/restapis/7rujauhl95/api/_user_request_/v1/autocomplete/v1/autocomplete?apiKey=aaaabbbbcccc&q=Pariser+2+Frank
   ```

### Production

**Requirements**

* Have an AWS account ready. We will need the Access and Secret Keys to run the Terraform scripts.
* Have a Terraform account ready. We will need it to store the Terraform states.

**Steps**

1. Run Terraform scripts
   ```shell
   cd terraform/remote
   terraform init
   terraform apply -auto-approve
   ```
2. Take note of the outputs when Terraform completes
3. Test the deployed endpoint
