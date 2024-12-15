import React from 'react';

interface TerminalHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function TerminalHeader({ title, actions }: TerminalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-green-500/20">
      <span className="text-green-500">{title}</span>
      {actions}
    </div>
  );
}