import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, DollarSign, Users, CheckCircle, Info, Sparkles } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
        if (user) {
          const { data: bookings } = await axios.get('/api/bookings/myBookings');
          setIsBooked(bookings.some(b => b.eventId._id === id));
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id, user]);

  const handleBooking = async () => {
    if (!user) return navigate('/login');
    try {
      await axios.post('/api/bookings', { eventId: id });
      setIsBooked(true);
      setStatus({ type: 'success', message: '🎉 Registration successful! Your ticket is confirmed.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to book event' });
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading details...</div>;
  if (!event) return <div style={{ padding: '100px', textAlign: 'center' }}>Event not found.</div>;

  return (
    <div style={{ padding: '60px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px', alignItems: 'start' }}>
        <div className="fade-in">
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '450px', marginBottom: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <img src={event.image || 'https://images.unsplash.com/photo-1540575861501-7ad05823c94b?auto=format&fit=crop&q=80'} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>{event.title}</h1>
          <div className="glass" style={{ padding: '30px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info size={24} /> About this event
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{event.description}</p>
          </div>
        </div>

        <div className="fade-in" style={{ position: 'sticky', top: '100px' }}>
          <div className="glass" style={{ padding: '40px', border: '2px solid rgba(139, 92, 246, 0.2)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={28} color="var(--primary)" /> Secure Your Spot
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Calendar size={20} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date & Time</div>
                  <div style={{ fontWeight: 600 }}>{new Date(event.date).toLocaleString()}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <MapPin size={20} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontWeight: 600 }}>{event.location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <DollarSign size={20} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket Price</div>
                  <div style={{ fontWeight: 600, fontSize: '1.4rem', color: '#10b981' }}>${event.price}</div>
                </div>
              </div>
            </div>

            {status.message && (
              <div className="glass" style={{ padding: '15px', marginBottom: '20px', color: status.type === 'success' ? '#10b981' : '#ef4444', background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', display: 'flex', gap: '10px' }}>
                {status.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />} {status.message}
              </div>
            )}

            {isBooked ? (
              <button disabled className="glass" style={{ width: '100%', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.1)', cursor: 'default', opacity: 0.8 }}>
                <CheckCircle size={22} color="#10b981" /> Already Booked
              </button>
            ) : (
              <button onClick={handleBooking} className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.2rem' }}>
                Register for Event
              </button>
            )}
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '15px' }}>Instant confirmation upon registration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
