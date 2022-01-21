export const serverUrl: string = (import.meta.env.VITE_DOCKER_API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:3001') as string;
export const apiBaseUrl: string = serverUrl;
