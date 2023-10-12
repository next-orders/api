FROM --platform=linux/amd64 node:20-alpine AS base

FROM base AS development

WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

FROM base AS production

WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Prisma init
COPY /prisma ./

# Install production dependencies.
# If you have a package-lock.json, speedier builds with 'npm ci', otherwise use 'npm install --only=production'
RUN npm ci --only=production && npx prisma generate

# Bundle app source
COPY . .

# Copy the bundled code
COPY --from=development /app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]
