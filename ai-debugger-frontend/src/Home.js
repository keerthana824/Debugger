import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { ArrowUp, ChevronDown, CircleDashed, Pencil } from "lucide-react";



const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };


  const handleSendRequest = async () => {
    if (!inputValue.trim() || isLoading) return;
  
    const userMessage = {
      text: inputValue,
      sender: "user",
      id: Date.now()
    };
  
    setMessages(prev => [...prev, userMessage]);
    const userCode = inputValue;
    setInputValue("");
  
    try {
      setIsLoading(true);
  
      const response = await fetch("http://127.0.0.1:8000/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userCode })
      });
  
      if (!response.ok) throw new Error("Failed to fetch response");
  
      const data = await response.json();
      const botMessage = {
        text: data.reply || "No response received.",
        sender: "bot",
        id: Date.now()
      };
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [
        ...prev,
        { text: "Error fetching response!", sender: "bot", id: Date.now() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);



















  const renderBotMessage = (text) => {
    const parts = text.split(/```/g); // split by triple backticks
    return parts.map((part, index) => {
      const isCode = index % 2 === 1;
      return isCode ? (
        <pre key={index} style={styles.codeBlock}><code>{part}</code></pre>
      ) : (
        <p key={index} style={styles.botText}>{part}</p>
      );
    });
  };







  


  return (


















    
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f5f3ff" }}>
      {/* Header Section */}
      <div style={styles.header}>
        {/* Left Section */}
        <div style={styles.headerLeft}>
        <Pencil size={16} style={{ color: "#666" }} />
          <span style={styles.title}>KSun</span>
          <ChevronDown size={16} style={styles.icon} />
        </div>






















        {/* Right Section */}
        <div style={styles.headerRight}>
          <button style={styles.tempButton}>
            <CircleDashed size={16} style={{ color: "#666" }} />
            <span style={{ color: "#444" }}>Temporary</span>
          </button>














          {user && (
            <div style={{ position: "relative" }}>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                onClick={() => setShowDropdown(!showDropdown)}
                style={styles.profileImg}
              />
              {showDropdown && (
                <div style={styles.dropdown}>
                  <button onClick={handleLogout} style={styles.logoutBtn}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>














      {/* Chat Section */}
      <div style={styles.chatContainer}>
        <div ref={chatContainerRef} style={styles.messagesBox}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
              {msg.sender === "bot" ? renderBotMessage(msg.text) : <p style={styles.userText}>{msg.text}</p>}
            </div>
          ))}
        </div>














        {/* Input Field */}
        <div style={styles.inputContainer}>
          <textarea
            placeholder="Enter your code here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={styles.textarea}
          />



          <button onClick={handleSendRequest} style={styles.sendButton}>
            <ArrowUp size={24} color="#7D3C98" />
          </button>
        </div>
      </div>












      {/* Footer Section */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          <span style={styles.footerLogo}>KSun</span> can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};















const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    
  },















  headerLeft: { display: "flex", alignItems: "center", gap: "8px" },
  title: { fontSize: "27px", fontWeight: "500", color: "#444", fontFamily: "inspiration", color: "#CD7AC6" },
  icon: { color: "#666", cursor: "pointer" },
  headerRight: { display: "flex", alignItems: "center", gap: "12px" },
  tempButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    background: "white",
    cursor: "pointer",
  },



















  profileImg: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
  },


















  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },















  logoutBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#7D3C98",
  },

















  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    padding: "10px 20px",
    justifyContent: "space-between", 
    gap:"10px"
  },





  userText: {
    whiteSpace: "pre-wrap",
    margin: 0
  },
  botText: {
    whiteSpace: "pre-wrap",
    margin: 0
  },
  codeBlock: {
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "5px",
    fontFamily: "monospace",
    overflowX: "auto",
  },
  














  messagesBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    maxHeight: "100vh",
    paddingRight: "10px",
  },

























  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "60%",
    wordWrap: "break-word",
    whiteSpace: "pre-wrap", // 👈 this preserves newlines and spacing
  },













  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#DCF2FF",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "60%",
    wordWrap: "break-word",
  },



















  inputContainer: {
    width: "80%",
    maxWidth: "800px",
    height: "80px",
    backgroundColor: "#f8ebf7",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Ensure elements are spaced properly
    position: "relative",
    margin: "0 auto",
  },
























  textarea: {
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "16px",
    resize: "none",
    paddingRight: "40px",
  },




  





  sendButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },













  footer: { display: "flex", justifyContent: "center", width: "100%" },
  footerText: { fontSize: "14px", color: "gray" },
  footerLogo: { fontFamily: "inspiration", color: "#b576b5", marginRight: "10px" },
};













export default Home;
