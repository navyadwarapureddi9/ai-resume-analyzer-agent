import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import heroImage from '../assets/images/hero_resume_analyzer_1790759900693.jpg';

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onExploreSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/80">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-sky-500/10 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 mb-4 tracking-wide uppercase">
              <span>n8n Cloud Automation</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Intelligent ATS Audit</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Instant Recruiter Benchmark</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Instant AI Resume Audit Powered by <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">n8n Automation</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Eliminate candidate drop-off before recruiters even open your file. Submit your resume to our live automated workflow to parse keywords, detect structural ATS penalties, and benchmark quantifiable impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500 transition-all cursor-pointer"
              >
                <span>Upload & Audit Resume</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreSample}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-3.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                <span>View Sample Report</span>
              </button>
            </div>

            {/* Quiet Trust & Technical Proof Signals */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80 pt-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero File Retention Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Compatible with Workday, Taleo & Lever ATS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Direct n8n Cloud Webhook Pipeline</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={heroImage}
                  alt="Minimalist workstation showing digital resume inspection interface"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Graceful fallback container
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback gradient if image load fails */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 -z-10 flex items-center justify-center p-6">
                  <span className="text-slate-400 text-sm">Resume Analyzer Pipeline Visual</span>
                </div>

                {/* Measured Scrim for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Live Audit Overlay Pill */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-slate-800/90 bg-slate-900/90 p-3.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Live Automation Metric</span>
                    <span className="font-mono text-emerald-400 tabular-nums">98.4% ATS Compatibility</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full w-[94%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Target: Full-Stack Engineer</span>
                    <span>14 Keywords Aligned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
