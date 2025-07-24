import React from 'react';
import { Check } from 'lucide-react';
import { ApplicationStep } from '../../../types';

interface StepperProps {
  currentStep: ApplicationStep;
  completedSteps: ApplicationStep[];
  onStepClick: (step: ApplicationStep) => void;
}

const steps: { id: ApplicationStep; label: string }[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'professional', label: 'Professional' },
  { id: 'educational', label: 'Educational' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' }
];

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  completedSteps,
  onStepClick
}) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const currentStepIndex = getCurrentStepIndex();

  const getStepStatus = (stepIndex: number, stepId: ApplicationStep) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full py-4">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index, step.id);
            const isClickable = status === 'completed' || status === 'current';

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`
                    relative flex items-center justify-center w-8 h-8 rounded-full font-medium text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
                    ${status === 'completed' 
                      ? 'bg-lime-400 text-black hover:bg-lime-300 cursor-pointer focus:ring-lime-500' 
                      : status === 'current'
                      ? 'bg-lime-400/20 text-lime-300 border-2 border-lime-400 cursor-pointer focus:ring-lime-500'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <Check size={14} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Step Label */}
                <div className="ml-3 flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    status === 'current' ? 'text-lime-400' : 
                    status === 'completed' ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-3 ${
                    index < currentStepIndex || completedSteps.includes(steps[index + 1].id)
                      ? 'bg-lime-400' 
                      : 'bg-slate-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Compact Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-lime-400">
            {steps[currentStepIndex].label}
          </span>
        </div>
        
        {/* Mobile Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((currentStepIndex + 1) / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Compact Progress Info */}
      <div className="hidden md:flex justify-between items-center mt-3 text-xs text-slate-400">
        <span>Progress: {Math.round(((completedSteps.length + 1) / steps.length) * 100)}%</span>
        <span>{completedSteps.length} of {steps.length} completed</span>
      </div>
    </div>
  );
};