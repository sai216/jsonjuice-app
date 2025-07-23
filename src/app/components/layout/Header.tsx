import React from 'react';
import { Users, Briefcase } from 'lucide-react';
import { View } from '../../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-lime-400">
              JsonJuice Portal
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('applicant')}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${currentView === 'applicant'
                    ? 'bg-lime-400/20 text-lime-300 ring-lime-500'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white ring-transparent'
                  }
                `}
              >
                <Users className="w-4 h-4 mr-2" />
                Applicant Portal
              </button>
              
              <button
                onClick={() => setView('talent')}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${currentView === 'talent'
                    ? 'bg-lime-400/20 text-lime-300 ring-lime-500'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white ring-transparent'
                  }
                `}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Talent Marketplace
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={currentView}
              onChange={(e) => setView(e.target.value as View)}
              className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-300 focus:ring-lime-400 focus:border-lime-400"
            >
              <option value="applicant">Applicant Portal</option>
              <option value="talent">Talent Marketplace</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};