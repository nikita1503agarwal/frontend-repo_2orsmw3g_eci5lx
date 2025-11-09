import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function Insights({ income, rows, onboarding }) {
  const containerRef = useRef(null);

  const summary = useMemo(() => {
    const needs = rows.filter((r) => r.tag === 'Need').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const wants = rows.filter((r) => r.tag === 'Want').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const savings = rows.filter((r) => r.tag === 'Saving').reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    const total = needs + wants + savings;
    const inc = parseFloat(income) || 0;
    const leftover = inc - total;

    // Investment suggestion
    const prefs = onboarding?.stockPref || 'Diversified';
    const hasTech = prefs.toLowerCase().includes('tech');
    const splits = hasTech
      ? [
          { label: 'Tech ETFs', pct: 0.6 },
          { label: 'Blue-chip stocks', pct: 0.3 },
          { label: 'Emergency savings', pct: 0.1 },
        ]
      : [
          { label: 'Broad-market ETFs', pct: 0.5 },
          { label: 'Dividend stocks', pct: 0.3 },
          { label: 'Emergency savings', pct: 0.2 },
        ];

    const allocation = leftover > 0
      ? splits.map((s) => ({ ...s, amount: leftover * s.pct }))
      : [];

    const tips = [
      'Diversification spreads risk across assets.',
      'Match investment horizon with risk level.',
      'Automate contributions to build consistency.',
    ];

    return { needs, wants, savings, total, leftover, allocation, tips };
  }, [income, rows, onboarding]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const name = onboarding?.name || 'SmartBudgetX User';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('SmartBudgetX — Monthly Report', 14, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${name}`, 14, 32);
    doc.text(`Income: $${Number(income || 0).toLocaleString()}`, 14, 40);
    doc.text(`Needs: $${Number(summary.needs).toLocaleString()}`, 14, 48);
    doc.text(`Wants: $${Number(summary.wants).toLocaleString()}`, 14, 56);
    doc.text(`Savings: $${Number(summary.savings).toLocaleString()}`, 14, 64);
    doc.text(`Leftover: $${Number(summary.leftover).toLocaleString()}`, 14, 72);

    if (summary.allocation.length) {
      doc.text('Suggested Allocation:', 14, 86);
      summary.allocation.forEach((a, i) => {
        doc.text(`- ${a.label}: $${a.amount.toFixed(2)}`, 18, 94 + i * 8);
      });
    }

    doc.save('SmartBudgetX_Report.pdf');
  };

  return (
    <section ref={containerRef} className="mt-8 bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-black">Insights & Recommendations</h3>
        <button onClick={downloadPDF} className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-black/40 bg-white">Download PDF</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="grid gap-2 text-sm">
          <Row label="Total Income" value={income} bold />
          <Row label="Total Needs" value={summary.needs} />
          <Row label="Total Wants" value={summary.wants} />
          <Row label="Total Savings" value={summary.savings} />
          <Row label="Leftover" value={summary.leftover} accent={summary.leftover >= 0} />
        </div>

        <div className="md:col-span-2 grid gap-3">
          {summary.leftover > 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm text-emerald-700">
                You have ${Number(summary.leftover).toLocaleString()} left this month. Suggested allocation:
              </div>
              <ul className="mt-2 grid gap-1 text-sm text-emerald-800">
                {summary.allocation.map((a) => (
                  <li key={a.label}>• {a.label}: ${a.amount.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              You're over budget. Consider trimming some wants or renegotiating fixed costs.
            </div>
          )}

          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="font-medium mb-2">Quick Lessons</div>
            <ul className="text-sm text-neutral-700 grid gap-1">
              {summary.tips.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className={`text-neutral-600 ${bold ? 'font-medium text-neutral-800' : ''}`}>{label}</div>
      <div className={`${accent ? 'text-emerald-700 font-medium' : 'text-neutral-800'}`}>${Number(value || 0).toLocaleString()}</div>
    </div>
  );
}
