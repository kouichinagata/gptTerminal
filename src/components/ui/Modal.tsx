import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-green-500/70 hover:text-green-500"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}