import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp"; 
import Home from "./Home"; 
import { chat } from "./api";
import BotMessage from './BotMessage'; // Adjust the path as needed



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/BotMessage" element={<BotMessage />} />
      </Routes>
    </Router>
  );

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const result = await submitCode(code);
    setOutput(result.output || result.error);
  };
}

function MainPage() {
  const navigate = useNavigate();
  

  return (
    <div style={styles.container}>
      <p style={styles.date}>April 26, 2025</p>
      <p style={styles.logo}>KSun</p>
      <p style={styles.tagline}>Empower Your Code – Debug,  and Innovate with AI!</p>

      <button style={styles.startButton} onClick={() => navigate("/home")}>
        Click here to Start <FaArrowRight style={{ marginLeft: "10px" }} />
      </button>

      <div style={styles.authButtons}>
        <button style={styles.authButton} onClick={() => navigate("/signup")}>Sign up</button>
        <button style={styles.authButton} onClick={() => navigate("/signin")}>Sign in</button>
      </div>

      <div style={styles.textContainer}>
        <p>
          I’ve developed a model called <strong>KSUN</strong>, an <u>AI-powered code debugger
       </u> designed to assist developers in refining and enhancing their code. KSUN interacts in a conversational manner, allowing users to ask questions, receive detailed debugging suggestions, and optimize their code for better performance. The dialogue format enables KSUN to provide follow-up recommendations, identify potential errors, and offer solutions to improve code efficiency.
        </p>
        <p>
          KSUN is a sibling model to CodeAssist, trained to understand programming
          instructions and deliver precise, actionable feedback.
        </p>
        <p>
        We’re thrilled to introduce KSUN and invite users to share their feedback, helping us understand its strengths and areas for improvement. During the initial testing phase, KSUN is available for free. Try it now at ksun.ai.
        </p>
      </div>

      <p style={styles.footer}>
        <span style={styles.footerLogo}>KSun</span> can make mistakes. Check important info.
      </p>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "white", color: "black", fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "900px", margin: "0 auto" },
  date: { marginTop: "90px", fontSize: "12px" },
  logo: { fontSize: "70px", fontFamily: "inspiration", color: "#CD7AC6", marginTop: "10px" },
  tagline: { marginTop: "-30px", fontSize: "20px", textAlign: "center" },
  startButton: { marginTop: "0px", padding: "10px 25px", backgroundColor: "#f3e0f3", borderRadius: "10px", border: "none", fontSize: "14px", cursor: "pointer" },
  authButtons: { position: "absolute", top: "40px", right: "30px", display: "flex", gap: "20px", alignItems: "center" },
  authButton: { padding: "10px 15px", backgroundColor: "#e5e5e5", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", minWidth: "80px", textAlign: "center" },
  textContainer: { maxWidth: "650px", textAlign: "justify", margin: "25px auto", fontFamily: "Poly", fontSize: "17px", lineHeight: "35px" },
  footer: { marginTop: "10px", fontSize: "14px", color: "gray" },
  footerLogo: { fontFamily: "inspiration", color: "#b576b5" },
};

export default App;

