import React from 'react';
import { Message } from '../../types';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function MessageList({ messages, isLoading, error }: MessageListProps) {
  return (
    <div className="flex-1 overflow-auto space-y-4 p-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && (
        <div className="p-4 rounded bg-gray-800/50">
          <div className="text-green-500 animate-pulse">Thinking...</div>
        </div>
      )}
      {error && (
        <div className="p-4 rounded bg-red-900/20 border border-red-500/20">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}