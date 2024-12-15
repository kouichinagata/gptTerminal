import React, { useState } from 'react';
import { Key, Settings } from 'lucide-react';
import { ApiKeyModal } from './components/auth';
import { SystemInstructionsModal } from './components/settings';
import { ChatInterface } from './components/chat';

function App() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);

  return (
    <div className="min-h-screen bg-black text-green-500">
      <header className="flex justify-between items-center p-4 bg-gray-900/50">
        <h1 className="text-xl font-bold">ChatGPT Terminal</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowApiKey(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
          >
            <Key size={16} />
            API Key
          </button>
          <button
            onClick={() => setShowSystemPrompt(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
          >
            <Settings size={16} />
            System Prompt
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <ChatInterface />
      </main>

      {showApiKey && (
        <ApiKeyModal onClose={() => setShowApiKey(false)} />
      )}

      {showSystemPrompt && (
        <SystemInstructionsModal onClose={() => setShowSystemPrompt(false)} />
      )}
    </div>
  );
}

export default App;