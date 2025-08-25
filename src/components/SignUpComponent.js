
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpComponent = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFullNameSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setError('Full Name is required');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }
    setError('');
    try {
      await axios.get(`http://192.168.1.9:8080/login/sendOtp?email=${form.email}`);
      setOtpSent(true);
      setStep(3);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }
    setError('');
    try {
      const response = await axios.get(`http://192.168.1.9:8080/login/verifyOtp?email=${form.email}&otp=${otp}`);
      if (response && response.data === "OTP verified successfully") {
        setSuccess(response.data);
        setStep(4);
      } else {
        setError(response.data);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('OTP verification failed.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{background: '#f5f5f5'}}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 16px rgba(60,64,67,.15)', border: 'none', padding: '32px 24px' }}>
        <h3 className="text-center mb-4" style={{color: '#1a73e8', fontWeight: 500}}>Create your account</h3>
        {step === 1 && (
          <form onSubmit={handleFullNameSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Full Name</label>
              <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your name" required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Next</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Email address</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Send OTP</button>
          </form>
        )}
        {step === 3 && otpSent && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3 text-center">
              <div className="alert alert-success">OTP has been sent to your email: {form.email}</div>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Enter OTP</label>
              <input type="text" className="form-control" name="otp" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && <div className="alert alert-success mt-2">{success}</div>}
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Verify OTP</button>
          </form>
        )}
        {step === 4 && (
          <form onSubmit={e => {e.preventDefault(); setStep(5);}}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Create password" required />
            </div>
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Next</button>
          </form>
        )}
        {step === 5 && (
          <form onSubmit={e => {e.preventDefault(); setStep(6);}}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Role</label>
              <select className="form-select" name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Next</button>
          </form>
        )}
        {step === 6 && (
          <form onSubmit={e => {e.preventDefault(); setStep(7);}}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Phone Number</label>
              <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" required />
            </div>
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Next</button>
          </form>
        )}
        {step === 7 && (
          <form onSubmit={async e => {
            e.preventDefault();
            setError('');
            setSuccess('');
            try {
              // Map role to single-letter code
              let roleCode = '';
              if (form.role === 'admin') roleCode = 'a';
              else if (form.role === 'student') roleCode = 's';
              else if (form.role === 'teacher') roleCode = 't';
              const response = await axios.put(`http://192.168.1.9:8080/user/RegisterUser?email=${form.email}`, {
                fullName: form.fullName,
                password: form.password,
                role: roleCode,
                address: form.address,
                phone: form.phone,
                otp: otp
              });
              if (response && response.status === 200) {
                setSuccess('User registered successfully!');
                setTimeout(() => navigate('/signin'), 1500);
              } else {
                setError(response.data || 'Registration failed.');
              }
            } catch (err) {
              if (err.response && err.response.data) {
                setError(err.response.data);
              } else {
                setError('Registration failed.');
              }
            }
          }}>
            <div className="mb-3">
              <label className="form-label" style={{fontWeight: 500}}>Address</label>
              <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Enter your address" required />
            </div>
            {/* Only show error/success for registration step */}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && <div className="alert alert-success mt-2">{success}</div>}
            <button type="submit" className="btn w-100" style={{background: '#1a73e8', color: '#fff', fontWeight: 500, borderRadius: '24px', fontSize: '16px', marginTop: '8px'}}>Register</button>
          </form>
        )}
        <div className="mt-3 text-center">
          <Link to="/signin" style={{color: '#1a73e8', textDecoration: 'none', fontWeight: 500}}>Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
