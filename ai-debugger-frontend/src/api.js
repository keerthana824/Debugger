import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

export const sendCodeToBackend = async (code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message: code, // Send the code input
    });
    return response.data.reply; // Get AI's response
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return "Error occurred. Please try again.";
  }
};
