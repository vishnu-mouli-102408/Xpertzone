FROM node:lts-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=webrtc --docker

FROM node:lts-alpine AS installer
WORKDIR /app
COPY --from=pruner /app/out/json .
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

FROM node:lts-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app/ .
WORKDIR /app/apps/webrtc
CMD ["pnpm", "start"]