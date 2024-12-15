export function validateApiKey(key: string): string {
  const trimmedKey = key.trim();
  if (!trimmedKey) {
    throw new Error('API key cannot be empty');
  }
  if (!trimmedKey.startsWith('sk-')) {
    throw new Error('Invalid API key format');
  }
  return trimmedKey;
}