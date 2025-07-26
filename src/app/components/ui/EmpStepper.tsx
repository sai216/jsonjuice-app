import React from 'react';
import { 
  Briefcase, 
  Plus,
  BarChart3,
  Users
} from 'lucide-react';

type EmployerStep = 'dashboard' | 'post-job' | 'manage-jobs' | 'applications' | 'analytics';

interface EmployerStepperProps {
  currentStep: EmployerStep;
  setCurrentStep: (step: EmployerStep) => void;
}

const employerSteps: { id: EmployerStep; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
  { id: 'post-job', label: 'Post Job', icon: <Plus size={16} /> },
  { id: 'manage-jobs', label: 'Manage Jobs', icon: <Briefcase size={16} /> },
  { id: 'applications', label: 'Applications', icon: <Users size={16} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> }
];

export const EmployerStepper: React.FC<EmployerStepperProps> = ({ 
  currentStep, 
  setCurrentStep 
}) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-center">
        <div className="flex bg-slate-900/50 rounded-lg p-1 overflow-x-auto">
          {employerSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap
                ${currentStep === step.id
                  ? 'bg-lime-400/20 text-lime-300 ring-lime-500'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 ring-transparent'
                }
              `}
            >
              {step.icon}
              {step.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};