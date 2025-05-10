import { useState } from "react";
import { auth } from "./auth";

import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password doesn't match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await sendEmailVerification(user);
  
      alert("User created! A verification email has been sent. Please verify before continuing.");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontFamily: "inspiration", fontSize: "70px", color: "#CD7AC6", fontWeight: "400", marginBottom: "20px" }}>
        KSun
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignUp}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "300px", height: "29px", fontSize: "15px", padding: "10px", margin: "10px" }}
          />

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "270px", height: "30px", fontSize: "15px", padding: "10px", paddingRight: "40px", margin: "10px" }}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", cursor: "pointer", color: "rgba(0, 0, 0, 0.5)" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "270px", height: "30px", fontSize: "15px", padding: "10px", paddingRight: "40px", margin: "10px" }}
            />
            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ position: "absolute", right: "12px", cursor: "pointer", color: "rgba(0, 0, 0, 0.5)" }}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              backgroundColor: "#CD7AC6", 
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "30px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background 0.3s ease-in-out, transform 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#B567AE"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#CD7AC6"}
            onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
