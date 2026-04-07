import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Filter, Plus } from 'lucide-react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/events');
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '40px 0' }}>
      <header style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px' }}>Upcoming Events</h2>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div className="glass" style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
            <Search size={20} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by title or description..." 
              style={{ background: 'transparent', border: 'none', width: '100%', padding: '15px', color: 'white', outline: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <Filter size={18} color="var(--text-muted)" />
            <select 
              style={{ background: 'transparent', border: 'none', padding: '15px', color: 'white', outline: 'none', cursor: 'pointer' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="music">Music</option>
              <option value="tech">Tech</option>
              <option value="sports">Sports</option>
              <option value="arts">Arts</option>
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px' }}>Loading events...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredEvents.map((event) => (
            <Link key={event._id} to={`/events/${event._id}`} className="glass event-card fade-in" style={{ padding: '20px', display: 'block', transition: 'all 0.3s' }}>
              <div style={{ height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                <img src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600 }}>{event.category || 'Event'}</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>${event.price}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>{event.title}</h3>
              
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}><Calendar size={14} /> {new Date(event.date).toLocaleDateString()}</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {event.location}</p>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '10px' }}>View Details</button>
            </Link>
          ))}
          {filteredEvents.length === 0 && <p style={{ color: 'var(--text-muted)', padding: '20px' }}>No events found matching your criteria.</p>}
        </div>
      )}

      <style jsx="true">{`
        .event-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
        }
        select option { background: #1e293b; color: white; }
      `}</style>
    </div>
  );
};

export default EventList;
