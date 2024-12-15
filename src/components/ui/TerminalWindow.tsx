import React from 'react';

interface TerminalWindowProps {
  children: React.ReactNode;
}

export default function TerminalWindow({ children }: TerminalWindowProps) {
  return (
    <div className="terminal-window p-4 min-h-screen">
      <div className="flex items-center space-x-2 mb-4 border-b border-green-400 pb-2">
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="w-3 h-3 rounded-full bg-green-400/50" />
        <div className="w-3 h-3 rounded-full bg-green-400/30" />
      </div>
      {children}
    </div>
  );
}