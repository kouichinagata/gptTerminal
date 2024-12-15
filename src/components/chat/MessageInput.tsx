import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-800 text-green-500 rounded px-4 py-2 
                   focus:outline-none focus:ring-1 focus:ring-green-500
                   font-mono"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-gray-800 text-green-500 rounded 
                   hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}