export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SystemInstructions {
  enabled: boolean;
  content: string;
}

export interface ApiKeyState {
  key: string;
  isValid: boolean;
}