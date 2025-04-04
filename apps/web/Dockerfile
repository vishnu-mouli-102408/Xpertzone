FROM node:lts-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:lts-alpine AS installer
WORKDIR /app
COPY --from=pruner /app/out/full .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM node:lts-alpine AS builder
# used for remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm install -g pnpm
RUN pnpm run build


# Development Stage
FROM node:lts-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
RUN npm install -g pnpm
COPY --from=installer /app/ .
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]

# Production Stage
FROM node:lts-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY --from=builder /app/ .
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "start"]




# docker run --rm -it --entrypoint sh image_name