import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import candidateImg from '../assets/images/sample_candidate_profile_1790759931971.jpg';
import inspectionImg from '../assets/images/resume_ats_inspection_1790759914879.jpg';

export const SampleAuditSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <section id="sample-audit" className="py-16 lg:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
            <span>Verified Candidate Case Study</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>+140% Inbound Interview Rate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-display">
            Sample Audit: Before & After n8n Optimization
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            See how a typical software engineer's resume was audited by the pipeline, elevating ATS compatibility from 62% to 94% through metric-driven bullet restructuring.
          </p>
        </div>

        {/* Candidate Profile Bar & Toggle */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
              <img
                src={candidateImg}
                alt="Candidate Alex Rivera"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Alex Rivera</h3>
              <p className="text-xs text-slate-400">Senior Full-Stack Engineer · 6 Years Experience · Applied to Stripe & Datadog</p>
            </div>
          </div>

          {/* Interactive Toggle for Before/After */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('before')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'before'
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Original CV (62/100)
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'after'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              n8n Optimized (94/100)
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Detailed Bullet Comparison */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Bullet Audit & Rewrites
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+32 Score Delta</span>
                </span>
              </div>

              {/* Transformation 1 */}
              <div className="space-y-2 text-xs">
                <div className="text-slate-400 font-medium">Work Experience · Senior Software Engineer at FinTech SaaS</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-rose-950/60 text-slate-400">
                  <div className="text-[11px] font-semibold text-rose-400 mb-1">Before (Passive & Unquantified):</div>
                  <p className="line-through">
                    "Built microservices for payment routing and helped optimize transaction latency for high-volume customers."
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/60 text-slate-200">
                  <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>n8n Pipeline Recommendation (Google XYZ Formula):</span>
                  </div>
                  <p className="font-medium text-white">
                    "Architected high-throughput payment routing microservices in Go, decreasing P99 transaction latency by 44% (from 820ms to 460ms) across $42M in monthly settlement volume."
                  </p>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="space-y-2 text-xs">
                <div className="text-slate-400 font-medium">Cloud Infrastructure & CI/CD</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-rose-950/60 text-slate-400">
                  <div className="text-[11px] font-semibold text-rose-400 mb-1">Before:</div>
                  <p className="line-through">
                    "Worked with Docker and Kubernetes to deploy staging and production environments."
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/60 text-slate-200">
                  <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>n8n Pipeline Recommendation:</span>
                  </div>
                  <p className="font-medium text-white">
                    "Engineered automated GitOps deployment pipelines using Kubernetes and Helm, cutting release turnaround from 4 days to 18 minutes with zero unplanned downtime."
                  </p>
                </div>
              </div>
            </div>

            {/* Injected ATS Keywords */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Extracted & Injected High-Impact Skill Keywords
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Distributed Systems', 'Go / Golang', 'Kafka Event Streaming', 'PostgreSQL P99 Latency', 
                  'Kubernetes Orchestration', 'GitOps / ArgoCD', 'PCI-DSS Compliance', 'Zero-Downtime Migration'
                ].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded bg-slate-950 text-indigo-300 border border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Inspection Mockup */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-2 overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={inspectionImg}
                  alt="Resume structured ATS audit inspection"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md text-xs">
                  <div className="text-emerald-400 font-semibold mb-0.5">Automated Formatting Verification</div>
                  <p className="text-slate-300 text-[11px]">
                    Single-column layout verified for Workday ATS parsing. Zero unparsed graphical tables or complex multi-column floats.
                  </p>
                </div>
              </div>
            </div>

            {/* Metric Comparison Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Quantitative Comparison
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Total Quantified Metrics</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-rose-400">3 metrics</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-emerald-400 font-bold">14 metrics</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ATS Keyword Density</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-rose-400">38%</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-emerald-400 font-bold">89%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Action Verb Strength</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-rose-400">Weak ("Helped")</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-emerald-400 font-bold">Strong ("Architected")</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Recruiter Screening Time</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400">~6 seconds scan</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-indigo-400 font-bold">Immediate Call Trigger</span>
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
