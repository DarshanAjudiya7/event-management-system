import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, MapPin, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mimic API delay
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactOptions = [
    { icon: <Phone className="w-5 h-5" />, title: 'Mobile', value: '9316099633', href: 'tel:9316099633' },
    { icon: <Mail className="w-5 h-5" />, title: 'Email', value: 'ajudiya7106@gmail.com', href: 'mailto:ajudiya7106@gmail.com' },
    { icon: <Globe className="w-5 h-5" />, title: 'Location', value: 'Surat, Gujarat, India', href: '#' },
  ];

  return (
    <div className="container mx-auto px-4 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Info Column */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </motion.div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
              Let’s build something <br />
              <span className="text-blue-600">extraordinary.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              Have questions or suggestions? We’d love to hear from you. Our professional team is ready to assist you.
            </p>
          </div>

          <div className="space-y-6">
             {contactOptions.map((opt, i) => (
                <a
                  key={i}
                  href={opt.href}
                  className="flex items-center space-x-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group"
                >
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {opt.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{opt.title}</p>
                    <p className="text-lg font-bold text-slate-800 leading-none">{opt.value}</p>
                  </div>
                </a>
             ))}
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[40px] p-8 lg:p-12 border border-slate-100 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-600 z-50 flex flex-col items-center justify-center p-10 text-center"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                <p className="text-blue-50 text-lg font-medium opacity-90 leading-relaxed mb-8">
                  Thank you, we'll get back to you as soon as possible.
                </p>
                <button
                   onClick={() => setIsSuccess(false)}
                   className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                    Sent Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
              <textarea
                required
                rows="5"
                placeholder="How can we help you today?"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95 disabled:scale-100 disabled:opacity-70 flex items-center justify-center space-x-3 group"
            >
              {loading ? (
                 <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
