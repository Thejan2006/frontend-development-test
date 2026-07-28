import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, ArrowRight, ShoppingBag, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccess() {
  useEffect(() => {
    // Order success confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Neon Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container with Framer Motion Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        
        {/* Animated Checkmark Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <CheckCircle2 size={44} />
        </motion.div>

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Order Confirmed!
        </h2>
        <p className="text-slate-400 text-center text-sm mt-2">
          ඔබගේ ඇණවුම සාර්ථකව සටහන් කරගන්නා ලදී.
        </p>

        {/* Estimated Delivery Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4"
        >
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Truck size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Clock size={12} /> Estimated Delivery
            </div>
            <div className="text-lg font-bold text-slate-100 mt-0.5">
              {formattedDate}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingBag size={18} /> Continue Shopping
            </motion.button>
          </Link>

          <Link to="/my-orders" className="flex-1">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 text-sm"
            >
              View My Orders <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}