# XpertZone

A modern monorepo project built with Next.js, TypeScript, and Turborepo.

## Project Structure

### Apps

- `web`: Main Next.js web application
- `webrtc`: WebRTC implementation for real-time communication
- `ws`: WebSocket server for real-time features
- `worker`: Background job processing

### Shared Packages

- `ui`: Shared React component library
- `api`: API utilities and types
- `db`: Database configurations and models
- `email`: Email service integration
- `common`: Shared utilities and constants
- `cache`: Caching layer implementation
- `rate-limit`: Rate limiting functionality

### Development Tools

- `eslint-config`: Shared ESLint configuration
- `prettier-config`: Shared Prettier configuration
- `typescript-config`: Shared TypeScript configuration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (for local development)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages and apps
pnpm build
```

### Docker Setup

```bash
# Start all services using Docker Compose
docker-compose up -d
```

## Development

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all packages and applications
- `pnpm lint`: Run ESLint across all packages
- `pnpm format`: Format code using Prettier

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, WebSocket, WebRTC
- **Database**: (Check docker-compose.yml for specific database)
- **Tools**: Turborepo, pnpm, Docker
- **Code Quality**: ESLint, Prettier, Husky

## License

MIT
