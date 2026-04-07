import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Users, Calendar, LayoutDashboard, X, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventData, setEventData] = useState({ title: '', description: '', date: '', status: 'upcoming', image: '' });
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, regsRes] = await Promise.all([
        axios.get('/api/events'),
        axios.get('/api/registrations')
      ]);
      setEvents(eventsRes.data);
      setRegistrations(regsRes.data);
    } catch (err) { 
      console.error(err); 
    } finally {
      setLoading(false);
    }
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
      setEventData({ title: '', description: '', date: '', status: 'upcoming', image: '' });
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
    setEventData({ 
        title: event.title, 
        description: event.description, 
        date: new Date(event.date).toISOString().slice(0, 16), 
        status: event.status, 
        image: event.image 
    });
    setShowAddModal(true);
  };

  if (loading && events.length === 0) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 flex items-center gap-3">
             <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/30">
               <LayoutDashboard size={28} />
             </div>
             <span>Admin Dashboard</span>
          </h2>
          <p className="text-slate-500 font-medium">Control the pulses of your events and registrations.</p>
        </div>
        <button 
           onClick={() => { setEditId(null); setShowAddModal(true); }} 
           className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95"
        >
          <Plus size={20} /> <span>Create Event</span>
        </button>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
            <Calendar size={32} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 leading-none mb-1">{events.length}</h4>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Global Events</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center">
            <Users size={32} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 leading-none mb-1">{registrations.length}</h4>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Registered Students</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm flex items-center gap-6">
           <button onClick={fetchData} className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all active:rotate-180">
            <RefreshCw size={28} />
          </button>
          <div>
            <h4 className="text-xl font-bold text-slate-800 leading-none mb-1">Live Sync</h4>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Last Checked: Just Now</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8">
        <button 
           onClick={() => setActiveTab('events')} 
           className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'events' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-100'}`}
        >
            Events Library
        </button>
        <button 
           onClick={() => setActiveTab('regs')} 
           className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'regs' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-100'}`}
        >
            Student Directory
        </button>
      </div>

      {activeTab === 'events' ? (
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <th className="px-8 py-6">Event Details</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <img src={event.image} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                             <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{event.title}</p>
                             <p className="text-xs text-slate-400 truncate max-w-[200px]">{event.description}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-500 text-sm italic">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="px-8 py-6">
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                           event.status === 'live' ? 'bg-emerald-100 text-emerald-600' :
                           event.status === 'upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                       }`}>
                           {event.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(event)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(event._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-50 text-slate-400 font-bold uppercase text-xs tracking-widest">
                   <th className="px-8 py-6">Student Info</th>
                   <th className="px-8 py-6">Event Selected</th>
                   <th className="px-8 py-6">Registered On</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {registrations.map((reg) => (
                   <tr key={reg._id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-8 py-6">
                        <p className="font-bold text-slate-800 uppercase text-sm tracking-tight">{reg.name}</p>
                        <p className="text-xs text-slate-400">{reg.email} | {reg.phone}</p>
                     </td>
                     <td className="px-8 py-6 font-bold text-blue-600 text-xs uppercase tracking-widest">{reg.eventId?.title || 'Unknown Event'}</td>
                     <td className="px-8 py-6 text-slate-500 text-sm italic">{new Date(reg.createdAt).toLocaleDateString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Modal - for Add/Edit */}
      <AnimatePresence>
        {showAddModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }} 
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
                 onClick={() => setShowAddModal(false)} 
              />
              <motion.div 
                 initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                 animate={{ scale: 1, opacity: 1, y: 0 }} 
                 exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                 className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 lg:p-12"
              >
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-3xl font-black text-slate-900">{editId ? 'Modify Event Entry' : 'Create New Event'}</h3>
                     <button onClick={() => setShowAddModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600"><X /></button>
                  </div>

                  <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Event Title</label>
                          <input 
                             className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none" 
                             type="text" 
                             value={eventData.title} 
                             onChange={(e) => setEventData({ ...eventData, title: e.target.value })} 
                             required 
                             placeholder="E.g. Tech Hackathon 2026"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Current Status</label>
                          <select 
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                            value={eventData.status} 
                            onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="past">Past</option>
                          </select>
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Short Description</label>
                      <textarea 
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none resize-none" 
                         rows="3" 
                         value={eventData.description} 
                         onChange={(e) => setEventData({ ...eventData, description: e.target.value })} 
                         required 
                         placeholder="What's this event about?"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Date & Time</label>
                          <input 
                             className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none" 
                             type="datetime-local" 
                             value={eventData.date} 
                             onChange={(e) => setEventData({ ...eventData, date: e.target.value })} 
                             required 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Hero Image URL</label>
                          <input 
                             className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none" 
                             type="text" 
                             value={eventData.image} 
                             onChange={(e) => setEventData({ ...eventData, image: e.target.value })} 
                             placeholder="https://images.unsplash.com/..." 
                          />
                       </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                       <button type="submit" className="flex-1 bg-blue-600 text-white py-5 rounded-3xl font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95">
                          {editId ? 'Update Record' : 'Publish to Portal'}
                       </button>
                    </div>
                  </form>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
