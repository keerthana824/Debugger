
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBrmrRWgGe_b5CT8SFPFEiszlm41ZblYs",
    authDomain: "ai-debugger-frontend.firebaseapp.com",
    projectId: "ai-debugger-frontend",
    storageBucket: "ai-debugger-frontend.firebasestorage.app",
    messagingSenderId: "83736274884",
    appId: "1:83736274884:web:d6f7a8cf349832faee6691",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;

