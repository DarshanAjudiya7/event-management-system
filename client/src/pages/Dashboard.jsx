import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Users, Calendar, MapPin, DollarSign, Package, LayoutDashboard, ChevronRight, CheckCircle, Info } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventData, setEventData] = useState({ title: '', description: '', date: '', location: '', price: '', category: 'unclassified', image: '' });
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        axios.get('/api/events'),
        axios.get('/api/bookings/allBookings')
      ]);
      setEvents(eventsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/events/${editId}`, eventData);
      } else {
        await axios.post('/api/events', eventData);
      }
      fetchData();
      setShowAddModal(false);
      setEditId(null);
      setEventData({ title: '', description: '', date: '', location: '', price: '', category: 'unclassified', image: '' });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${id}`);
        fetchData();
      } catch (err) { console.error(err); }
    }
  };

  const startEdit = (event) => {
    setEditId(event._id);
    setEventData({ ...event, date: new Date(event.date).toISOString().slice(0, 16) });
    setShowAddModal(true);
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Dashboard...</div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <LayoutDashboard size={40} color="var(--primary)" /> Admin Control Center
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your platform's growth and event library.</p>
        </div>
        <button onClick={() => { setEditId(null); setShowAddModal(!showAddModal); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Plus size={20} /> Create New Event
        </button>
      </header>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', padding: '15px', borderRadius: '16px' }}>
            <Calendar size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{events.length}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Events</p>
          </div>
        </div>
        <div className="glass" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '15px', borderRadius: '16px' }}>
            <Users size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{bookings.length}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Bookings</p>
          </div>
        </div>
        <div className="glass" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '15px', borderRadius: '16px' }}>
            <Package size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>${bookings.reduce((sum, b) => sum + (b.eventId.price || 0), 0)}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('events')} style={{ padding: '10px 25px', background: activeTab === 'events' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 600 }}>Manage Events</button>
        <button onClick={() => setActiveTab('bookings')} style={{ padding: '10px 25px', background: activeTab === 'bookings' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 600 }}>Manage Bookings</button>
      </div>

      {activeTab === 'events' ? (
        <div className="glass" style={{ padding: '30px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '15px' }}>Event Name</th>
                <th style={{ padding: '15px' }}>Date</th>
                <th style={{ padding: '15px' }}>Location</th>
                <th style={{ padding: '15px' }}>Price</th>
                <th style={{ padding: '15px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '15px', fontWeight: 600 }}>{event.title}</td>
                  <td style={{ padding: '15px' }}>{new Date(event.date).toLocaleDateString()}</td>
                  <td style={{ padding: '15px' }}>{event.location}</td>
                  <td style={{ padding: '15px' }}>${event.price}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => startEdit(event)} style={{ padding: '8px', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}><Edit size={18} /></button>
                      <button onClick={() => handleDelete(event._id)} style={{ padding: '8px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass" style={{ padding: '30px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>User Email</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Event</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Booked On</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '15px' }}>{booking.userId.email}</td>
                  <td style={{ padding: '15px', fontWeight: 600 }}>{booking.eventId.title}</td>
                  <td style={{ padding: '15px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td style={{ padding: '15px' }}><span style={{ color: '#10b981' }}>{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal - for Add/Edit */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass" style={{ width: '90%', maxWidth: '600px', padding: '40px', position: 'relative' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '30px' }}>{editId ? 'Modify Event' : 'Create New Event'}</h3>
            <form onSubmit={handleCreateOrUpdate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                  <label>Title</label>
                  <input type="text" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} required />
                </div>
                <div className="input-group">
                  <label>Category</label>
                  <select 
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                    value={eventData.category} 
                    onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                  >
                    <option value="music">Music</option>
                    <option value="tech">Tech</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts</option>
                    <option value="unclassified">Other</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px' }} rows="3" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                  <label>Date & Time</label>
                  <input type="datetime-local" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} required />
                </div>
                <div className="input-group">
                  <label>Price ($)</label>
                  <input type="number" value={eventData.price} onChange={(e) => setEventData({ ...eventData, price: e.target.value })} required />
                </div>
              </div>
              <div className="input-group">
                <label>Location</label>
                <input type="text" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Image URL (optional)</label>
                <input type="text" value={eventData.image} onChange={(e) => setEventData({ ...eventData, image: e.target.value })} placeholder="https://unsplash..." />
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editId ? 'Save Changes' : 'Publish Event'}</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="glass" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
