import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { N8N_FORM_URL } from '../services/n8nService';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070A11] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-white font-mono text-[10px] font-bold">
              CV
            </span>
            <span className="font-bold text-white tracking-tight">Resume Analyzer</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Automated resume auditing engine powered by n8n Cloud Webhook orchestration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-slate-400">
          <a href="#analyzer" className="hover:text-white transition-colors">
            Audit Studio
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            n8n Pipeline
          </a>
          <a href="#sample-audit" className="hover:text-white transition-colors">
            Sample Audit
          </a>
          <a href="#ats-guidelines" className="hover:text-white transition-colors">
            ATS Standards
          </a>
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>n8n Cloud Endpoint</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
        <span>© {new Date().getFullYear()} Resume Analyzer. Integrated with Navya Dwarapureddi's n8n workflow.</span>
        <span>Secure ATS Evaluation Pipeline</span>
      </div>
    </footer>
  );
};
