import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendChatMessage } from '../utils/api';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: Command execution failed. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="terminal-window">
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="terminal-message">
            <span className="terminal-prompt">{message.role === 'user' ? '> ' : '# '}</span>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="terminal-message">
            <span className="terminal-prompt">Processing...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 p-4 bg-black">
        <div className="flex items-center max-w-4xl mx-auto">
          <span className="terminal-prompt mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            placeholder="Type your message..."
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}