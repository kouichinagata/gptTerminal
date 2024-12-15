import React, { useState } from 'react';
import { saveApiKey } from '../../utils/storage';
import { Modal } from '../ui/Modal';

interface ApiKeyModalProps {
  onClose: () => void;
}

export function ApiKeyModal({ onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        saveApiKey(apiKey);
        onClose();
      } else {
        setError('Invalid API key');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Enter API Key" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="sk-..."
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Validating...' : 'Save Key'}
          </button>
        </div>
      </form>
    </Modal>
  );
}