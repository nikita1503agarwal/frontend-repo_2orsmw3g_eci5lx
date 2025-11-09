import React, { useState } from 'react';
import Hero from './components/Hero';
import Onboarding from './components/Onboarding';
import BudgetForm, { defaultRows } from './components/BudgetForm';
import BudgetChart from './components/BudgetChart';
import Insights from './components/Insights';

export default function App() {
  const [onboarding, setOnboarding] = useState(null);
  const [income, setIncome] = useState('');
  const [rows, setRows] = useState(defaultRows);

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-white via-[#fafafa] to-white text-neutral-900">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="font-semibold tracking-tight">SmartBudgetX</div>
        <div className="text-sm text-neutral-500">AI Budget & Investment Planner</div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Hero />
        <Onboarding onComplete={setOnboarding} />
        <BudgetForm income={income} setIncome={setIncome} rows={rows} setRows={setRows} />
        <BudgetChart income={income} rows={rows} />
        <Insights income={income} rows={rows} onboarding={onboarding} />
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        Built with care — SmartBudgetX
      </footer>
    </div>
  );
}
