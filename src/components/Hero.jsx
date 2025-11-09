import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-white rounded-3xl">
      <div className="absolute inset-0"> 
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-black"
        >
          SmartBudgetX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
          className="mt-4 max-w-2xl text-base md:text-lg text-neutral-600"
        >
          An AI‑powered budget and investment planner with a calm, premium feel. Plan smarter, invest wisely.
        </motion.p>
      </div>
    </section>
  );
}
