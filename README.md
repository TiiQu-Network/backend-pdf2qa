# backend-pdf2qa

Backend for the PDF converter. We validate PDFs of articles and journals and pass them to our AI model, before retreiving Q&A responses and storing them on the database. User payment options are supported.

## Installation

Use yarn to install node modules.

```bash
yarn install
```

## Usage

Ensure to add `.env` file with reference to `.env.template`.

### Develop locally with `serverless-offline` plugin

`yarn sls-local` will start a HTTP server on your local machine that emulates AWS Lambda and AWS API Gateway:

Example:
```
❯ yarn sls-dev
yarn run v1.22.19
$ sls offline --reloadHandler -s dev
(node:25321) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.

Please migrate your code to use AWS SDK for JavaScript (v3).
For more information, check the migration guide at https://a.co/7PzMCcy
(Use `node --trace-warnings ...` to show where the warning was created)
✔ serverless-better-credentials: credentials resolved from config ini profile: AWS_DEFAULT_PROFILE (default)

Starting Offline at stage dev (eu-west-2)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * ping: ping
           * authorizer: authorizer

   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                                                                              │
   │   GET  | http://localhost:3000/                                              │
   │   POST | http://localhost:3000/2015-03-31/functions/ping/invocations         │
   │   POST | http://localhost:3000/authorizer                                    │
   │   POST | http://localhost:3000/2015-03-31/functions/authorizer/invocations   │
   │                                                                              │
   └──────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```

Use curl to make a GET request to the `ping` lambda:
```
❯ curl http://localhost:3000/
{"message":"pong"}%
```

### Deploy to AWS

To deploy lambdas to AWS run `sls-deploy`.

### Run Docker

Initialise database connection with `docker-compose build` followed by `docker-compose up`.

## Project Best Practices

### Git

We use Gitflow https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

main => dev => feature branches

### Style

Code with reference to https://github.com/goldbergyoni/nodebestpractices#1-project-architecture-practices
