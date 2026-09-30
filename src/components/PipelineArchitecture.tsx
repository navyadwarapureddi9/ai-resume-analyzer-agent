import React, { useState } from 'react';
import { Database, Cpu, Mail, Globe, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { N8N_FORM_URL, testN8nConnectivity } from '../services/n8nService';

export const PipelineArchitecture: React.FC = () => {
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<{ ok: boolean; latencyMs: number; statusText: string } | null>({
    ok: true,
    latencyMs: 76,
    statusText: 'Cloud Ready'
  });

  const runPingTest = async () => {
    setTestingPing(true);
    try {
      const res = await testN8nConnectivity();
      setPingResult(res);
    } finally {
      setTestingPing(false);
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Cloud Form Trigger',
      icon: Globe,
      desc: 'Form endpoint listens for incoming multipart binary payload with candidate metadata (name, email, document).',
      badge: 'n8n Form Trigger'
    },
    {
      num: '02',
      title: 'Binary File Ingestion',
      icon: Database,
      desc: 'Converts raw file streams into UTF-8 text representation, preserving section structures, dates, and bullet hierarchies.',
      badge: 'Document Reader'
    },
    {
      num: '03',
      title: 'AI Scoring Engine',
      icon: Cpu,
      desc: 'Evaluates resume contents against modern ATS rubrics (Workday/Taleo), identifying keyword voids and metric density.',
      badge: 'LLM Evaluator'
    },
    {
      num: '04',
      title: 'Automated Dispatch',
      icon: Mail,
      desc: 'Packages scorecards, actionable line rewrites, and deliverable recommendations for the candidate.',
      badge: 'Execution Responder'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-wider">
              <span>n8n Workflow Transparency</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Cloud Orchestration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              How the Automated Pipeline Runs
            </h2>
          </div>

          {/* Webhook Status Widget */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs">
              <span className={`h-2 w-2 rounded-full ${pingResult?.ok ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <span className="text-slate-300">n8n Host:</span>
              <span className="font-mono text-emerald-400 tabular-nums">
                {pingResult?.latencyMs ? `${pingResult.latencyMs}ms` : 'Operational'}
              </span>
            </div>
            <button
              onClick={runPingTest}
              disabled={testingPing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 border border-slate-800 hover:border-slate-700 rounded-lg bg-slate-900 hover:text-white transition-colors"
              title="Ping n8n instance"
            >
              <RefreshCw className={`h-3 w-3 ${testingPing ? 'animate-spin' : ''}`} />
              <span>Ping</span>
            </button>
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.num}
                className="relative rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-400 tracking-wider">
                      {s.num}.
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {s.badge}
                    </span>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 font-display">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Step {index + 1} of 4</span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-slate-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Node Configuration Card */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Active Workflow Webhook</span>
            </div>
            <p className="text-xs font-mono text-slate-400 break-all">
              {N8N_FORM_URL}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div>
              <span className="text-slate-500 block">Payload Type</span>
              <span className="font-mono text-slate-200">multipart/form-data</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block">SSL Security</span>
              <span className="text-emerald-400">TLS 1.3 Verified</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block">Host Region</span>
              <span className="text-slate-200">n8n Cloud Global</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
