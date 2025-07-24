'use client'

import React, { useState } from 'react';
import { Header } from './layout/Header';
import { ApplicantView } from './views/ApplicantView';
import { TalentView } from './views/TalentView';

export type View = 'applicant' | 'talent';

const JsonJuiceApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('applicant');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'applicant':
        return <ApplicantView />;
      case 'talent':
        return <TalentView />;
      default:
        return <ApplicantView />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-gradient-to-br from-black via-slate-900 to-black">
      <Header currentView={currentView} setView={setCurrentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default JsonJuiceApp;