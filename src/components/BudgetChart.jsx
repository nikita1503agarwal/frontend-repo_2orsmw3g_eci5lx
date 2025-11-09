import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#60a5fa', '#f59e0b', '#34d399'];

export default function BudgetChart({ income, rows }) {
  const data = useMemo(() => {
    const needs = rows.filter((r) => r.tag === 'Need').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const wants = rows.filter((r) => r.tag === 'Want').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const savings = rows.filter((r) => r.tag === 'Saving').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);

    const idealNeeds = (parseFloat(income) || 0) * 0.5;
    const idealWants = (parseFloat(income) || 0) * 0.3;
    const idealSavings = (parseFloat(income) || 0) * 0.2;

    return {
      actual: [
        { name: 'Needs', value: needs },
        { name: 'Wants', value: wants },
        { name: 'Savings', value: savings },
      ],
      ideal: [
        { name: 'Needs', value: idealNeeds },
        { name: 'Wants', value: idealWants },
        { name: 'Savings', value: idealSavings },
      ],
    };
  }, [income, rows]);

  return (
    <section className="mt-8 grid md:grid-cols-2 gap-6">
      <div className="bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-6">
        <h4 className="font-medium text-neutral-800 mb-4">Actual distribution</h4>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="value" data={data.actual} innerRadius={50} outerRadius={80} paddingAngle={3}>
                {data.actual.map((entry, index) => (
                  <Cell key={`cell-a-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-6">
        <h4 className="font-medium text-neutral-800 mb-4">Ideal (50/30/20)</h4>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="value" data={data.ideal} innerRadius={50} outerRadius={80} paddingAngle={3}>
                {data.ideal.map((entry, index) => (
                  <Cell key={`cell-b-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
