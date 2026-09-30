import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { N8N_FORM_URL } from '../services/n8nService';

interface NavbarProps {
  onScrollToForm: () => void;
  latencyMs?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm, latencyMs = 84 }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:text-indigo-300 transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-sm font-bold shadow-sm shadow-indigo-500/20">
            CV
          </span>
          <span>Resume Analyzer</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#analyzer" className="hover:text-white transition-colors">
            Analyzer
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            n8n Pipeline
          </a>
          <a href="#sample-audit" className="hover:text-white transition-colors">
            Sample Audit
          </a>
          <a href="#ats-guidelines" className="hover:text-white transition-colors">
            ATS Benchmarks
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 border border-slate-800 rounded-md hover:border-slate-700 transition-colors whitespace-nowrap"
            title="Inspect active n8n cloud form"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>n8n Cloud · {latencyMs}ms</span>
            <ArrowUpRight className="h-3 w-3 text-slate-500" />
          </a>

          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors whitespace-nowrap"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Audit My Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
