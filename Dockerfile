# Base image for building
FROM node:20-alpine AS builder

# Enable corepack (includes pnpm)
RUN corepack enable

# Set working directory
WORKDIR /usr/src/app

# Copy package manager files first (better caching)
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the monorepo
COPY . .

# Build the project (if necessary)
RUN pnpm run build

# Final production image
FROM node:20-alpine AS runner

# Enable corepack (includes pnpm)
RUN corepack enable

WORKDIR /usr/src/app

# Copy built files and installed dependencies
COPY --from=builder /usr/src/app ./

# Ensure node_modules exist (only production dependencies)
RUN pnpm install --prod --ignore-scripts

# Expose port
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "dev:docker"]
