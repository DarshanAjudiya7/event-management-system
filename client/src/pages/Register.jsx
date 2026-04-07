import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)', padding: '40px 0' }}>
      <div className="glass fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', padding: '15px', borderRadius: '16px', display: 'inline-block', marginBottom: '15px' }}>
            <UserPlus size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Join Eventify</h2>
          <p style={{ color: 'var(--text-muted)' }}>Get early access to exclusive events</p>
        </div>

        {error && (
          <div className="glass" style={{ padding: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16} /> Full Name</label>
            <input type="text" name="name" onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Email Address</label>
            <input type="email" name="email" onChange={handleChange} required placeholder="john@example.com" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={16} /> Password</label>
              <input type="password" name="password" onChange={handleChange} required placeholder="••••••••" />
            </div>
            <div className="input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={16} /> Confirm</label>
              <input type="password" name="confirmPassword" onChange={handleChange} required placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', padding: '14px' }}>Register Now</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
