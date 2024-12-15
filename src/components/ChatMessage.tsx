import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-4 p-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className={`flex-shrink-0 rounded-full p-2 ${isUser ? 'bg-blue-100' : 'bg-green-100'}`}>
        {isUser ? (
          <User className="h-5 w-5 text-blue-600" />
        ) : (
          <Bot className="h-5 w-5 text-green-600" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-900">
          {isUser ? 'You' : 'Assistant'}
        </p>
        <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}