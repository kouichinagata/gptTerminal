import React, { useState } from 'react';
import { saveApiKey } from '../../utils/storage';

interface ApiKeyFormProps {
  onValidKey: () => void;
}

export default function ApiKeyForm({ onValidKey }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || isChecking) return;

    try {
      setIsChecking(true);
      setError('');
      
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (response.ok) {
        saveApiKey(apiKey);
        onValidKey();
      } else {
        setError('Invalid API key');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-green-500">Enter API Key</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-gray-800 text-green-500 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="sk-..."
            disabled={isChecking}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isChecking}
            className="px-4 py-2 bg-gray-800 text-green-500 rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {isChecking ? 'Validating...' : 'Save Key'}
          </button>
        </div>
      </form>
    </div>
  );
}