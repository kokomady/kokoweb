import axios from "axios";

// ✅ Update this with your backend base URL
const API_BASE_URL = "http://192.168.1.9:8080";

// 📩 Send OTP
export const sendOtp = (email) => {
  return axios.get(`${API_BASE_URL}/login/sendOtp`, {
    params: { email }
  });
};

// 🔑 Verify OTP
export const verifyOtp = (email, otp) => {
  return axios.get(`${API_BASE_URL}/login/verifyOtp`, {
    params: { email, otp }
  });
};

// 📝 Register User
export const registerUser = (email, userData) => {
  return axios.put(`${API_BASE_URL}/user/RegisterUser`, userData, {
    params: { email }
  });
};
