import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    goal: '',
    investAreas: [],
    stockPref: '',
  });

  const investOptions = ['Stocks', 'Crypto', 'ETFs', 'Mutual Funds', 'Real Estate'];
  const stockPrefs = ['Tech', 'Energy', 'Healthcare', 'Diversified'];

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    if (onComplete) onComplete(form);
  };

  const toggleInvest = (opt) => {
    setForm((f) => {
      const set = new Set(f.investAreas);
      if (set.has(opt)) set.delete(opt);
      else set.add(opt);
      return { ...f, investAreas: Array.from(set) };
    });
  };

  return (
    <section className="mt-12 bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-black">Welcome</h2>
        <div className="text-sm text-neutral-500">Step {step + 1} of 4</div>
      </div>

      <div className="grid gap-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm text-neutral-600">Your name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Alex"
                className="h-11 rounded-xl border border-neutral-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-neutral-600">Financial goal</span>
              <input
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                placeholder="e.g., Save for a home down payment"
                className="h-11 rounded-xl border border-neutral-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black/10"
              />
            </label>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3">
            <div className="text-sm text-neutral-600">Where do you want to invest?</div>
            <div className="flex flex-wrap gap-2">
              {investOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleInvest(opt)}
                  className={`px-4 py-2 rounded-full border transition ${
                    form.investAreas.includes(opt)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-300 hover:border-black/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3">
            <div className="text-sm text-neutral-600">Preferred stocks / industries</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {stockPrefs.map((opt) => (
                <label key={opt} className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white p-3 cursor-pointer hover:border-neutral-400">
                  <input
                    type="radio"
                    name="stockPref"
                    value={opt}
                    checked={form.stockPref === opt}
                    onChange={(e) => setForm({ ...form, stockPref: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-2 text-neutral-700">
            <div><span className="text-neutral-500">Name:</span> {form.name || '—'}</div>
            <div><span className="text-neutral-500">Goal:</span> {form.goal || '—'}</div>
            <div><span className="text-neutral-500">Invest in:</span> {form.investAreas.join(', ') || '—'}</div>
            <div><span className="text-neutral-500">Stock preference:</span> {form.stockPref || '—'}</div>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button onClick={back} disabled={step === 0} className="px-4 py-2 rounded-lg text-neutral-600 hover:text-black disabled:opacity-40">
            Back
          </button>
          {step < 3 ? (
            <button onClick={next} className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-neutral-800">
              Continue
            </button>
          ) : (
            <button onClick={finish} className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-neutral-800">
              Start Planning
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
