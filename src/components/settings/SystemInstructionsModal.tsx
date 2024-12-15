import React, { useState } from 'react';
import { SystemInstructions } from '../../types';
import { saveSystemInstructions, getSystemInstructions } from '../../utils/storage';
import { TerminalHeader } from '../ui';

interface SystemInstructionsModalProps {
  onClose: () => void;
}

export default function SystemInstructionsModal({ onClose }: SystemInstructionsModalProps) {
  const [instructions, setInstructions] = useState<SystemInstructions>(() => getSystemInstructions());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSystemInstructions(instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <TerminalHeader
          title="System Instructions"
          actions={
            <button 
              onClick={onClose}
              className="text-green-500/70 hover:text-green-500"
            >
              [X]
            </button>
          }
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={instructions.enabled}
                onChange={(e) => setInstructions(prev => ({
                  ...prev,
                  enabled: e.target.checked
                }))}
                className="bg-black border-green-500/30 text-green-500 focus:ring-0"
              />
              <span className="text-green-500/70">Enable System Instructions</span>
            </label>
          </div>

          <div className="space-y-2">
            <textarea
              value={instructions.content}
              onChange={(e) => setInstructions(prev => ({
                ...prev,
                content: e.target.value
              }))}
              disabled={!instructions.enabled}
              className="w-full h-48 bg-black text-green-500 border-green-500/30 
                       focus:border-green-500 focus:ring-0 rounded-none"
              placeholder="Enter system instructions here..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-green-500/70 hover:text-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-green-500 border border-green-500/30 
                       hover:border-green-500"
            >
              Save Instructions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}