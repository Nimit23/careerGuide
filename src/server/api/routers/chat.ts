import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const chatRouter = createTRPCRouter({
  listSessions: publicProcedure.query(({ ctx }) => {
    return ctx.db.chatSession.findMany();
  }),

  getMessages: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: { sessionId: input.sessionId },
        orderBy: { createdAt: 'asc' },
      });
    }),

  createSession: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.chatSession.create({
        data: {
          title: input.title,
        },
      });
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        text: z.string(),
        sender: z.enum(['user', 'assistant']),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          sessionId: input.sessionId,
          text: input.text,
          sender: input.sender,
        },
      });
    }),
});
