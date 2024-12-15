import React, { useState } from 'react';
import { saveApiKey } from '../utils/storage';

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
    <div className="terminal-window">
      <div className="space-y-4">
        <div className="terminal-message">Welcome to ChatGPT Terminal</div>
        <div className="terminal-message">Please enter your OpenAI API key:</div>
        {error && (
          <div className="terminal-message text-red-500">Error: {error}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex items-center">
          <span className="terminal-prompt mr-2">$</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="terminal-input"
            placeholder="sk-..."
            disabled={isChecking}
          />
        </div>
        {isChecking && (
          <div className="mt-4 terminal-message">
            <span className="terminal-prompt">Validating API key...</span>
          </div>
        )}
      </form>
    </div>
  );
}