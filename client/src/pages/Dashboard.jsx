import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, LayoutDashboard, Info, RefreshCw } from 'lucide-react';
import Loader from '../components/Loader';
import defaultEvents from '../data/defaultEvents';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('events');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const upcomingEvents = events.filter((event) => event.status === 'upcoming');
  const pastEvents = events.filter((event) => event.status === 'past');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setFeedback({ type: '', message: '' });
    try {
      const eventsRes = await axios.get('/api/events');
      setEvents(Array.isArray(eventsRes.data) && eventsRes.data.length > 0 ? eventsRes.data : defaultEvents);

      try {
        const regsRes = await axios.get('/api/registrations');
        setRegistrations(regsRes.data);
      } catch (regErr) {
        console.error(regErr);
        setRegistrations([]);
      }
    } catch (err) {
      console.error(err);
      setEvents(defaultEvents);
      setRegistrations([]);
      setFeedback({
        type: 'warning',
        message: 'Showing built-in events because the backend feed is unavailable right now.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && events.length === 0) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      {feedback.message && (
        <div className={`mb-8 flex items-center gap-3 rounded-3xl px-5 py-4 shadow-sm border ${
          feedback.type === 'warning'
            ? 'border-amber-200 bg-amber-50 text-amber-700'
            : 'border-red-200 bg-red-50 text-red-700'
        }`}>
          <Info size={18} />
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/30">
              <LayoutDashboard size={28} />
            </div>
            <span>Event History & Directory</span>
          </h2>
          <p className="text-slate-500 font-medium">
            View all event histories and student registration directory.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
            <Calendar size={32} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 leading-none mb-1">{upcomingEvents.length}</h4>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Upcoming Events</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-3xl flex items-center justify-center">
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
        <div className="space-y-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-2xl font-black text-slate-900">Upcoming Events</h3>
              <span className="ml-2 px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">{upcomingEvents.length}</span>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50 text-slate-400 font-bold uppercase text-xs tracking-widest">
                        <th className="px-8 py-6">Event Details</th>
                        <th className="px-8 py-6">Date & Time</th>
                        <th className="px-8 py-6">Registrations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {upcomingEvents.map((event) => (
                        <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={event.image} className="w-12 h-12 rounded-xl object-cover" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'} />
                              <div>
                                <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{event.title}</p>
                                <p className="text-xs text-slate-400 truncate max-w-[300px]">{event.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-medium text-slate-500 text-sm">{new Date(event.date).toLocaleDateString()} <br /> <span className="text-xs text-slate-400">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td>
                          <td className="px-8 py-6 font-bold text-blue-600 text-sm">{event.totalRegistrations || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm p-12 text-center">
                <p className="text-slate-400 font-semibold">No upcoming events scheduled.</p>
              </div>
            )}
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-slate-400 rounded-full"></div>
              <h3 className="text-2xl font-black text-slate-900">Event History</h3>
              <span className="ml-2 px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-bold">{pastEvents.length}</span>
            </div>
            {pastEvents.length > 0 ? (
              <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50 text-slate-400 font-bold uppercase text-xs tracking-widest">
                        <th className="px-8 py-6">Event Details</th>
                        <th className="px-8 py-6">Event Date</th>
                        <th className="px-8 py-6">Registrations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {pastEvents.map((event) => (
                        <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={event.image} className="w-12 h-12 rounded-xl object-cover opacity-75" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'} />
                              <div>
                                <p className="font-bold text-slate-800 group-hover:text-slate-600 transition-colors uppercase text-sm tracking-tight">{event.title}</p>
                                <p className="text-xs text-slate-400 truncate max-w-[300px]">{event.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-medium text-slate-500 text-sm">{new Date(event.date).toLocaleDateString()} <br /> <span className="text-xs text-slate-400">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td>
                          <td className="px-8 py-6 font-bold text-slate-600 text-sm">{event.totalRegistrations || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm p-12 text-center">
                <p className="text-slate-400 font-semibold">No past events yet.</p>
              </div>
            )}
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
                      <p className="text-xs text-slate-400">
                        {reg.collegeId} | Year {reg.year} | {reg.branch}
                      </p>
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
    </div>
  );
};

export default Dashboard;
