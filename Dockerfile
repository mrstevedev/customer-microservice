ARG NODE_VERSION=21.6.2
ARG PNPM_VERSION=9.5.0

FROM node:${NODE_VERSION}-alpine

RUN addgroup app && adduser -S -G app app

USER app

# Create app directory
WORKDIR /app

# Copy package.json and pnpm.lock
COPY package.json pnpm-lock.yaml ./

# ## Need the --platform to be linux because otherwise it will build for M1 and not work on the server
# FROM --platform=linux/amd64 node:16.3.0

USER root

RUN chown -R app:app .

# Install pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

COPY prisma ./prisma/

# RUN eval $(grep '^DATABASE_URL' ../.env)

# Generate prisma client
RUN npx prisma generate

# Install app dependencies
RUN pnpm install

# Copy app source code
COPY . .

# # Expose port 3000
EXPOSE 4000

# # Run the app
CMD pnpm run dev:customer