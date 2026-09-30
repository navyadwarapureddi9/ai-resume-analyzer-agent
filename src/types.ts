export interface FormSubmissionState {
  status: 'idle' | 'validating' | 'uploading' | 'processing' | 'waiting' | 'success' | 'error';
  progress: number;
  message?: string;
  error?: string;
  responsePayload?: unknown;
}

export interface CandidateFormData {
  fullName: string;
  email: string;
  file: File | null;
  targetRole?: string;
  experienceLevel?: string;
  jobDescription?: string;
}

export interface AnalysisSummary {
  overallScore: number;
  atsScore: number;
  impactScore: number;
  brevityScore: number;
  strengths: string[];
  improvements: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletAnalysis: {
    original: string;
    suggestion: string;
    issue: string;
  }[];
}
