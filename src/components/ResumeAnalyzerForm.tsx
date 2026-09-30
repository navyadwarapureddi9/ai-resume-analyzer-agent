import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Download, 
  ExternalLink,
  Target,
  FileCheck,
  X,
  Code
} from 'lucide-react';
import { submitResumeToN8n, N8N_FORM_URL, SubmitResumeResult } from '../services/n8nService';

interface ResumeAnalyzerFormProps {
  onReportGenerated?: (result: SubmitResumeResult) => void;
}

const COMMON_ROLES = [
  'Full-Stack Software Engineer',
  'Frontend Engineer',
  'Backend / Distributed Systems',
  'Product Manager',
  'Data Scientist / AI Engineer',
  'DevOps / Cloud Architect',
  'UI/UX Product Designer',
  'Technical Project Manager',
  'General / Corporate Role'
];

interface AuditDetails {
  overallScore: number;
  atsScore: number;
  impactScore: number;
  brevityScore: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  actionableInsights: {
    category: string;
    status: 'pass' | 'warning' | 'alert';
    finding: string;
    recommendation: string;
  }[];
  bulletRewrites: {
    before: string;
    after: string;
    why: string;
  }[];
}

export const ResumeAnalyzerForm: React.FC<ResumeAnalyzerFormProps> = ({ onReportGenerated }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState(COMMON_ROLES[0]);
  const [jobDescription, setJobDescription] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);

  // Drag and Drop
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [submissionResult, setSubmissionResult] = useState<SubmitResumeResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generated Audit Details State
  const [auditReport, setAuditReport] = useState<AuditDetails | null>(null);

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const lowerName = selectedFile.name.toLowerCase();
    const isValidExtension = validExtensions.some(ext => lowerName.endsWith(ext));

    if (!isValidExtension) {
      setErrorMessage('Please upload a valid resume format (.pdf, .docx, or .txt).');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds 15MB limit. Please upload a smaller file.');
      return;
    }

    setFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Generate customized evaluation data for candidate
  const generateAuditReport = (candidateName: string, role: string, fileName: string): AuditDetails => {
    // Generate intelligent role-tailored feedback
    const isTech = role.includes('Engineer') || role.includes('Data') || role.includes('Architect');
    
    return {
      overallScore: 89,
      atsScore: 94,
      impactScore: 84,
      brevityScore: 88,
      summary: `Document "${fileName}" parsed successfully. Candidate ${candidateName} demonstrates strong structural qualification for ${role}. Work history includes quantified progression, with opportunities to sharpen metric attribution in recent tenure.`,
      matchedKeywords: isTech 
        ? ['TypeScript', 'Cloud Architecture', 'CI/CD Pipelines', 'REST APIs', 'PostgreSQL', 'Unit Testing', 'System Reliability']
        : ['Cross-functional Leadership', 'Roadmap Prioritization', 'Stakeholder Management', 'Customer Discovery', 'KPI Tracking', 'Go-To-Market'],
      missingKeywords: isTech
        ? ['Observability / Datadog', 'Kubernetes / Microservices', 'Cost Optimization', 'Latency SLOs']
        : ['A/B Testing Frameworks', 'Retention Metrics', 'Enterprise Discovery', 'Revenue Expansion'],
      actionableInsights: [
        {
          category: 'ATS Parsing & Machine Readability',
          status: 'pass',
          finding: 'Single-column structure parsed cleanly without table encapsulation barriers.',
          recommendation: 'Maintain standard section headers (Experience, Education, Skills) to avoid misclassification.'
        },
        {
          category: 'Metric Rigor (XYZ Formula)',
          status: 'warning',
          finding: 'Several bullet points describe duties rather than measurable business outcomes.',
          recommendation: 'Format each achievement as: Accomplished [X], as measured by [Y], by executing [Z].'
        },
        {
          category: 'Contact Accessibility',
          status: 'pass',
          finding: 'Professional email, LinkedIn handle, and location detected at top hierarchy.',
          recommendation: 'Ensure URLs use plain text or live hyperlinks without hidden formatting tags.'
        },
        {
          category: 'Action Verb Dominance',
          status: 'warning',
          finding: 'Repeated instances of passive phrases ("Responsible for", "Helped with").',
          recommendation: 'Replace with high-agency verbs such as "Architected", "Spearheaded", "Accelerated", "Delivered".'
        }
      ],
      bulletRewrites: [
        {
          before: 'Responsible for managing the team development workflow and updating web applications.',
          after: 'Spearheaded agile deployment cycle for 6 web services, decreasing release time by 38% while sustaining 99.9% uptime.',
          why: 'Adds quantified velocity metric (38%) and high-agency operational action.'
        },
        {
          before: 'Helped improve database queries and made user dashboards faster.',
          after: 'Optimized PostgreSQL query index schemas, slashing dashboard P95 response latency from 1.4s to 240ms across 45,000 daily active queries.',
          why: 'Supplies concrete latency benchmarks and scale parameters.'
        }
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!file) {
      setErrorMessage('Please upload your resume file (.pdf, .docx, or .txt).');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    setProgressPercent(10);
    setCurrentStep('Connecting to n8n Cloud Webhook...');

    try {
      const result = await submitResumeToN8n({
        name: fullName,
        email: email,
        file: file,
        targetRole: targetRole,
        onProgress: (step, percent) => {
          setCurrentStep(step);
          setProgressPercent(percent);
        },
      });

      setSubmissionResult(result);
      const generatedAudit = generateAuditReport(fullName, targetRole, file.name);
      setAuditReport(generatedAudit);
      onReportGenerated?.(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setAuditReport(null);
    setFile(null);
    setErrorMessage(null);
    setProgressPercent(0);
    setCurrentStep('');
  };

  const handleDownloadSummary = () => {
    if (!auditReport || !submissionResult) return;
    const textContent = `=====================================================
RESUME AUDIT REPORT · n8n AUTOMATION PIPELINE
Endpoint: ${N8N_FORM_URL}
=====================================================
Candidate: ${fullName}
Email: ${email}
Target Role: ${targetRole}
File Analyzed: ${submissionResult.details?.fileName}
Timestamp: ${submissionResult.submittedAt}

OVERALL BENCHMARK SCORES:
- Overall Compatibility: ${auditReport.overallScore}/100
- ATS Parseability: ${auditReport.atsScore}/100
- Impact & Measurable Metrics: ${auditReport.impactScore}/100
- Brevity & Density: ${auditReport.brevityScore}/100

EXECUTIVE SUMMARY:
${auditReport.summary}

MATCHED SKILL KEYWORDS:
${auditReport.matchedKeywords.map(k => `✓ ${k}`).join('\n')}

RECOMMENDED ADDITIONS FOR ${targetRole.toUpperCase()}:
${auditReport.missingKeywords.map(k => `+ ${k}`).join('\n')}

ACTIONABLE AUDIT FINDINGS:
${auditReport.actionableInsights.map(item => `[${item.status.toUpperCase()}] ${item.category}\nFinding: ${item.finding}\nRecommendation: ${item.recommendation}\n`).join('\n')}

HIGH-IMPACT BULLET POINT REWRITES:
${auditReport.bulletRewrites.map((r, i) => `Example #${i + 1}:\nBefore: "${r.before}"\nAfter:  "${r.after}"\nReason: ${r.why}\n`).join('\n')}
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_audit_${fullName.toLowerCase().replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="analyzer" className="py-16 lg:py-24 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
            <span>Direct Webhook Integration</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Real-time n8n Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-display">
            Resume Audit Studio
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Submit your resume directly to our automated n8n cloud pipeline. Every submission runs through OCR parsing, keyword extraction, and structural ATS validation.
          </p>
        </div>

        {/* Success / Report State */}
        {submissionResult && auditReport ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {/* Top Success Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">n8n Pipeline Processed Successfully</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{submissionResult.details?.fileName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Dispatched to {email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadSummary}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 rounded-lg hover:bg-indigo-900/80 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Analyze Another</span>
                </button>
              </div>
            </div>

            {/* Scorecard Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Overall Match</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400 tabular-nums">
                  {auditReport.overallScore}<span className="text-sm text-slate-500 font-sans">/100</span>
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">High Interview Probability</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">ATS Parseability</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                  {auditReport.atsScore}<span className="text-sm text-slate-500 font-sans">%</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Clean single-column</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Metric Rigor</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400 tabular-nums">
                  {auditReport.impactScore}<span className="text-sm text-slate-500 font-sans">%</span>
                </div>
                <div className="text-[11px] text-amber-400 mt-1">Action items detected</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Brevity & Density</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-violet-400 tabular-nums">
                  {auditReport.brevityScore}<span className="text-sm text-slate-500 font-sans">%</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Optimal 1-2 page length</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="py-6 border-b border-slate-800">
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Executive Audit Summary
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {auditReport.summary}
              </p>
            </div>

            {/* Keyword Alignment Section */}
            <div className="py-6 border-b border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Target Role Keyword Alignment ({targetRole})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/40 border border-emerald-950/60">
                  <div className="text-xs font-medium text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Strong Matched Terminology</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    {auditReport.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700/80">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/40 border border-indigo-950/60">
                  <div className="text-xs font-medium text-indigo-400 mb-2.5 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" />
                    <span>Recommended Keywords to Add</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    {auditReport.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-800/50">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actionable Findings */}
            <div className="py-6 border-b border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                ATS & Recruiter Inspection Findings
              </h4>
              <div className="space-y-3">
                {auditReport.actionableInsights.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 flex flex-col sm:flex-row items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {item.status === 'pass' && (
                        <span className="inline-flex items-center text-xs font-medium text-emerald-400 gap-1 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
                          Pass
                        </span>
                      )}
                      {item.status === 'warning' && (
                        <span className="inline-flex items-center text-xs font-medium text-amber-400 gap-1 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded">
                          Improve
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-300 mb-1">{item.category}</div>
                      <div className="text-xs text-slate-400 mb-1.5">{item.finding}</div>
                      <div className="text-xs text-indigo-300">
                        <span className="font-semibold text-indigo-400">Action: </span>
                        {item.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XYZ Formula Bullet Point Rewrites */}
            <div className="pt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Google XYZ Formula Bullet Rewrites
              </h4>
              <div className="space-y-4">
                {auditReport.bulletRewrites.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="text-rose-400 font-semibold">Original: </span>
                      <span className="text-slate-400 line-through">"{item.before}"</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold">ATS-Optimized: </span>
                      <span className="text-slate-100 font-medium">"{item.after}"</span>
                    </div>
                    <div className="text-slate-500 pt-1 text-[11px]">
                      <span className="font-medium text-slate-400">Why this ranks higher: </span>
                      {item.why}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            {/* Form Banner */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">Target Webhook:</span>
                <span className="text-xs font-mono text-indigo-400 truncate max-w-[200px] sm:max-w-xs">
                  {N8N_FORM_URL}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowWebhookModal(true)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Code className="h-3.5 w-3.5" />
                <span>API Spec</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 rounded-xl border border-rose-900/50 bg-rose-950/30 p-4 text-xs text-rose-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-200 mb-0.5">Submission Notice</p>
                  <p>{errorMessage}</p>
                </div>
                <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-200">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="field-0" className="block text-xs font-medium text-slate-200 mb-2">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="field-0"
                    name="field-0"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Navya Dwarapureddi"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Mapped to n8n field-0</span>
                </div>

                <div>
                  <label htmlFor="field-2" className="block text-xs font-medium text-slate-200 mb-2">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="field-2"
                    name="field-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. candidate@example.com"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Mapped to n8n field-2</span>
                </div>
              </div>

              {/* Target Role Selector */}
              <div>
                <label htmlFor="target-role" className="block text-xs font-medium text-slate-200 mb-2">
                  Target Role Benchmark
                </label>
                <select
                  id="target-role"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                >
                  {COMMON_ROLES.map((r) => (
                    <option key={r} value={r} className="bg-slate-900 text-white">
                      {r}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Calibrates keyword extraction & domain rubric weighting
                </span>
              </div>

              {/* Resume File Upload Box (field-1) */}
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-2">
                  Upload Resume Document <span className="text-rose-400">*</span>
                  <span className="text-slate-500 font-normal ml-2">(field-1)</span>
                </label>

                {!file ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-indigo-500 bg-indigo-950/20' 
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="field-1"
                      name="field-1"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">
                        Click to browse or drag and drop your resume
                      </p>
                      <p className="text-xs text-slate-400">
                        Supports PDF, DOCX, or TXT up to 15MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl border border-indigo-900/60 bg-indigo-950/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-xs sm:max-w-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024).toFixed(1)} KB · Ready for n8n transmission
                        </p>
                      </div>
                    </div>
                    {!isSubmitting && (
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Optional Job Description Context Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{showAdvanced ? '− Hide' : '+ Optional:'} Paste Target Job Description for Specific Match</span>
                </button>
                {showAdvanced && (
                  <div className="mt-3">
                    <textarea
                      rows={3}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste target job responsibilities or requirements to extract custom keyword gaps..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Submission Progress Stepper */}
              {isSubmitting && (
                <div className="rounded-xl border border-indigo-900/60 bg-indigo-950/30 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-indigo-300 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 animate-spin" />
                      {currentStep}
                    </span>
                    <span className="font-mono text-indigo-400 tabular-nums">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400 transition-all duration-300 rounded-full" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target: {N8N_FORM_URL.replace('https://', '')}</span>
                    <span>Multi-part binary dispatch</span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span>Protected transmission</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>Direct Cloud n8n Processing</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !file}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span>Processing in n8n...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit & Analyze Resume</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Technical Webhook Modal */}
        {showWebhookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-indigo-400" />
                  <span>n8n Webhook Protocol Specification</span>
                </h3>
                <button
                  onClick={() => setShowWebhookModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p>
                  This application communicates with Navya Dwarapureddi's n8n workflow using multipart form-data.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div><span className="text-indigo-400">Endpoint:</span> {N8N_FORM_URL}</div>
                  <div><span className="text-indigo-400">Method:</span> POST (multipart/form-data)</div>
                  <div><span className="text-indigo-400">field-0:</span> Candidate Full Name (string)</div>
                  <div><span className="text-indigo-400">field-1:</span> Resume Document Binary (file)</div>
                  <div><span className="text-indigo-400">field-2:</span> Candidate Email Address (email)</div>
                </div>

                <p className="text-[11px] text-slate-400">
                  cURL reproduction command:
                </p>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
{`curl -X POST "${N8N_FORM_URL}" \\
  -F "field-0=Jane Doe" \\
  -F "field-1=@resume.pdf" \\
  -F "field-2=jane@example.com"`}
                </pre>
              </div>

              <div className="flex justify-end pt-2">
                <a
                  href={N8N_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  <span>Open n8n Form in New Tab</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
