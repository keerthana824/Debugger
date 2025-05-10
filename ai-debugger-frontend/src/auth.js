import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebaseConfig"; // <--- Importing Firebase app

const auth = getAuth(app); // <--- Fixing the app import
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error.message);
  }
};

// Exporting correctly
export { auth, provider, signInWithGoogle };


