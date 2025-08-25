import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OtpVerificationComponent = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://192.168.1.9:8080/login/verifyOtp', { email, otp });
      if (response.status === 200 && response.data && response.data.status === 'success') {
        setMessage('OTP verified successfully!');
        setTimeout(() => navigate('/signin'), 1500);
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('OTP verification failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{background: 'linear-gradient(180deg, #e3f2fd 0%, #90caf9 100%)'}}>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', background: 'linear-gradient(180deg, #e3f2fd 0%, #90caf9 100%)', borderRadius: '16px' }}>
        <div className="card-header text-white" style={{background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
          <h3 className="text-center mb-0">OTP Verification</h3>
        </div>
        <div className="card-body">
          <div className="mb-3 text-center text-primary fw-bold">OTP has been sent to your email: {email}</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
              />
            </div>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100" style={{background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', border: 'none'}}>Verify OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationComponent;
