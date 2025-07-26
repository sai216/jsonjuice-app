// types/talent.ts - Shared types for the Talent/Employer system

export type EmployerStep = 'dashboard' | 'post-job' | 'manage-jobs' | 'applications' | 'analytics';
export type JobPostingStep = 'company' | 'role' | 'compensation' | 'screening' | 'review';
export type JobStatus = 'active' | 'draft' | 'closed';
export type ApplicationStatus = 'new' | 'reviewed' | 'interview' | 'hired' | 'rejected';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
export type WorkLocation = 'remote' | 'onsite' | 'hybrid';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD';

// Skill Categories
export type SkillCategory = 'full-stack' | 'web3' | 'creative' | 'marketing' | 'executive';

export interface SkillCategoryConfig {
  label: string;
  subcategories: string[];
}

// Job Posting Data Structure
export interface JobPostingData {
  // Company Details
  companyName: string;
  department: string;
  hiringManager: string;
  contactEmail: string;
  
  // Role Details
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  responsibilities: string;
  experienceLevel: ExperienceLevel | '';
  jobType: JobType | '';
  workLocation: WorkLocation | '';
  
  // Compensation
  salaryMin: string;
  salaryMax: string;
  currency: Currency;
  benefits: string[];
  
  // Screening
  applicationDeadline: string;
  screeningSteps: string[];
  interviewProcess: string;
  
  // Additional
  urgentHiring: boolean;
  remoteOk: boolean;
}

// Job Posting Entity
export interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: JobStatus;
  applications: number;
  posted: string;
  deadline: string;
  category?: string;
  subcategory?: string;
  companyName?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string[];
  urgentHiring?: boolean;
  remoteOk?: boolean;
}

// Application Entity
export interface Application {
  id: number;
  name: string;
  email: string;
  role: string;
  jobId: number;
  applied: string;
  status: ApplicationStatus;
  experience: string;
  location: string;
  skills: string[];
  avatar?: string;
  resume?: string;
  coverLetter?: string;
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  rating?: number;
  notes?: string;
}

// Filter State
export interface FilterState {
  skillCategoryFilter: string;
  subcategoryFilter: string;
  periodFilter: string;
  dateRange: {
    start: string;
    end: string;
  };
}

// Analytics Data
export interface AnalyticsMetric {
  label: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
}

export interface JobPerformance {
  job: string;
  views: number;
  applications: number;
  ratio: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface SourcePerformance {
  source: string;
  applications: number;
  quality: 'High' | 'Medium' | 'Low';
  cost?: string;
  roi?: string;
}

export interface HiringFunnelStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

// Component Props
export interface EmployerStepperProps {
  currentStep: EmployerStep;
  setCurrentStep: (step: EmployerStep) => void;
}

export interface PostJobStepProps {
  jobPostingStep: JobPostingStep;
  setJobPostingStep: (step: JobPostingStep) => void;
  jobPostingData: JobPostingData;
  setJobPostingData: (data: JobPostingData) => void;
}

export interface ManageJobsStepProps {
  setCurrentStep: (step: EmployerStep) => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Validation
export interface ValidationErrors {
  [key: string]: string;
}

export interface FormState {
  data: JobPostingData;
  errors: ValidationErrors;
  isValid: boolean;
  isDirty: boolean;
}

// Theme and UI
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Notification System
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}