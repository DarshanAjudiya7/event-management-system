import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)' }}>
      <div className="glass fade-in" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', padding: '15px', borderRadius: '16px', display: 'inline-block', marginBottom: '15px' }}>
            <LogIn size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Login to manage your event registrations</p>
        </div>

        {error && (
          <div className="glass" style={{ padding: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@company.com" />
          </div>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={16} /> Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', padding: '14px' }}>Sign In</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
