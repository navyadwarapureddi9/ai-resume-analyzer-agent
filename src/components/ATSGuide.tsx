import React from 'react';
import { Check, X, ShieldAlert, BookOpen } from 'lucide-react';

export const ATSGuide: React.FC = () => {
  const rules = [
    {
      title: '01. The Google XYZ Formula',
      desc: 'Top tech companies and automated parsers prioritize bullets structured with quantifiable causation.',
      formula: 'Accomplished [X], as measured by [Y], by doing [Z].',
      example: 'Reduced AWS infrastructure costs by $140,000 annually by transitioning batch workloads to Spot instances.'
    },
    {
      title: '02. Single-Column Hierarchy',
      desc: 'Many ATS scanners read text left-to-right across lines. Multi-column tables cause text lines from different columns to jumble together.',
      formula: 'Header → Summary → Work Experience → Skills → Education.',
      example: 'Clean linear reading order guarantees 100% token extraction without table truncation.'
    },
    {
      title: '03. Canonical Section Headers',
      desc: 'Avoid creative labels like "Where I Have Been" or "My Superpowers". Standard ATS parsers look for exact standard tokens.',
      formula: 'Use: "Work Experience", "Education", "Technical Skills", "Certifications".',
      example: 'Permits the n8n binary reader to segment dates, companies, and roles reliably.'
    }
  ];

  return (
    <section id="ats-guidelines" className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
            <span>ATS Compliance Playbook</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Applicant Tracking System Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-display">
            ATS Benchmarks & Best Practices
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Over 90% of Fortune 500 organizations use automated parsers like Workday, Greenhouse, and Lever. Here is how our automated n8n pipeline audits your documents.
          </p>
        </div>

        {/* 3 Core Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {rules.map((rule, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    {rule.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {rule.desc}
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 mb-4">
                  {rule.formula}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-3">
                "{rule.example}"
              </div>
            </div>
          ))}
        </div>

        {/* Dos and Don'ts Matrix */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-indigo-400" />
            <span>Format Compatibility Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The DOs */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                Recommended by ATS Parsers
              </div>
              {[
                'Standard fonts: Plus Jakarta Sans, Arial, Calibri, Times New Roman',
                'Single-column linear layout without text boxes or table grids',
                'Quantified metrics in at least 70% of work experience bullets',
                'Standard MM/YYYY or YYYY date formatting for tenure calculation',
                'Clean plain-text contact details (Email, Phone, LinkedIn, GitHub)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="h-4 w-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* The DONTs */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                Penalized by ATS Algorithms
              </div>
              {[
                'Embedding contact details or skills inside headers/footers',
                'Skill level progress bars or arbitrary rating dots (e.g. 4/5 stars in Python)',
                'Icons, graphic avatars, or photos (often ignored or causes parser crashes)',
                'Non-standard section titles like "What I Do" or "About Me" for work history',
                'Saving as low-resolution flattened image PDFs where text cannot be highlighted'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="h-4 w-4 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
