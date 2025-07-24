'use client'
import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  ClipboardList,
  Plus,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Award,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

type EmployerStep = 'dashboard' | 'post-job' | 'manage-jobs' | 'applications' | 'analytics';
type JobPostingStep = 'company' | 'role' | 'compensation' | 'screening' | 'review';

const employerSteps: { id: EmployerStep; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
  { id: 'post-job', label: 'Post Job', icon: <Plus size={16} /> },
  { id: 'manage-jobs', label: 'Manage Jobs', icon: <Briefcase size={16} /> },
  { id: 'applications', label: 'Applications', icon: <Users size={16} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> }
];

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: 'active' | 'draft' | 'closed';
  applications: number;
  posted: string;
  deadline: string;
}

export const TalentView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<EmployerStep>('dashboard');
  const [jobPostingStep, setJobPostingStep] = useState<JobPostingStep>('company');
  const [jobPostingData, setJobPostingData] = useState({
    // Company Details
    companyName: '',
    department: '',
    hiringManager: '',
    contactEmail: '',
    
    // Role Details
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    responsibilities: '',
    experienceLevel: '',
    jobType: '',
    workLocation: '',
    
    // Compensation
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    benefits: [],
    
    // Screening
    applicationDeadline: '',
    screeningSteps: [],
    interviewProcess: '',
    
    // Additional
    urgentHiring: false,
    remoteOk: false
  });

  const EmployerStepper = () => (
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

  const DashboardStep = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="p-4 bg-lime-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Briefcase className="text-lime-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">12</h3>
          <p className="text-slate-400 text-sm">Active Job Posts</p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-blue-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="text-blue-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">248</h3>
          <p className="text-slate-400 text-sm">Total Applications</p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-purple-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="text-purple-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">18</h3>
          <p className="text-slate-400 text-sm">Successful Hires</p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-orange-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="text-orange-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">14</h3>
          <p className="text-slate-400 text-sm">Avg. Days to Hire</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="section-title mb-6">
            Recent Applications
          </h2>
          <div className="space-y-4">
            {[
              { name: 'John Smith', role: 'Senior React Developer', time: '2 hours ago', status: 'new' },
              { name: 'Sarah Johnson', role: 'Web3 Engineer', time: '4 hours ago', status: 'reviewed' },
              { name: 'Mike Chen', role: 'Smart Contract Dev', time: '1 day ago', status: 'interview' },
              { name: 'Lisa Wang', role: 'Frontend Engineer', time: '2 days ago', status: 'hired' }
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-950/40 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-200">{app.name}</h4>
                  <p className="text-sm text-slate-400">{app.role}</p>
                  <p className="text-xs text-slate-500">{app.time}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  app.status === 'new' ? 'bg-blue-400/20 text-blue-300' :
                  app.status === 'reviewed' ? 'bg-yellow-400/20 text-yellow-300' :
                  app.status === 'interview' ? 'bg-purple-400/20 text-purple-300' :
                  'bg-green-400/20 text-green-300'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title mb-6">
            Job Performance
          </h2>
          <div className="space-y-4">
            {[
              { role: 'Senior React Developer', applications: 45, views: 234 },
              { role: 'Web3 Engineer', applications: 32, views: 189 },
              { role: 'Smart Contract Developer', applications: 28, views: 156 },
              { role: 'Frontend Engineer', applications: 38, views: 201 }
            ].map((job, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <h4 className="font-medium text-slate-200 mb-2">{job.role}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{job.applications} applications</span>
                  <span className="text-slate-400">{job.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PostJobStep = () => {
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

  const ManageJobsStep = () => {
    const jobPosts: JobPosting[] = [
      { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$120k - $180k', status: 'active', applications: 45, posted: '2024-01-15', deadline: '2024-02-15' },
      { id: 2, title: 'Web3 Engineer', department: 'Engineering', location: 'San Francisco', type: 'Full-time', salary: '$100k - $150k', status: 'active', applications: 32, posted: '2024-01-10', deadline: '2024-02-10' },
      { id: 3, title: 'Smart Contract Developer', department: 'Engineering', location: 'Remote', type: 'Contract', salary: '$80 - $120/hr', status: 'draft', applications: 0, posted: '2024-01-20', deadline: '2024-02-20' },
      { id: 4, title: 'Product Designer', department: 'Design', location: 'Hybrid', type: 'Full-time', salary: '$90k - $130k', status: 'closed', applications: 28, posted: '2023-12-01', deadline: '2024-01-01' }
    ];

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-lime-400">Manage Job Posts</h2>
          <button 
            onClick={() => setCurrentStep('post-job')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="input-field pl-10 w-64"
                />
              </div>
              <select className="input-field w-auto">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Job Title</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Department</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Salary</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Applications</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobPosts.map((job) => (
                  <tr key={job.id} className="border-b border-slate-800 hover:bg-slate-950/40">
                    <td className="py-4 px-4">
                      <div>
                        <h4 className="font-medium text-slate-200">{job.title}</h4>
                        <p className="text-xs text-slate-400">Posted {job.posted}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{job.department}</td>
                    <td className="py-4 px-4 text-slate-300">{job.location}</td>
                    <td className="py-4 px-4 text-slate-300">{job.salary}</td>
                    <td className="py-4 px-4">
                      <span className="text-lime-400 font-medium">{job.applications}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        job.status === 'active' ? 'bg-green-400/20 text-green-300' :
                        job.status === 'draft' ? 'bg-yellow-400/20 text-yellow-300' :
                        'bg-gray-400/20 text-gray-300'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-300 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-300 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-300 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ApplicationsStep = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400">Applications</h2>
        <div className="flex items-center gap-4">
          <select className="input-field w-auto">
            <option>All Jobs</option>
            <option>Senior React Developer</option>
            <option>Web3 Engineer</option>
            <option>Smart Contract Developer</option>
          </select>
          <select className="input-field w-auto">
            <option>All Status</option>
            <option>New</option>
            <option>Reviewed</option>
            <option>Interview</option>
            <option>Hired</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application List */}
        <div className="lg:col-span-2 card">
          <h3 className="section-title mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[
              { 
                id: 1, 
                name: 'John Smith', 
                email: 'john.smith@email.com',
                role: 'Senior React Developer', 
                applied: '2024-01-20',
                status: 'new',
                experience: '5 years',
                location: 'San Francisco, CA',
                skills: ['React', 'Node.js', 'TypeScript']
              },
              { 
                id: 2, 
                name: 'Sarah Johnson', 
                email: 'sarah.johnson@email.com',
                role: 'Web3 Engineer', 
                applied: '2024-01-19',
                status: 'reviewed',
                experience: '3 years',
                location: 'Remote',
                skills: ['Solidity', 'Web3.js', 'React']
              },
              { 
                id: 3, 
                name: 'Mike Chen', 
                email: 'mike.chen@email.com',
                role: 'Smart Contract Developer', 
                applied: '2024-01-18',
                status: 'interview',
                experience: '7 years',
                location: 'New York, NY',
                skills: ['Solidity', 'Hardhat', 'OpenZeppelin']
              }
            ].map((application) => (
              <div key={application.id} className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg hover:border-lime-400/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">{application.name}</h4>
                    <p className="text-sm text-slate-400">{application.email}</p>
                    <p className="text-sm text-lime-400">{application.role}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    application.status === 'new' ? 'bg-blue-400/20 text-blue-300' :
                    application.status === 'reviewed' ? 'bg-yellow-400/20 text-yellow-300' :
                    application.status === 'interview' ? 'bg-purple-400/20 text-purple-300' :
                    'bg-green-400/20 text-green-300'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-slate-300 ml-2">{application.experience}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 ml-2">{application.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Applied:</span>
                    <span className="text-slate-300 ml-2">{application.applied}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {application.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className="btn-primary px-4 py-2 text-sm">
                    View Profile
                  </button>
                  <button className="btn-secondary px-4 py-2 text-sm">
                    Schedule Interview
                  </button>
                  <button className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Stats */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">Application Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Applications</span>
                <span className="text-lime-400 font-bold">248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">New Applications</span>
                <span className="text-blue-400 font-bold">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">In Review</span>
                <span className="text-yellow-400 font-bold">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Interviews</span>
                <span className="text-purple-400 font-bold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hired</span>
                <span className="text-green-400 font-bold">12</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left">
                Schedule Interviews
              </button>
              <button className="w-full btn-secondary text-left">
                Send Bulk Email
              </button>
              <button className="w-full btn-secondary text-left">
                Export Applications
              </button>
              <button className="w-full btn-secondary text-left">
                Application Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsStep = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-lime-400 mb-6">Hiring Analytics</h2>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-lime-400 mb-2">14</h3>
          <p className="text-slate-400 text-sm">Avg. Days to Hire</p>
          <p className="text-green-400 text-xs mt-1">-2 days from last month</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-blue-400 mb-2">73%</h3>
          <p className="text-slate-400 text-sm">Application Response Rate</p>
          <p className="text-green-400 text-xs mt-1">+5% from last month</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-purple-400 mb-2">$4.2k</h3>
          <p className="text-slate-400 text-sm">Cost Per Hire</p>
          <p className="text-red-400 text-xs mt-1">+$200 from last month</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-orange-400 mb-2">89%</h3>
          <p className="text-slate-400 text-sm">Offer Acceptance Rate</p>
          <p className="text-green-400 text-xs mt-1">+12% from last month</p>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="section-title mb-6">Job Performance</h3>
          <div className="space-y-4">
            {[
              { job: 'Senior React Developer', views: 1234, applications: 45, ratio: '3.6%' },
              { job: 'Web3 Engineer', views: 892, applications: 32, ratio: '3.6%' },
              { job: 'Smart Contract Developer', views: 756, applications: 28, ratio: '3.7%' },
              { job: 'Product Designer', views: 634, applications: 24, ratio: '3.8%' }
            ].map((job, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-200">{job.job}</h4>
                  <span className="text-lime-400 font-bold">{job.ratio}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{job.views} views</span>
                  <span>{job.applications} applications</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-6">Source Performance</h3>
          <div className="space-y-4">
            {[
              { source: 'JsonJuice Portal', applications: 156, quality: 'High' },
              { source: 'LinkedIn', applications: 89, quality: 'Medium' },
              { source: 'Direct Referrals', applications: 67, quality: 'High' },
              { source: 'Company Website', applications: 45, quality: 'Medium' },
              { source: 'Job Boards', applications: 23, quality: 'Low' }
            ].map((source, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-200">{source.source}</h4>
                    <p className="text-sm text-slate-400">{source.applications} applications</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    source.quality === 'High' ? 'bg-green-400/20 text-green-300' :
                    source.quality === 'Medium' ? 'bg-yellow-400/20 text-yellow-300' :
                    'bg-red-400/20 text-red-300'
                  }`}>
                    {source.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'dashboard':
        return <DashboardStep />;
      case 'post-job':
        return <PostJobStep />;
      case 'manage-jobs':
        return <ManageJobsStep />;
      case 'applications':
        return <ApplicationsStep />;
      case 'analytics':
        return <AnalyticsStep />;
      default:
        return <DashboardStep />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-4">
            Employer Dashboard
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Manage your job postings, track applications, and find the best talent for your team
          </p>
        </div>

        {/* Stepper Navigation */}
        <EmployerStepper />

        {/* Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};