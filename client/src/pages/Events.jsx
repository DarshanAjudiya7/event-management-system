import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, X, CheckCircle, Info } from 'lucide-react';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const [regSuccess, setRegSuccess] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setIsRegistering(true);
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/registrations', {
        ...regForm,
        eventId: selectedEvent._id,
      });
      setRegSuccess(true);
      setRegForm({ name: '', email: '', phone: '' });
      setTimeout(() => {
        setRegSuccess(false);
        setIsRegistering(false);
        setSelectedEvent(null);
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const filteredEvents = events.filter((ev) => {
    const matchesFilter = filter === 'all' || ev.status === filter;
    const matchesSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'live', label: 'Live Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50/30 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Explore Our Events</h1>
              <p className="text-slate-500 font-medium max-w-xl text-lg">Browse through past, live, and upcoming experiences curated for you.</p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setFilter(cat.id)}
                 className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                   filter === cat.id
                     ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                     : 'bg-white border-slate-100 text-slate-500 hover:border-blue-100 hover:text-blue-600'
                 }`}
               >
                 {cat.label}
               </button>
             ))}
          </div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
           <AnimatePresence mode="popLayout">
             {filteredEvents.length > 0 ? filteredEvents.map((event) => (
               <EventCard key={event._id} event={event} onRegister={handleRegister} />
             )) : (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 border-dashed"
               >
                 <Info className="w-12 h-12 text-slate-300 mb-4" />
                 <p className="text-xl font-bold text-slate-400">No events found matching your criteria</p>
                 <button onClick={() => {setFilter('all'); setSearch('')}} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isRegistering && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegistering(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {regSuccess ? (
                <div className="p-12 text-center bg-blue-600 text-white">
                   <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                     <CheckCircle className="w-12 h-12 text-white" />
                   </div>
                   <h3 className="text-3xl font-black mb-4">You're In!</h3>
                   <p className="text-blue-50 text-lg font-medium opacity-90 leading-relaxed mb-6">
                     Successfully registered for <br /> <strong className="text-white text-xl">"{selectedEvent?.title}"</strong>
                   </p>
                </div>
              ) : (
                <>
                  <div className="p-10 lg:p-12 space-y-8">
                     <div className="flex items-start justify-between">
                        <div className="space-y-2">
                           <span className="text-blue-600 font-black uppercase text-xs tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 inline-block">Secure Registration</span>
                           <h3 className="text-3xl font-black text-slate-900 leading-tight">Student Registration Form</h3>
                           <p className="text-slate-500 font-medium italic">Joining: {selectedEvent?.title}</p>
                        </div>
                        <button
                          onClick={() => setIsRegistering(false)}
                          className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
                        >
                          <X className="w-6 h-6" />
                        </button>
                     </div>

                     <form onSubmit={submitRegistration} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                            value={regForm.name}
                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 00000 00000"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                            value={regForm.phone}
                            onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center space-x-3 group"
                        >
                          <span>Confirm Registration</span>
                          <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <p className="text-center text-xs text-slate-400 font-medium">By clicking confirm, you agree to our event participation terms.</p>
                     </form>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
