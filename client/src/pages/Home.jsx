import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket, Users, ShieldCheck, Zap } from 'lucide-react';
import EventCard from '../components/EventCard';
import axios from 'axios';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/events');
        setFeaturedEvents(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: 'Real-time Updates', desc: 'Get live status on every event instantly.' },
    { icon: <Users className="w-5 h-5" />, title: 'Wide Network', desc: 'Connect with thousands of event enthusiasts.' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Secure Booking', desc: 'Professional and reliable registration system.' },
  ];

  return (
    <div className="overflow-x-hidden pt-10">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 translate-y-1/2 right-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50/50 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest border border-blue-100 mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 fill-blue-600/20" />
          <span>The Next-Gen Event Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8"
        >
          Event Management <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reinvented.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg lg:text-xl max-w-2xl leading-relaxed mb-12"
        >
          Discover, organize, and manage events effortlessly. From local meetups to global hackathons, start your journey with India's most modern platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <NavLink
            to="/events"
            className="group flex items-center justify-center space-x-3 bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-700 shadow-2xl shadow-blue-500/40 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Events</span>
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform w-5 h-5" />
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center justify-center space-x-2 bg-white text-slate-700 px-10 py-5 rounded-2xl text-lg font-bold border-2 border-slate-100 hover:border-blue-600/30 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <Rocket className="w-5 h-5 text-blue-600" />
            <span>How it Works</span>
          </NavLink>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50/50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           {features.map((feature, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
             >
               <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                 {feature.icon}
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
               <p className="text-slate-500 leading-relaxed text-sm">
                 {feature.desc}
               </p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 flex items-center space-x-3">
              <span className="w-2 h-10 bg-blue-600 rounded-full" />
              <span>Explore Featured Events</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-lg font-medium">Catch up with the most trending events happening around you.</p>
          </div>
          <NavLink to="/events" className="text-blue-600 font-bold hover:underline flex items-center space-x-2 text-lg">
            <span>View all events</span>
            <ArrowRight size={20} />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredEvents.length > 0 ? featuredEvents.map(event => (
            <EventCard key={event._id} event={event} onRegister={() => null} />
          )) : (
            <div className="col-span-full py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
              <Calendar size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-medium">No special events found at this moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
