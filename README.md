# backend-pdf2qa

Backend for the PDF converter. We validate PDFs of articles and journals and pass them to our AI model, before retreiving Q&A responses and storing them on the database. User payment options are supported.

## Installation

Use yarn to install node modules.

```bash
yarn install
```

## Usage

Ensure to add `.env` file with reference to `.env.template`.

### Run lambdas on local machine

To run the lambda 'ping' locally (for example) run `func=ping yarn sls-local`.

To deploy lambdas to AWS run `sls-deploy`.

### Run Docker

Initialise database connection with `docker-compose build` followed by `docker-compose up`.

## Project Best Practices

### Git

We use Gitflow https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

main => dev => feature branches

### Style

Code with reference to https://github.com/goldbergyoni/nodebestpractices#1-project-architecture-practices
