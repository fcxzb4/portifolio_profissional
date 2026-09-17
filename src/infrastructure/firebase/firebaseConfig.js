// Firebase Configuration — Substituir pelos dados reais do seu projeto Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta instâncias do Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
