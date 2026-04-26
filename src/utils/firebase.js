import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNy0fmT5CqZu9uhjJVCfdoi3Y975JK9gc",
  authDomain: "arpanaraj-732a0.firebaseapp.com",
  projectId: "arpanaraj-732a0",
  storageBucket: "arpanaraj-732a0.firebasestorage.app",
  messagingSenderId: "794616766852",
  appId: "1:794616766852:web:d08e50ced7487300e47dd1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const setupRecaptcha = (elementId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {
        window.recaptchaVerifier = null;
      }
    });
  }
  return window.recaptchaVerifier;
};

export const sendOTP = async (phoneNumber) => {
  const recaptcha = setupRecaptcha('recaptcha-container');
  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
  const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
  return confirmation;
};

export default app;
