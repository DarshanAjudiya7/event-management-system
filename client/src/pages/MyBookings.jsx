import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Calendar, MapPin, ExternalLink, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('/api/bookings/myBookings');
        setBookings(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading your tickets...</div>;

  return (
    <div style={{ padding: '60px 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Ticket size={40} color="var(--primary)" /> Your Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>You haven't registered for any events yet.</p>
          <Link to="/events" className="btn-primary">Explore Upcoming Events</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          {bookings.map((booking) => (
            <div key={booking._id} className="glass fade-in" style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'minmax(150px, 200px) 1fr auto', gap: '30px', alignItems: 'center' }}>
              <div style={{ height: '150px', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={booking.eventId.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80'} alt={booking.eventId.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '10px' }}>{booking.eventId.title}</h3>
                <div style={{ display: 'flex', gap: '30px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {new Date(booking.eventId.date).toLocaleDateString()}</p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {booking.eventId.location}</p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><QrCode size={16} /> Ticket #{booking._id.slice(-8).toUpperCase()}</p>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Link to={`/events/${booking.eventId._id}`} style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    View Event Details <ExternalLink size={14} />
                  </Link>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 16px', borderRadius: '20px', fontWeight: 600, textTransform: 'uppercase' }}>
                  {booking.status}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
