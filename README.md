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
docker pull ghcr.io/next-orders/api:latest

# or use the specific version
docker pull ghcr.io/next-orders/api:v0.1.0
```

You need to use env variables:

```text
API_URL= # URL of this Main API

DATABASE_URL= # PostgreSQL connection URL for Prisma

JWT_SECRET= # Secret string
JWT_EXPIRATION_TIME= # Example, "30d"

AWS_ACCESS_KEY_ID= # S3 Config
AWS_SECRET_ACCESS_KEY= # S3 Config
AWS_S3_REGION= # S3 Config
AWS_S3_BUCKET_NAME= # S3 Config
CUSTOM_S3_ENDPOINT= # Optional

DEMO_AUTH_EMAIL= # Optional, used on Command Center Login Page
DEMO_AUTH_PASS= # Optional, used on Command Center Login Page
```

Check **.env.example** in root dir for more info about env.

On Kubernetes you can use health check of container:

```yaml
livenessProbe:
  httpGet:
    port: 4001
    path: /api/health
  initialDelaySeconds: 20
  periodSeconds: 30
```

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/v1/blob/main/LICENSE) file for details.
