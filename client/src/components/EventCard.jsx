import React from 'react';
import { CalendarDays, ArrowRight, Lock, Clock3, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event, onRegister }) => {
  const { title, description, date, status, image, totalRegistrations = 0 } = event;

  const isPast = status === 'past';

  const badgeStyles = isPast
    ? 'bg-slate-100 text-slate-500 ring-slate-200'
    : 'bg-blue-100 text-blue-600 ring-blue-200';

  const renderButton = () => {
    if (isPast) {
      return (
        <button
          type="button"
          disabled
          className="w-full rounded-2xl bg-slate-100 px-5 py-3.5 text-sm font-black text-slate-500 cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Lock className="h-4 w-4" />
          <span>Registration Closed</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => onRegister(event)}
        className="w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <span>Register Now</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/600x400'}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent" />
        <div className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] ring-1 ${badgeStyles}`}>
          {isPast ? <Clock3 className="h-3.5 w-3.5" /> : <CalendarDays className="h-3.5 w-3.5" />}
          <span>{isPast ? 'Past Event' : 'Upcoming Event'}</span>
        </div>
      </div>

      <div className="p-6 lg:p-7">
        <div className="mb-4 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          <div className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            <span>{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{totalRegistrations} Registrations</span>
          </div>
        </div>

        <h3 className="mb-3 text-2xl font-black leading-tight text-slate-900">
          {title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        {renderButton()}
      </div>
    </motion.article>
  );
};

export default EventCard;
