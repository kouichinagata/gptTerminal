import React from 'react';

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit: (value: string) => void;
}

export default function TerminalInput({ onSubmit, ...props }: TerminalInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const input = e.currentTarget;
      if (input.value.trim()) {
        onSubmit(input.value);
        input.value = '';
      }
    }
  };

  return (
    <div className="terminal-prompt flex items-center">
      <input
        {...props}
        className="terminal-input flex-1 bg-transparent border-none focus:ring-0 outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}