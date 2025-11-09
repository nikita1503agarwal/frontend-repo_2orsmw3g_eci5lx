import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const defaultRows = [
  { label: 'Rent / Mortgage', amount: '', tag: 'Need' },
  { label: 'Groceries / Essentials', amount: '', tag: 'Need' },
  { label: 'Utilities', amount: '', tag: 'Need' },
  { label: 'Transportation', amount: '', tag: 'Need' },
  { label: 'Entertainment', amount: '', tag: 'Want' },
  { label: 'Subscriptions', amount: '', tag: 'Want' },
];

export default function BudgetForm({ income, setIncome, rows, setRows }) {
  const addRow = () => setRows([...rows, { label: '', amount: '', tag: 'Need' }]);
  const removeRow = (idx) => setRows(rows.filter((_, i) => i !== idx));

  const totals = useMemo(() => {
    const needs = rows.filter((r) => r.tag === 'Need').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const wants = rows.filter((r) => r.tag === 'Want').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const savings = rows.filter((r) => r.tag === 'Saving').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const totalExpenses = needs + wants + savings;
    const leftover = (parseFloat(income) || 0) - totalExpenses;
    return { needs, wants, savings, totalExpenses, leftover };
  }, [rows, income]);

  return (
    <section className="mt-8 bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-black">Monthly Budget</h3>
        <div className="text-sm text-neutral-500">50 / 30 / 20 guidance</div>
      </div>

      <div className="grid gap-6">
        <label className="grid gap-2">
          <span className="text-sm text-neutral-600">Monthly income</span>
          <input
            inputMode="decimal"
            value={income}
            onChange={(e) => setIncome(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="e.g., 4500"
            className="h-11 rounded-xl border border-neutral-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black/10"
          />
        </label>

        <div className="grid gap-3">
          <div className="grid grid-cols-12 text-sm text-neutral-500 px-2">
            <div className="col-span-5">Category</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-3">Tag</div>
            <div className="col-span-1" />
          </div>
          {rows.map((row, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-2 items-center">
              <input
                value={row.label}
                onChange={(e) => setRows(rows.map((r, i) => (i === idx ? { ...r, label: e.target.value } : r)))}
                placeholder="e.g., Rent"
                className="col-span-5 h-11 rounded-xl border border-neutral-300 bg-white px-3"
              />
              <input
                inputMode="decimal"
                value={row.amount}
                onChange={(e) => setRows(rows.map((r, i) => (i === idx ? { ...r, amount: e.target.value.replace(/[^0-9.]/g, '') } : r)))}
                placeholder="0.00"
                className="col-span-3 h-11 rounded-xl border border-neutral-300 bg-white px-3"
              />
              <select
                value={row.tag}
                onChange={(e) => setRows(rows.map((r, i) => (i === idx ? { ...r, tag: e.target.value } : r)))}
                className="col-span-3 h-11 rounded-xl border border-neutral-300 bg-white px-3"
              >
                <option>Need</option>
                <option>Want</option>
                <option>Saving</option>
              </select>
              <button onClick={() => removeRow(idx)} className="col-span-1 text-neutral-400 hover:text-black">×</button>
            </motion.div>
          ))}
          <div>
            <button onClick={addRow} className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-black/40 bg-white">Add item</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <Stat label="Needs" value={totals.needs} tone="needs" />
          <Stat label="Wants" value={totals.wants} tone="wants" />
          <Stat label="Savings" value={totals.savings} tone="savings" />
          <Stat label="Leftover" value={totals.leftover} tone={totals.leftover >= 0 ? 'left' : 'over'} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }) {
  const color =
    tone === 'needs' ? 'bg-blue-100 text-blue-700' :
    tone === 'wants' ? 'bg-amber-100 text-amber-700' :
    tone === 'savings' ? 'bg-emerald-100 text-emerald-700' :
    tone === 'left' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700';

  return (
    <div className={`rounded-xl ${color} p-4 border border-black/5`}> 
      <div className="text-neutral-600">{label}</div>
      <div className="text-xl font-semibold">${Number(value || 0).toLocaleString()}</div>
    </div>
  );
}

export { defaultRows };
