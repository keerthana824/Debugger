import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "./auth";

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await signInWithGoogle();
      alert("Google Sign-In Successful!");
      navigate("/Home");
    } catch (error) {
      console.error("Google Sign-In error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h2>Sign In</h2>
      <button 
        onClick={handleGoogleSignIn} 
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px 20px",
          backgroundColor: "#CD7AC6",
          color: "white",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"  
          alt="Google Logo" 
          width="20"
          height="20"
          style={{ backgroundColor: "white", borderRadius: "50%" }}
        />
        {loading ? "Signing In..." : "Sign in with Google"}
      </button>
    </div>
  );
}

export default SignIn;
