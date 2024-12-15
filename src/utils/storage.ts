const STORAGE_KEY = 'openai-api-key';
const SYSTEM_INSTRUCTIONS_KEY = 'system-instructions';

export const saveApiKey = (key: string): void => {
  localStorage.setItem(STORAGE_KEY, btoa(key));
};

export const getApiKey = (): string | null => {
  const key = localStorage.getItem(STORAGE_KEY);
  return key ? atob(key) : null;
};

export const saveSystemInstructions = (instructions: SystemInstructions): void => {
  localStorage.setItem(SYSTEM_INSTRUCTIONS_KEY, JSON.stringify(instructions));
};

export const getSystemInstructions = (): SystemInstructions => {
  const stored = localStorage.getItem(SYSTEM_INSTRUCTIONS_KEY);
  return stored ? JSON.parse(stored) : { enabled: false, content: '' };
};