const runtimeApiBase = (globalThis as any).__SOCIALBOOST_API_BASE__ as string | undefined;
const browserHost = typeof window !== 'undefined' ? window.location.hostname : '';
const isLocalHost = browserHost === 'localhost' || browserHost === '127.0.0.1';
const defaultRemoteApiBase = 'https://socialboost-ai.onrender.com';

export const environment = {
  production: false,
  apiBase: runtimeApiBase?.trim() || (isLocalHost ? 'http://localhost:8080' : defaultRemoteApiBase),
  firebase: {
    apiKey: "AIzaSyAfQzyDWQ4Dv7EZNYZ9toZy606bg4mFzsQ",
    authDomain: "socialboost-ai-d44bc.firebaseapp.com",
    projectId: "socialboost-ai-d44bc",
    storageBucket: "socialboost-ai-d44bc.firebasestorage.app",
    messagingSenderId: "309584240318",
    appId: "1:309584240318:web:76418564e656c3b2c208ef",
  },
};
