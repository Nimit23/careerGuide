'use client';

import React from 'react';
import { api } from '@/trpc/react';
import { type inferProcedureOutput } from '@trpc/server';
import { type AppRouter } from '@/server/api/root';

type ChatSession = inferProcedureOutput<AppRouter['chat']['listSessions']>[number];

type SidebarProps = {
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string) => void;
};

const Sidebar = ({ selectedSessionId, setSelectedSessionId }: SidebarProps) => {
  const { data: sessions, refetch } = api.chat.listSessions.useQuery();
  const createSession = api.chat.createSession.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleNewChat = () => {
    const title = prompt('Enter a title for the new chat:');
    if (title) {
      createSession.mutate({ title });
    }
  };

  return (
    <div className="h-full w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <ul className="space-y-2">
        {sessions?.map((session: ChatSession) => (
          <li key={session.id}>
            <button
              onClick={() => setSelectedSessionId(session.id)}
              className={`w-full text-left p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedSessionId === session.id ? 'bg-gray-700' : ''
              }`}
            >
              {session.title}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNewChat}
        className="w-full mt-4 p-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        + New Chat
      </button>
    </div>
  );
};

export default Sidebar;
