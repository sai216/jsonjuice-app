'use client'

import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { ApplicantView } from './components/views/ApplicantView';
import { TalentView } from './components/views/TalentView';
import { View } from './../types';

interface JobApplication {
  jobId: number;
  jobTitle: string;
  company: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('applicant');
  const [jobApplication, setJobApplication] = useState<JobApplication | null>(null);

  const handleApplyClick = (jobId: number, jobTitle: string, company: string) => {
    // Store the job information
    setJobApplication({ jobId, jobTitle, company });
    
    // Switch to applicant view
    setCurrentView('applicant');
    
    // Optional: Show a toast notification
    console.log(`Applying for: ${jobTitle} at ${company}`);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    
    // Clear job application when switching views manually
    if (view === 'talent') {
      setJobApplication(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'applicant':
        return <ApplicantView jobApplication={jobApplication} />;
      case 'talent':
        return <TalentView onApplyClick={handleApplyClick} />;
      default:
        return <ApplicantView jobApplication={jobApplication} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-gradient-to-br from-black via-slate-900 to-black">
      <Header currentView={currentView} setView={handleViewChange} />
      
      {/* Job Application Banner */}
      {jobApplication && currentView === 'applicant' && (
        <div className="bg-lime-400/10 border-b border-lime-400/20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span className="text-lime-400 font-medium text-sm">
                Applying for: {jobApplication.jobTitle} at {jobApplication.company}
              </span>
            </div>
            <button
              onClick={() => setJobApplication(null)}
              className="text-slate-400 hover:text-slate-300 text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}