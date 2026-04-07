import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Users, History, CheckServer, CalendarHeart } from 'lucide-react';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-20 lg:py-32 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200"
                >
                    <CalendarHeart className="w-3.5 h-3.5" />
                    <span>Our Journey</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight"
                >
                   Making events simple, <br />
                   <span className="text-blue-600">for everyone.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-lg lg:text-xl leading-relaxed"
                >
                    Eventify is more than just a website; it's a mission to bring creators and participants closer. We believe in the power of connection and knowledge. Our platform was born out of a simple need: To find and manage events without any friction.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-all duration-300">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Our Mission</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        To build a bridge between event organizers and attendees, making registrations, management, and discovery as seamless as possible. We thrive on professional growth and collective experiences.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-all duration-300">
                         <History className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">What We Do</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        From live workshops where experts share their wisdom to historical archives of passed events, we curate a repository of professional and cultural experiences for every enthusiast. 
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-all duration-300">
                         <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Get in Touch</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        We're always looking for new ways to improve. If you have advice, feedback, or just want to talk about events, we're here to listen. Expect a response from our small, dedicated team within 24 hours.
                    </p>
                </motion.div>
            </div>

            {/* Testimonial / Quote */}
            <div className="mt-32 p-12 bg-blue-600 rounded-[40px] text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/30">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
               <h3 className="text-2xl lg:text-3xl font-black mb-6 italic">"Events are the pulse of human culture and innovation."</h3>
               <p className="text-white/80 font-medium">Founder @ Eventify</p>
            </div>
        </div>
    );
};

export default About;
