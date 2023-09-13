# backend-pdf2qa

Backend for the PDF converter. We validate PDFs of articles and journals and pass them to our AI model, before retreiving Q&A responses and storing them on the database. User payment options are supported.

## Installation

Use yarn to install node modules.

```bash
yarn install
```

## Usage

Ensure to add `.env` file with reference to `.env.template`.

To ensure developers use the same environment and to make use of Docker images, it is preferred to use Docker.

### Run on local machine

If you run on local be sure to locally install all the tools you need, e.g. Postgres.

Run `yarn run dev`.

### Run on Docker

Run `docker-compose build` followed by `docker-compose up`.

Run `curl localhost:8080/ping` to check your connection.

## Project Best Practices

### Git

We use Gitflow https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

main => dev => feature branches

### Style

Code with reference to https://github.com/goldbergyoni/nodebestpractices#1-project-architecture-practices
