'use client';

import React, { useState } from 'react';
import { api } from '@/trpc/react';

type MessageInputProps = {
  selectedSessionId: string;
};

const MessageInput = ({ selectedSessionId }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const utils = api.useUtils();

  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      utils.chat.getMessages.invalidate({ sessionId: selectedSessionId });
      setMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage.mutate({
        sessionId: selectedSessionId,
        text: message,
        sender: 'user',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
      <div className="flex items-center bg-gray-700 rounded-lg p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow bg-transparent text-white focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
