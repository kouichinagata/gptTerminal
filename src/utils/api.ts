import { Message } from '../types';
import { getApiKey, getSystemInstructions } from './storage';
import { API_CONFIG } from '../config/api';

const MAX_HISTORY_MESSAGES = 10;

export async function sendChatMessage(
  userMessage: Message,
  chatHistory: Message[]
): Promise<Message> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not found');

  const systemInstructions = getSystemInstructions();
  const messages = [];

  if (systemInstructions.enabled && systemInstructions.content) {
    messages.push({
      role: 'system',
      content: systemInstructions.content
    });
  }

  const recentHistory = chatHistory.slice(-MAX_HISTORY_MESSAGES);
  messages.push(...recentHistory, userMessage);

  const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages,
      max_tokens: API_CONFIG.maxTokens,
      temperature: API_CONFIG.temperature
    })
  });

  if (!response.ok) throw new Error('Failed to get response');

  const data = await response.json();
  return {
    role: 'assistant',
    content: data.choices[0].message.content
  };
}