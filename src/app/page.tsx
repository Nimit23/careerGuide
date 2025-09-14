'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatView from '@/components/ChatView';

export default function Home() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  return (
    <main className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar
          selectedSessionId={selectedSessionId}
          setSelectedSessionId={setSelectedSessionId}
        />
      </div>

      {/* Main Chat View */}
      <div className="flex flex-col flex-grow">
        <ChatView selectedSessionId={selectedSessionId} />
      </div>
    </main>
  );
}
