import React from 'react';
import { Calendar, ArrowRight, CheckCircle, Play, History } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event, onRegister }) => {
  const { title, description, date, status, image } = event;

  const getStatusIcon = () => {
    switch (status) {
      case 'live': return <Play className="w-4 h-4" />;
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      case 'past': return <History className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'live': return 'bg-emerald-100 text-emerald-600 ring-emerald-200';
      case 'upcoming': return 'bg-blue-100 text-blue-600 ring-blue-200';
      case 'past': return 'bg-slate-100 text-slate-500 ring-slate-200';
      default: return 'bg-slate-100 text-slate-500 ring-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-slate-100"
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/600x400'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ring-1 shadow-sm ${getStatusColor()}`}>
          {getStatusIcon()}
          <span>{status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-5">
          {status !== 'past' ? (
            <button
              onClick={() => onRegister(event)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all w-full justify-center group/btn"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="text-slate-400 text-xs font-bold italic flex items-center space-x-2 w-full justify-center py-2.5">
              <span>Event Concluded</span>
              <CheckCircle className="w-4 h-4 text-slate-300" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
