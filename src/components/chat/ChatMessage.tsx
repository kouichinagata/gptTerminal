import React from 'react';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const content = message.content.trim();
  
  return (
    <div className={`p-4 rounded ${
      message.role === 'user' ? 'bg-gray-800' : 'bg-gray-800/50'
    }`}>
      <pre className="text-green-500 whitespace-pre-wrap font-mono break-words">
        {content}
      </pre>
    </div>
  );
}