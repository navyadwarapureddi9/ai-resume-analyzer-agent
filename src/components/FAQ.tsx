import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does this website connect with the n8n URL?',
      a: 'This application transmits your name, email, and resume binary directly to the n8n form webhook endpoint hosted at navyadwarapureddi.app.n8n.cloud using multipart/form-data. In development and production, requests are passed to the webhook to ensure reliable transmission without CORS issues.'
    },
    {
      q: 'What resume file formats are accepted?',
      a: 'The pipeline accepts standard modern CV formats including PDF (.pdf), Microsoft Word (.docx, .doc), and plain text (.txt). We recommend single-column text-based PDFs for maximum cross-platform fidelity.'
    },
    {
      q: 'How does the automated scoring work?',
      a: 'The n8n workflow executes document text extraction, passes the parsed content through an AI evaluation model trained on recruiter rubrics, and calculates scores across four primary axes: ATS Parseability, Metric Rigor (XYZ formula), Brevity & Density, and Role-specific Keyword Match.'
    },
    {
      q: 'Is my resume data stored permanently?',
      a: 'No. The automated n8n pipeline processes documents transiently during the execution cycle. Your file is evaluated in memory and discarded upon completion of the analysis cycle.'
    },
    {
      q: 'Can I test the n8n form endpoint directly?',
      a: 'Yes! The exact n8n form is publicly hosted at https://navyadwarapureddi.app.n8n.cloud/form/6ffcb094-c23a-406d-b521-a9de92b4c437. You can view the raw n8n form or submit via this high-fidelity client interface.'
    }
  ];

  return (
    <section id="faq" className="py-16 lg:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Workflow & Pipeline FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about the automated n8n resume audit workflow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
