# XpertZone Web Application

This is a modern web application built with Next.js 15, TypeScript, and a robust tech stack for optimal performance and developer experience.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Authentication**: Clerk
- **State Management**:
  - Zustand for client-side state
  - TanStack Query for server state
- **API Layer**: tRPC
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Real-time Features**: Socket.IO
- **Analytics**: Vercel Analytics
- **Image Management**: Cloudinary
- **Date Handling**: date-fns
- **Notifications**: Sonner
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── app/          # Next.js app router pages and layouts
├── components/   # Reusable React components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── store/        # Zustand store configurations
├── trpc/         # tRPC router and client setup
├── types/        # TypeScript type definitions
└── constants/    # Application constants
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- Docker (for local development)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Check TypeScript types
- `pnpm clean` - Clean build artifacts

## 🏗️ Development

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Best Practices

1. Follow the TypeScript strict mode guidelines
2. Use proper type definitions for all components and functions
3. Implement proper error handling
4. Write clean and maintainable code
5. Follow the established project structure

## 🔐 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

## 📦 Dependencies

The project uses workspace dependencies from the monorepo:

- `@repo/api`
- `@repo/cache`
- `@repo/common`
- `@repo/db`
- `@repo/email`
- `@repo/rate-limit`
- `@repo/ui`

## 🚢 Deployment

The application is configured for deployment on Vercel. The deployment process is automated through the Vercel platform.

## 📝 License

This project is proprietary and confidential.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
