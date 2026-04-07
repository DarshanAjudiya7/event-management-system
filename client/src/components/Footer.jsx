import React from 'react';
import { Mail, Phone, MapPin, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Eventify</span>
          </Link>
          <p className="text-slate-400 leading-relaxed text-sm">
            The world's leading event management platform for creators, organizations, and students.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-white font-bold text-lg">Quick Links</h3>
          <ul className="space-y-4">
            {['Home', 'About', 'Events', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-white font-bold text-lg">Categories</h3>
          <ul className="space-y-4">
            {['Live Workshops', 'Past Ceremonies', 'Upcoming Hackathons'].map((item) => (
              <li key={item}>
                <span className="text-slate-400 hover:text-blue-500 cursor-pointer transition-colors text-sm font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-white font-bold text-lg">Contact Us</h3>
          <ul className="space-y-5">
            <li className="flex items-center space-x-3 group">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <Phone className="w-4 h-4 text-blue-400 group-hover:text-white" />
              </div>
              <span className="text-slate-400 group-hover:text-white text-sm transition-colors">+91 93160 99633</span>
            </li>
            <li className="flex items-center space-x-3 group">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <Mail className="w-4 h-4 text-blue-400 group-hover:text-white" />
              </div>
              <span className="text-slate-400 group-hover:text-white text-sm transition-colors">ajudiya7106@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="container mx-auto px-4 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-slate-500 text-sm font-medium opacity-80">
          © 2026 Eventify Inc. All rights reserved.
        </p>
        <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" />
          <span>for better experiences</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
