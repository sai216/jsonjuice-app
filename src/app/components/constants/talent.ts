// constants/talent.ts - All constants and configuration for the talent system

import { 
  Briefcase, 
  Building, 
  DollarSign, 
  Users, 
  ClipboardList,
  Plus,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { SkillCategoryConfig, JobPosting, Application } from '../types/talent';

// Navigation Steps
export const EMPLOYER_STEPS = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
  { id: 'post-job' as const, label: 'Post Job', icon: Plus },
  { id: 'manage-jobs' as const, label: 'Manage Jobs', icon: Briefcase },
  { id: 'applications' as const, label: 'Applications', icon: Users },
  { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 }
];

export const JOB_POSTING_STEPS = [
  { id: 'company' as const, label: 'Company', icon: Building },
  { id: 'role' as const, label: 'Role Details', icon: Briefcase },
  { id: 'compensation' as const, label: 'Compensation', icon: DollarSign },
  { id: 'screening' as const, label: 'Screening', icon: ClipboardList },
  { id: 'review' as const, label: 'Review', icon: CheckCircle }
];

// Skill Categories and Subcategories
export const SKILL_CATEGORIES: Record<string, SkillCategoryConfig> = {
  'full-stack': {
    label: 'Full-Stack',
    subcategories: ['Frontend Specialist', 'Backend Specialist', 'Full-Stack Generalist']
  },
  'web3': {
    label: 'Web3',
    subcategories: ['Smart Contract Developer', 'DApp Developer', 'DeFi Engineer']
  },
  'creative': {
    label: 'Creative',
    subcategories: ['Storyteller', 'Visual Designer', 'Animator', 'Content Creator', 'Filmmaker']
  },
  'marketing': {
    label: 'Technical Marketing',
    subcategories: ['Digital Marketing', 'Content Marketing', 'Growth Marketing', 'Technical Writing']
  },
  'executive': {
    label: 'Executive Management',
    subcategories: ['CEO', 'COO', 'CFO', 'CTO', 'CMO', 'CPO', 'CHRO']
  }
};

// Form Options
export const CURRENCIES = [
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  { value: 'CAD', label: 'CAD (C$)', symbol: 'C$' }
];

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior Level (5-8 years)' },
  { value: 'lead', label: 'Lead/Principal (8+ years)' },
  { value: 'executive', label: 'Executive' }
];

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' }
];

export const WORK_LOCATIONS = [
  { value: 'remote', label: 'Fully Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' }
];

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'Human Resources'
];

export const BENEFITS = [
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
];

export const SCREENING_STEPS = [
  { 
    id: 'resume-review', 
    label: 'Resume Review', 
    description: 'Initial resume and profile screening' 
  },
  { 
    id: 'phone-screen', 
    label: 'Phone/Video Screening', 
    description: '15-30 minute initial call' 
  },
  { 
    id: 'technical-test', 
    label: 'Technical Assessment', 
    description: 'Coding challenge or technical test' 
  },
  { 
    id: 'portfolio-review', 
    label: 'Portfolio Review', 
    description: 'Review of past work and projects' 
  },
  { 
    id: 'technical-interview', 
    label: 'Technical Interview', 
    description: '45-60 minute technical discussion' 
  },
  { 
    id: 'cultural-interview', 
    label: 'Cultural Fit Interview', 
    description: 'Team and culture assessment' 
  },
  { 
    id: 'final-interview', 
    label: 'Final Interview', 
    description: 'Interview with senior leadership' 
  },
  { 
    id: 'reference-check', 
    label: 'Reference Check', 
    description: 'Contact previous employers' 
  }
];

export const PERIOD_FILTERS = [
  { value: 'all', label: 'All System History' },
  { value: 'ytd', label: 'Year to Date (YTD)' },
  { value: 'mtd', label: 'Month to Date (MTD)' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-90', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Date Range' }
];

// Status Colors and Styles
export const STATUS_STYLES = {
  job: {
    active: 'bg-green-400/20 text-green-300',
    draft: 'bg-yellow-400/20 text-yellow-300',
    closed: 'bg-gray-400/20 text-gray-300'
  },
  application: {
    new: 'bg-blue-400/20 text-blue-300',
    reviewed: 'bg-yellow-400/20 text-yellow-300',
    interview: 'bg-purple-400/20 text-purple-300',
    hired: 'bg-green-400/20 text-green-300',
    rejected: 'bg-red-400/20 text-red-300'
  },
  quality: {
    High: 'bg-green-400/20 text-green-300',
    Medium: 'bg-yellow-400/20 text-yellow-300',
    Low: 'bg-red-400/20 text-red-300'
  }
};

// Mock Data for Development
export const MOCK_JOB_POSTS: JobPosting[] = [
  { 
    id: 1, 
    title: 'Senior React Developer', 
    department: 'Engineering', 
    location: 'Remote', 
    type: 'Full-time', 
    salary: '$120k - $180k', 
    status: 'active', 
    applications: 45, 
    posted: '2024-01-15', 
    deadline: '2024-02-15',
    category: 'Full-Stack',
    subcategory: 'Frontend Specialist'
  },
  { 
    id: 2, 
    title: 'Web3 Engineer', 
    department: 'Engineering', 
    location: 'San Francisco', 
    type: 'Full-time', 
    salary: '$100k - $150k', 
    status: 'active', 
    applications: 32, 
    posted: '2024-01-10', 
    deadline: '2024-02-10',
    category: 'Web3',
    subcategory: 'DApp Developer'
  },
  { 
    id: 3, 
    title: 'Filmmaker / Storyteller', 
    department: 'Creative', 
    location: 'Los Angeles', 
    type: 'Full-time', 
    salary: '$75k - $110k', 
    status: 'active', 
    applications: 28, 
    posted: '2024-01-18', 
    deadline: '2024-02-18',
    category: 'Creative',
    subcategory: 'Storyteller'
  },
  { 
    id: 4, 
    title: 'Product Designer', 
    department: 'Design', 
    location: 'Hybrid', 
    type: 'Full-time', 
    salary: '$90k - $130k', 
    status: 'closed', 
    applications: 22, 
    posted: '2023-12-01', 
    deadline: '2024-01-01',
    category: 'Creative',
    subcategory: 'Visual Designer'
  },
  { 
    id: 5, 
    title: 'Smart Contract Developer', 
    department: 'Engineering', 
    location: 'Remote', 
    type: 'Contract', 
    salary: '$80k - $120k', 
    status: 'draft', 
    applications: 0, 
    posted: '2024-01-22', 
    deadline: '2024-02-22',
    category: 'Web3',
    subcategory: 'Smart Contract Developer'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@email.com',
    role: 'Senior React Developer', 
    jobId: 1,
    applied: '2024-01-20',
    status: 'new',
    experience: '5 years',
    location: 'San Francisco, CA',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    avatar: 'JS'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah.johnson@email.com',
    role: 'Web3 Engineer', 
    jobId: 2,
    applied: '2024-01-19',
    status: 'reviewed',
    experience: '3 years',
    location: 'Remote',
    skills: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
    avatar: 'SJ'
  },
  { 
    id: 3, 
    name: 'Mike Chen', 
    email: 'mike.chen@email.com',
    role: 'Smart Contract Developer', 
    jobId: 5,
    applied: '2024-01-18',
    status: 'interview',
    experience: '7 years',
    location: 'New York, NY',
    skills: ['Solidity', 'Hardhat', 'OpenZeppelin', 'DeFi'],
    avatar: 'MC'
  }
];

// API Endpoints
export const API_ENDPOINTS = {
  jobs: '/api/jobs',
  applications: '/api/applications',
  analytics: '/api/analytics',
  upload: '/api/upload'
};

// Default Values
export const DEFAULT_JOB_POSTING_DATA = {
  companyName: '',
  department: '',
  hiringManager: '',
  contactEmail: '',
  jobTitle: '',
  jobDescription: '',
  requirements: '',
  responsibilities: '',
  experienceLevel: '',
  jobType: '',
  workLocation: '',
  salaryMin: '',
  salaryMax: '',
  currency: 'USD' as const,
  benefits: [],
  applicationDeadline: '',
  screeningSteps: [],
  interviewProcess: '',
  urgentHiring: false,
  remoteOk: false
};

// Validation Rules
export const VALIDATION_RULES = {
  required: ['companyName', 'department', 'hiringManager', 'contactEmail', 'jobTitle', 'jobDescription', 'requirements', 'experienceLevel', 'jobType', 'workLocation', 'salaryMin', 'salaryMax', 'applicationDeadline'],
  email: ['contactEmail'],
  number: ['salaryMin', 'salaryMax'],
  minLength: {
    jobDescription: 50,
    requirements: 20
  }
};

// Theme Configuration
export const THEME_COLORS = {
  primary: 'lime-400',
  secondary: 'slate-400',
  success: 'green-400',
  warning: 'yellow-400',
  error: 'red-400',
  info: 'blue-400'
};