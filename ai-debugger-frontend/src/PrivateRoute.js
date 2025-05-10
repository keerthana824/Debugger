import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user || !user.emailVerified) return <Navigate to="/verify-email" />;

  return children;
};

export default PrivateRoute;
