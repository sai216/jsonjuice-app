import React from 'react';
import { 
  Building, 
  Briefcase, 
  DollarSign, 
  ClipboardList,
  CheckCircle
} from 'lucide-react';

type JobPostingStep = 'company' | 'role' | 'compensation' | 'screening' | 'review';

interface PostJobStepProps {
  jobPostingStep: JobPostingStep;
  setJobPostingStep: (step: JobPostingStep) => void;
  jobPostingData: any;
  setJobPostingData: (data: any) => void;
}

export const PostJobStep: React.FC<PostJobStepProps> = ({
  jobPostingStep,
  setJobPostingStep,
  jobPostingData,
  setJobPostingData
}) => {
  
  const JobPostingStepper = () => {
    const postingSteps: { id: JobPostingStep; label: string; icon: React.ReactNode }[] = [
      { id: 'company', label: 'Company', icon: <Building size={16} /> },
      { id: 'role', label: 'Role Details', icon: <Briefcase size={16} /> },
      { id: 'compensation', label: 'Compensation', icon: <DollarSign size={16} /> },
      { id: 'screening', label: 'Screening', icon: <ClipboardList size={16} /> },
      { id: 'review', label: 'Review', icon: <CheckCircle size={16} /> }
    ];

    return (
      <div className="w-full py-4 mb-6">
        <div className="flex items-center justify-between">
          {postingSteps.map((step, index) => {
            const isActive = jobPostingStep === step.id;
            const isPassed = postingSteps.findIndex(s => s.id === jobPostingStep) > index;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setJobPostingStep(step.id)}
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full font-medium text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
                    ${isPassed
                      ? 'bg-lime-400 text-black cursor-pointer focus:ring-lime-500'
                      : isActive
                      ? 'bg-lime-400/20 text-lime-300 border-2 border-lime-400 cursor-pointer focus:ring-lime-500'
                      : 'bg-slate-700 text-slate-400 cursor-pointer'
                    }
                  `}
                >
                  {isPassed ? <CheckCircle size={16} /> : step.icon}
                </button>
                
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-lime-400' : 
                    isPassed ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                </div>

                {index < postingSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 ${
                    isPassed ? 'bg-lime-400' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCompanyStep = () => (
    <div className="card">
      <h2 className="section-title mb-6">
        <Building size={24} />
        Company Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={jobPostingData.companyName}
            onChange={(e) => setJobPostingData({...jobPostingData, companyName: e.target.value})}
            className="input-field"
            placeholder="e.g., DeFi Protocol Inc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Department *
          </label>
          <select
            value={jobPostingData.department}
            onChange={(e) => setJobPostingData({...jobPostingData, department: e.target.value})}
            className="input-field"
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="HR">Human Resources</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hiring Manager *
          </label>
          <input
            type="text"
            value={jobPostingData.hiringManager}
            onChange={(e) => setJobPostingData({...jobPostingData, hiringManager: e.target.value})}
            className="input-field"
            placeholder="Full Name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            value={jobPostingData.contactEmail}
            onChange={(e) => setJobPostingData({...jobPostingData, contactEmail: e.target.value})}
            className="input-field"
            placeholder="hiring@company.com"
          />
        </div>
      </div>
    </div>
  );

  const renderRoleStep = () => (
    <div className="card">
      <h2 className="section-title mb-6">
        <Briefcase size={24} />
        Role Details
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={jobPostingData.jobTitle}
              onChange={(e) => setJobPostingData({...jobPostingData, jobTitle: e.target.value})}
              className="input-field"
              placeholder="e.g., Senior Full-Stack Developer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Experience Level *
            </label>
            <select
              value={jobPostingData.experienceLevel}
              onChange={(e) => setJobPostingData({...jobPostingData, experienceLevel: e.target.value})}
              className="input-field"
            >
              <option value="">Select Level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (2-5 years)</option>
              <option value="senior">Senior Level (5-8 years)</option>
              <option value="lead">Lead/Principal (8+ years)</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Type *
            </label>
            <select
              value={jobPostingData.jobType}
              onChange={(e) => setJobPostingData({...jobPostingData, jobType: e.target.value})}
              className="input-field"
            >
              <option value="">Select Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Work Location *
            </label>
            <select
              value={jobPostingData.workLocation}
              onChange={(e) => setJobPostingData({...jobPostingData, workLocation: e.target.value})}
              className="input-field"
            >
              <option value="">Select Location</option>
              <option value="remote">Fully Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Job Description *
          </label>
          <textarea
            rows={4}
            value={jobPostingData.jobDescription}
            onChange={(e) => setJobPostingData({...jobPostingData, jobDescription: e.target.value})}
            className="input-field"
            placeholder="Describe the role, what the person will do, and what makes this opportunity exciting..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Requirements *
          </label>
          <textarea
            rows={3}
            value={jobPostingData.requirements}
            onChange={(e) => setJobPostingData({...jobPostingData, requirements: e.target.value})}
            className="input-field"
            placeholder="List required skills, experience, education, certifications..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Responsibilities
          </label>
          <textarea
            rows={3}
            value={jobPostingData.responsibilities}
            onChange={(e) => setJobPostingData({...jobPostingData, responsibilities: e.target.value})}
            className="input-field"
            placeholder="Key responsibilities and daily tasks..."
          />
        </div>
        
        {/* Category Structure Info */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
          <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
            <Briefcase size={20} />
            Job Category & Expertise Structure
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-slate-200 mb-2">Main Categories:</h5>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Full-Stack</strong> - Web development</li>
                <li>• <strong>Web3</strong> - Blockchain development</li>
                <li>• <strong>Creative</strong> - Design & storytelling</li>
                <li>• <strong>Marketing</strong> - Technical marketing</li>
                <li>• <strong>Executive</strong> - Leadership roles</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-slate-200 mb-2">Creative Subcategories:</h5>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Storyteller</strong> - Narrative & content</li>
                <li>• <strong>Visual Designer</strong> - UI/UX design</li>
                <li>• <strong>Animator</strong> - Motion graphics</li>
                <li>• <strong>Filmmaker</strong> - Video production</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-lime-400/10 border border-lime-400/30 rounded">
            <p className="text-lime-400 text-sm">
              <strong>Example:</strong> Category: Creative → Subcategory: Storyteller → Job Title: "Filmmaker / Storyteller"
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompensationStep = () => (
    <div className="card">
      <h2 className="section-title mb-6">
        <DollarSign size={24} />
        Compensation & Benefits
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Currency
            </label>
            <select
              value={jobPostingData.currency}
              onChange={(e) => setJobPostingData({...jobPostingData, currency: e.target.value})}
              className="input-field"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Minimum Salary *
            </label>
            <input
              type="number"
              value={jobPostingData.salaryMin}
              onChange={(e) => setJobPostingData({...jobPostingData, salaryMin: e.target.value})}
              className="input-field"
              placeholder="80000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Maximum Salary *
            </label>
            <input
              type="number"
              value={jobPostingData.salaryMax}
              onChange={(e) => setJobPostingData({...jobPostingData, salaryMax: e.target.value})}
              className="input-field"
              placeholder="120000"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            Benefits (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Health Insurance',
              'Dental Insurance',
              'Vision Insurance',
              '401k/Retirement',
              'Paid Time Off',
              'Remote Work',
              'Flexible Hours',
              'Professional Development',
              'Stock Options',
              'Bonus Eligible',
              'Gym Membership',
              'Commuter Benefits'
            ].map((benefit) => (
              <label key={benefit} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-lime-500 focus:ring-lime-500"
                />
                <span className="ml-2 text-sm text-slate-300">{benefit}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreeningStep = () => (
    <div className="card">
      <h2 className="section-title mb-6">
        <ClipboardList size={24} />
        Screening & Timeline
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Application Deadline *
          </label>
          <input
            type="date"
            value={jobPostingData.applicationDeadline}
            onChange={(e) => setJobPostingData({...jobPostingData, applicationDeadline: e.target.value})}
            className="input-field md:w-1/2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            Screening Steps (Select all that apply)
          </label>
          <div className="space-y-3">
            {[
              { id: 'resume-review', label: 'Resume Review', description: 'Initial resume and profile screening' },
              { id: 'phone-screen', label: 'Phone/Video Screening', description: '15-30 minute initial call' },
              { id: 'technical-test', label: 'Technical Assessment', description: 'Coding challenge or technical test' },
              { id: 'portfolio-review', label: 'Portfolio Review', description: 'Review of past work and projects' },
              { id: 'technical-interview', label: 'Technical Interview', description: '45-60 minute technical discussion' },
              { id: 'cultural-interview', label: 'Cultural Fit Interview', description: 'Team and culture assessment' },
              { id: 'final-interview', label: 'Final Interview', description: 'Interview with senior leadership' },
              { id: 'reference-check', label: 'Reference Check', description: 'Contact previous employers' }
            ].map((step) => (
              <div key={step.id} className="flex items-start space-x-3 p-3 bg-slate-950/40 rounded-lg">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-lime-500 focus:ring-lime-500 mt-1"
                />
                <div>
                  <label className="text-sm font-medium text-slate-300">{step.label}</label>
                  <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Interview Process Description
          </label>
          <textarea
            rows={3}
            value={jobPostingData.interviewProcess}
            onChange={(e) => setJobPostingData({...jobPostingData, interviewProcess: e.target.value})}
            className="input-field"
            placeholder="Describe your interview process, timeline, and what candidates can expect..."
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobPostingData.urgentHiring}
              onChange={(e) => setJobPostingData({...jobPostingData, urgentHiring: e.target.checked})}
              className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-lime-500 focus:ring-lime-500"
            />
            <span className="ml-2 text-sm text-slate-300">Urgent Hiring</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobPostingData.remoteOk}
              onChange={(e) => setJobPostingData({...jobPostingData, remoteOk: e.target.checked})}
              className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-lime-500 focus:ring-lime-500"
            />
            <span className="ml-2 text-sm text-slate-300">Remote Candidates Welcome</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="card">
      <h2 className="section-title mb-6">
        <CheckCircle size={24} />
        Review Job Posting
      </h2>
      <div className="space-y-6">
        <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">{jobPostingData.jobTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Company:</span>
              <span className="text-slate-200 ml-2">{jobPostingData.companyName}</span>
            </div>
            <div>
              <span className="text-slate-400">Department:</span>
              <span className="text-slate-200 ml-2">{jobPostingData.department}</span>
            </div>
            <div>
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-200 ml-2">{jobPostingData.workLocation}</span>
            </div>
            <div>
              <span className="text-slate-400">Type:</span>
              <span className="text-slate-200 ml-2">{jobPostingData.jobType}</span>
            </div>
            <div>
              <span className="text-slate-400">Salary:</span>
              <span className="text-slate-200 ml-2">
                {jobPostingData.currency} {jobPostingData.salaryMin} - {jobPostingData.salaryMax}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Deadline:</span>
              <span className="text-slate-200 ml-2">{jobPostingData.applicationDeadline}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-secondary">
            Save as Draft
          </button>
          <button className="btn-primary">
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );

  const renderJobPostingStep = () => {
    switch (jobPostingStep) {
      case 'company':
        return renderCompanyStep();
      case 'role':
        return renderRoleStep();
      case 'compensation':
        return renderCompensationStep();
      case 'screening':
        return renderScreeningStep();
      case 'review':
        return renderReviewStep();
      default:
        return renderCompanyStep();
    }
  };

  return (
    <div className="space-y-8">
      <JobPostingStepper />
      {renderJobPostingStep()}
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            const steps: JobPostingStep[] = ['company', 'role', 'compensation', 'screening', 'review'];
            const currentIndex = steps.indexOf(jobPostingStep);
            if (currentIndex > 0) {
              setJobPostingStep(steps[currentIndex - 1]);
            }
          }}
          disabled={jobPostingStep === 'company'}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={() => {
            const steps: JobPostingStep[] = ['company', 'role', 'compensation', 'screening', 'review'];
            const currentIndex = steps.indexOf(jobPostingStep);
            if (currentIndex < steps.length - 1) {
              setJobPostingStep(steps[currentIndex + 1]);
            }
          }}
          disabled={jobPostingStep === 'review'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};