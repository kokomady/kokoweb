import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, registerUser } from "../services/Signup";

const SignUpComponent = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }
    setError("");
    try {
      await sendOtp(form.email);
      setOtpSent(true);
      setStep(3);
    } catch (err) {
      setError(err.response?.data || "Failed to send OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }
    setError("");
    try {
      const response = await verifyOtp(form.email, otp);
      if (response?.data === "OTP verified successfully") {
        setSuccess(response.data);
        setStep(4); // ✅ Move to next step after OTP success
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError(err.response?.data || "OTP verification failed.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      let roleCode =
        form.role === "admin"
          ? "Admin"
          : form.role === "student"
          ? "Student"
          : "Teacher";

      const response = await registerUser(form.email, {
        fullName: form.fullName,
        password: form.password,
        role: roleCode,
        address: form.address,
        phone: form.phone,
        otp: otp,
      });

      if (response?.status === 200) {
        setSuccess("User registered successfully!");
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        setError(response.data || "Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f5f5f5" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 16px rgba(60,64,67,.15)", border: "none", padding: "32px 24px" }}>
        <h3 className="text-center mb-4" style={{ color: "#1a73e8", fontWeight: 500 }}>
          Create your account
        </h3>

        {/* Step 1: Full Name */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Next</button>
          </form>
        )}

        {/* Step 2: Email */}
        {step === 2 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">Send OTP</button>
          </form>
        )}

        {/* Step 3: OTP */}
        {step === 3 && otpSent && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input type="text" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && <div className="alert alert-success mt-2">{success}</div>}
            <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
          </form>
        )}

        {/* Step 4: Password */}
        {step === 4 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(5); }}>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Next</button>
          </form>
        )}

        {/* Step 5: Confirm Password */}
        {step === 5 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (form.password !== form.confirmPassword) {
              setError("Passwords do not match");
              return;
            }
            setError("");
            setStep(6);
          }}>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">Next</button>
          </form>
        )}

        {/* Step 6: Role + Phone */}
        {step === 6 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(7); }}>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-control" name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Next</button>
          </form>
        )}

        {/* Step 7: Address + Register */}
        {step === 7 && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && <div className="alert alert-success mt-2">{success}</div>}
            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>
        )}

        <div className="mt-3 text-center">
          <Link to="/signin" style={{ color: "#1a73e8", textDecoration: "none" }}>
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
