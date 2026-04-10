import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CheckCircle, Info, ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import defaultEvents from '../data/defaultEvents';

const initialForm = {
  name: '',
  collegeId: '',
  year: '1',
  branch: '',
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regForm, setRegForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usingFallbackEvents, setUsingFallbackEvents] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/api/events');
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data);
        setUsingFallbackEvents(data.some((event) => String(event._id).startsWith('fallback-event-')));
      } else {
        setEvents(defaultEvents);
        setUsingFallbackEvents(true);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(defaultEvents);
      setUsingFallbackEvents(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (event) => {
    if (event.status === 'past') {
      return;
    }

    if ((event.totalRegistrations || 0) >= (event.maxRegistrations || 50)) {
      setSuccessMessage('');
      setErrorMessage(`Registration is full. Only ${event.maxRegistrations || 50} students can register for this event.`);
      return;
    }

    if (usingFallbackEvents) {
      setSuccessMessage('');
      setErrorMessage('Registration is unavailable until the database connection is restored.');
      return;
    }

    setSuccessMessage('');
    setErrorMessage('');
    setSelectedEvent(event);
    setRegForm(initialForm);
    setIsRegistering(true);
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post('/api/registrations', {
        ...regForm,
        year: Number(regForm.year),
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
      });

      setSuccessMessage(data.message || 'Registration successful.');
      setErrorMessage('');
      setIsRegistering(false);
      setSelectedEvent(null);
      await fetchEvents();
      setRegForm(initialForm);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.response?.data?.message || 'Cannot reach the registration service right now. Please check that the backend server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter = filter === 'all' || event.status === filter;
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [events, filter, search]);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Explore Our Events</h1>
              <p className="text-slate-500 font-medium max-w-xl text-lg">
                Browse through past and upcoming experiences curated for you.
              </p>
            </div>

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

        {successMessage && (
          <div className="mb-8 flex items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700 shadow-sm">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 flex items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
            <Info className="h-5 w-5" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={handleRegister}
              />
            )) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 border-dashed"
              >
                <Info className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-xl font-bold text-slate-400">No events found matching your criteria</p>
                <button onClick={() => { setFilter('all'); setSearch(''); }} className="mt-4 text-blue-600 font-bold hover:underline">
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isRegistering && selectedEvent && (
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
              <div className="p-10 lg:p-12 space-y-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <span className="text-blue-600 font-black uppercase text-xs tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 inline-block">
                      Secure Registration
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">Student Registration Form</h3>
                    <p className="text-slate-500 font-medium italic">Joining: {selectedEvent.title}</p>
                    <p className="text-sm font-semibold text-blue-600">
                      Seats filled: {selectedEvent.totalRegistrations || 0}/{selectedEvent.maxRegistrations || 50}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={submitRegistration} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Name</label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">College ID</label>
                    <input
                      type="text"
                      required
                      value={regForm.collegeId}
                      onChange={(e) => setRegForm({ ...regForm, collegeId: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                      placeholder="22CSE104"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Year</label>
                      <select
                        value={regForm.year}
                        onChange={(e) => setRegForm({ ...regForm, year: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Branch</label>
                      <input
                        type="text"
                        required
                        value={regForm.branch}
                        onChange={(e) => setRegForm({ ...regForm, branch: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                        placeholder="Computer Engineering"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center space-x-3 group"
                  >
                    <span>{submitting ? 'Registering...' : 'Submit Registration'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium">
                    Your registration will be stored securely once submitted.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
