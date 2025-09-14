'use client';

import React from 'react';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

type ChatViewProps = {
  selectedSessionId: string | null;
};

const ChatView = ({ selectedSessionId }: ChatViewProps) => {
  if (!selectedSessionId) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-900 text-gray-400">
        <p>Select a chat to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <MessageHistory selectedSessionId={selectedSessionId} />
      <MessageInput selectedSessionId={selectedSessionId} />
    </div>
  );
};

export default ChatView;
