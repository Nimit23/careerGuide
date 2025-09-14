'use client';

import React from 'react';
import { api } from '@/trpc/react';
import { type inferProcedureOutput } from '@trpc/server';
import { type AppRouter } from '@/server/api/root';

type Message = inferProcedureOutput<AppRouter['chat']['getMessages']>[number];

type MessageHistoryProps = {
  selectedSessionId: string;
};

const MessageHistory = ({ selectedSessionId }: MessageHistoryProps) => {
  const { data: messages } = api.chat.getMessages.useQuery({
    sessionId: selectedSessionId,
  });

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="space-y-4">
        {messages?.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageHistory;
