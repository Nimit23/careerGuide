import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

/**
 * This wraps the `appRouter` and creates a REST API endpoint for it.
 *
 * @see https://trpc.io/docs/router
 */
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
  });

export { handler as GET, handler as POST };
