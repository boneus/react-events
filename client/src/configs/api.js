export const serverUrl = import.meta.env.VITE_DOCKER_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const apiBaseUrl = serverUrl;