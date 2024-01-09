FROM --platform=linux/amd64 node:20-alpine AS base

FROM base AS build
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS production
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .

RUN npm install --omit=dev

COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "dist/src/main"]
