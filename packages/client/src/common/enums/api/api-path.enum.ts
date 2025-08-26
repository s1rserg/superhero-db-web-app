const ApiPath = {
  API_URL: import.meta.env.VITE_API_PATH || 'http://localhost:3000',

  SUPERHEROES: '/superheroes',
} as const;

export { ApiPath };
