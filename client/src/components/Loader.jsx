import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/5 backdrop-blur-sm">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full"
        />
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
           className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full blur-xl opacity-40 shadow-2xl shadow-blue-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
