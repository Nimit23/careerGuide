# CareerGuide Project Setup

This document outlines the initial setup process and the technology stack used for the CareerGuide project.

## 1. Technology Stack

The project is built with a modern, type-safe stack:

-   **Framework**: [Next.js](https://nextjs.org/) (v14 with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **API Layer**: [tRPC](https://trpc.io/) for end-to-end typesafe APIs.
-   **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) for efficient data fetching, caching, and state management.
-   **Database**: [SQLite](https://www.sqlite.org/index.html) for local development.
-   **ORM**: [Prisma](https://www.prisma.io/) for type-safe database access.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
-   **Linting**: [ESLint](https://eslint.org/) for code quality.

## 2. Setup Process Summary

The following steps were performed to initialize the project:

1.  **Repository Initialization**:
    -   Cloned the empty public GitHub repository: `https://github.com/Nimit23/careerGuide`.
    -   Renamed the local project directory to `careerguide` to comply with npm naming conventions.

2.  **Next.js Scaffolding**:
    -   A new Next.js application was created using `create-next-app`.
    -   The project was configured with TypeScript, Tailwind CSS, ESLint, the `src/` directory, and the App Router.

3.  **Dependency Installation**:
    -   Installed core dependencies for tRPC, TanStack Query, and Prisma:
        -   `@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@trpc/next`
        -   `@tanstack/react-query`
        -   `@prisma/client`
        -   `prisma` (as a dev dependency)
        -   `superjson` and `zod` for tRPC data transformation and validation.

4.  **Prisma (ORM & Database) Configuration**:
    -   Initialized Prisma using `npx prisma init`.
    -   Modified `prisma/schema.prisma` to use the `sqlite` provider.
    -   The database URL was set to a local file: `file:./dev.db`.
    -   The `.env` file was updated to reflect that `DATABASE_URL` is not needed for the SQLite setup.

5.  **tRPC & TanStack Query Integration**:
    -   **Server-Side**:
        -   Created a reusable Prisma client instance at `src/server/db.ts`.
        -   Set up the core tRPC configuration, context, and procedures in `src/server/api/trpc.ts`.
        -   Created the main tRPC router file at `src/server/api/root.ts`.
        -   Exposed the tRPC router via a Next.js API route handler at `src/app/api/trpc/[trpc]/route.ts`.
    -   **Client-Side**:
        -   Created a typed tRPC client at `src/trpc/client.ts`.
        -   Created a shared utility file `src/trpc/shared.ts` for the API URL and data transformer.
        -   Created the `TRPCReactProvider` at `src/trpc/react.tsx` to wrap the application and provide the tRPC and TanStack Query clients.
        -   Wrapped the root layout (`src/app/layout.tsx`) with the `TRPCReactProvider`.

6.  **Initial Commit & Deployment**:
    -   All the setup files were committed to the local Git repository.
    -   The local repository was pushed to the `main` branch on GitHub.
    -   The development server was started using `npm run dev`.

## 3. Getting Started

To run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Nimit23/careerGuide.git
    cd careerguide
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run database migrations** (after defining your schema):
    ```bash
    npx prisma migrate dev
    ```

4.  **Start the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.
