import React, { useState, useRef } from 'react';
import { Message } from '../../types';
import { sendChatMessage } from '../../utils/api';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatScroll } from '../../hooks/useChatScroll';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  
  useChatScroll(endRef, messages);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(userMessage, messages);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-black text-green-500">
      <MessageList messages={messages} isLoading={isLoading} error={error} />
      <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      <div ref={endRef} />
    </div>
  );
}