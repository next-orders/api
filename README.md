# API
Frontend needs data from backend: categories, products, checkouts, etc.

This part of product is for first frontend: https://github.com/next-orders/v1

![next-orders-entities](https://github.com/next-orders/api/blob/main/.github/next-orders-entities.png?raw=true)

## Stack

- Node.js
- NestJS
- Express
- Prisma ORM
- TypeScript
- PostgreSQL as DB

## How to develop

Clone this repo and use standard commands:

```shell
npm i

# Development
npm run start

# Watch mode
npm run start:dev
```

One moment: default port is 4001

## How to test

```shell
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## How to deploy

You can use latest Docker Image:

```shell
docker pull ghcr.io/next-orders/api:main
```

Work in progress, so there are no configs for now.
