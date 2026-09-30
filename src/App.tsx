/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeAnalyzerForm } from './components/ResumeAnalyzerForm';
import { PipelineArchitecture } from './components/PipelineArchitecture';
import { SampleAuditSection } from './components/SampleAuditSection';
import { ATSGuide } from './components/ATSGuide';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { testN8nConnectivity } from './services/n8nService';

export default function App() {
  const [latencyMs, setLatencyMs] = useState(84);

  useEffect(() => {
    testN8nConnectivity().then((res) => {
      if (res.latencyMs > 0) {
        setLatencyMs(res.latencyMs);
      }
    });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Navigation */}
      <Navbar 
        onScrollToForm={() => scrollToSection('analyzer')} 
        latencyMs={latencyMs} 
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onStartAnalysis={() => scrollToSection('analyzer')} 
          onExploreSample={() => scrollToSection('sample-audit')} 
        />

        {/* Live Resume Analyzer Studio */}
        <ResumeAnalyzerForm />

        {/* n8n Automation Architecture */}
        <PipelineArchitecture />

        {/* Interactive Sample Audit */}
        <SampleAuditSection />

        {/* ATS Guidelines and Compliance Matrix */}
        <ATSGuide />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
