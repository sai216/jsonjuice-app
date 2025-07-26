// /src/app/components/views/TalentView.tsx - Fixed type compatibility issues
'use client'
import React, { useState } from 'react';
import { EmployerStepper } from '../ui/EmpStepper';
import { DashboardStep } from '../esteps/DashBoardStep';
import { PostJobStep } from '../esteps/PostJobStep';
import { ManageJobsStep } from '../esteps/ManageJobStep';
import { AnalyticsStep } from '../esteps/AnalyticsStep';
import { EnhancedApplicationsStep } from '../../EnhancedApplicationStep';
import { JobApplicationForm } from '../esteps/JobApplicationForm';
import { JobSeekerDashboard } from '../esteps/JobSeekerDashboard';
import { JobBrowsingStep } from '../esteps/JobBrowsingStep';
import { LogOut, User, Search, FileText, Briefcase } from 'lucide-react';

type UserRole = 'employer' | 'jobseeker';
type EmployerStep = 'dashboard' | 'post-job' | 'manage-jobs' | 'applications' | 'analytics';
type JobSeekerStep = 'browse-jobs' | 'my-applications' | 'apply';
type JobPostingStep = 'company' | 'role' | 'compensation' | 'screening' | 'review';

// JobDetails interface to match JobApplicationForm expectations (id as number)
interface JobDetails {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

// Type for the Job from JobBrowsingStep (id as string)
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  description: string;
  requirements: string[];
  benefits: string[];
  createdAt: string;
  applicationsCount: number;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  companySize: 'startup' | 'small' | 'medium' | 'large';
}

export const TalentView: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('jobseeker'); // Default to job seeker to showcase the new features
  const [currentEmployerStep, setCurrentEmployerStep] = useState<EmployerStep>('dashboard');
  const [currentJobSeekerStep, setCurrentJobSeekerStep] = useState<JobSeekerStep>('browse-jobs');
  const [jobPostingStep, setJobPostingStep] = useState<JobPostingStep>('company');
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);

  // Mock user data
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: userRole,
    company: userRole === 'employer' ? 'TechCorp Inc.' : undefined
  };

  const [jobPostingData, setJobPostingData] = useState({
    companyName: mockUser?.company || '',
    department: '',
    hiringManager: `${mockUser?.firstName} ${mockUser?.lastName}`,
    contactEmail: mockUser?.email || '',
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    responsibilities: '',
    experienceLevel: '',
    jobType: '',
    workLocation: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    benefits: [] as string[],
    applicationDeadline: '',
    screeningSteps: [] as string[],
    interviewProcess: '',
    urgentHiring: false,
    remoteOk: false
  });

  // Convert Job to JobDetails for compatibility with JobApplicationForm
  const convertJobToJobDetails = (job: Job): JobDetails => {
    return {
      id: parseInt(job.id) || 0, // Convert string to number, fallback to 0
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits
    };
  };

  const handleApplyToJob = (job: Job) => {
    const jobDetails = convertJobToJobDetails(job);
    setSelectedJob(jobDetails);
    setCurrentJobSeekerStep('apply');
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setCurrentEmployerStep('dashboard');
    setCurrentJobSeekerStep('browse-jobs');
    setSelectedJob(null);
  };

  const renderEmployerStep = () => {
    switch (currentEmployerStep) {
      case 'dashboard':
        return <DashboardStep />;
      case 'post-job':
        return (
          <PostJobStep 
            jobPostingStep={jobPostingStep}
            setJobPostingStep={setJobPostingStep}
            jobPostingData={jobPostingData}
            setJobPostingData={setJobPostingData}
          />
        );
      case 'manage-jobs':
        return <ManageJobsStep setCurrentStep={setCurrentEmployerStep} />;
      case 'applications':
        return <EnhancedApplicationsStep />;
      case 'analytics':
        return <AnalyticsStep />;
      default:
        return <DashboardStep />;
    }
  };

  const renderJobSeekerStep = () => {
    switch (currentJobSeekerStep) {
      case 'browse-jobs':
        return <JobBrowsingStep onApplyToJob={handleApplyToJob} />;
      case 'my-applications':
        return <JobSeekerDashboard />;
      case 'apply':
        return selectedJob ? (
          <JobApplicationForm
            job={selectedJob}
            onSubmit={(data) => {
              console.log('Application submitted:', data);
              alert('Application submitted successfully! 🎉');
              setCurrentJobSeekerStep('my-applications');
              setSelectedJob(null);
            }}
            onCancel={() => {
              setCurrentJobSeekerStep('browse-jobs');
              setSelectedJob(null);
            }}
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-slate-400">No job selected</p>
            <button 
              onClick={() => setCurrentJobSeekerStep('browse-jobs')}
              className="mt-4 px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400"
            >
              Browse Jobs
            </button>
          </div>
        );
      default:
        return <JobBrowsingStep onApplyToJob={handleApplyToJob} />;
    }
  };

  // Job Seeker Navigation Component
  const JobSeekerNav = () => (
    <div className="flex justify-center mb-8">
      <div className="bg-slate-800 rounded-lg p-1 flex">
        <button
          onClick={() => setCurrentJobSeekerStep('browse-jobs')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            currentJobSeekerStep === 'browse-jobs'
              ? 'bg-lime-400 text-black'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Search size={16} />
          Browse Jobs
        </button>
        <button
          onClick={() => setCurrentJobSeekerStep('my-applications')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            currentJobSeekerStep === 'my-applications'
              ? 'bg-lime-400 text-black'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <FileText size={16} />
          My Applications
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Role Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800 rounded-lg p-1 flex">
            <button
              onClick={() => handleRoleChange('employer')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                userRole === 'employer'
                  ? 'bg-lime-400 text-black'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Employer
            </button>
            <button
              onClick={() => handleRoleChange('jobseeker')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                userRole === 'jobseeker'
                  ? 'bg-lime-400 text-black'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Job Seeker
            </button>
          </div>
        </div>

        {/* User Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-200">
                {mockUser?.firstName} {mockUser?.lastName}
              </h2>
              <p className="text-sm text-slate-400 capitalize">
                {userRole} {mockUser?.company && `• ${mockUser.company}`}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => alert('Logout functionality would be implemented here')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded hover:bg-slate-700"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-4">
            {userRole === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard'}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {userRole === 'employer' 
              ? 'Manage your job postings, track applications, and find the best talent for your team'
              : 'Find and apply to jobs, track your applications, and manage your career'
            }
          </p>
        </div>

        {/* Navigation & Content */}
        {userRole === 'employer' ? (
          <>
            <EmployerStepper 
              currentStep={currentEmployerStep} 
              setCurrentStep={setCurrentEmployerStep} 
            />
            {renderEmployerStep()}
          </>
        ) : (
          <>
            {/* Job Seeker Navigation */}
            {currentJobSeekerStep !== 'apply' && <JobSeekerNav />}
            {renderJobSeekerStep()}
          </>
        )}
      </div>
    </div>
  );
};