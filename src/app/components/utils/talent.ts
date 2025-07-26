// utils/talent.ts - Utility functions for talent/employer functionality

import { JobPosting, Application, FilterState, JobPostingData } from '../types/talent';
import { SKILL_CATEGORIES, STATUS_STYLES } from '../constants/talent';

// Date utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return '1 week ago';
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  
  return formatDate(dateString);
};

export const isDateInPast = (dateString: string): boolean => {
  return new Date(dateString) < new Date();
};

export const getDaysUntilDeadline = (deadlineString: string): number => {
  const deadline = new Date(deadlineString);
  const now = new Date();
  const diffInMs = deadline.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

// Number formatting utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Status utilities
export const getStatusStyle = (status: string, type: 'job' | 'application' | 'quality'): string => {
  return STATUS_STYLES[type][status as keyof typeof STATUS_STYLES[typeof type]] || 'bg-gray-400/20 text-gray-300';
};

export const getStatusLabel = (status: string): string => {
  return status.split('-').map(capitalize).join(' ');
};

// Data filtering utilities
export const filterJobsByCategory = (jobs: JobPosting[], filters: FilterState): JobPosting[] => {
  return jobs.filter(job => {
    if (filters.skillCategoryFilter !== 'all') {
      const categoryMatch = job.category?.toLowerCase().replace(' ', '-').replace('full-stack', 'full-stack') === filters.skillCategoryFilter;
      if (!categoryMatch) return false;
      
      if (filters.subcategoryFilter !== 'all') {
        return job.subcategory === filters.subcategoryFilter;
      }
    }
    return true;
  });
};

export const filterApplicationsByStatus = (applications: Application[], status: string): Application[] => {
  if (status === 'all') return applications;
  return applications.filter(app => app.status === status);
};

export const searchApplications = (applications: Application[], searchTerm: string): Application[] => {
  if (!searchTerm) return applications;
  
  const term = searchTerm.toLowerCase();
  return applications.filter(app => 
    app.name.toLowerCase().includes(term) ||
    app.email.toLowerCase().includes(term) ||
    app.role.toLowerCase().includes(term) ||
    app.skills.some(skill => skill.toLowerCase().includes(term))
  );
};

// Statistics utilities
export const calculateConversionRate = (numerator: number, denominator: number): string => {
  if (denominator === 0) return '0.0%';
  return formatPercentage((numerator / denominator) * 100);
};

export const getApplicationStats = (applications: Application[]) => {
  const stats = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: applications.length,
    new: stats.new || 0,
    reviewed: stats.reviewed || 0,
    interview: stats.interview || 0,
    hired: stats.hired || 0,
    rejected: stats.rejected || 0,
    conversionRate: calculateConversionRate(stats.hired || 0, applications.length)
  };
};

export const getJobStats = (jobs: JobPosting[]) => {
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  
  return {
    totalJobs: jobs.length,
    activeJobs,
    draftJobs: jobs.filter(job => job.status === 'draft').length,
    closedJobs: jobs.filter(job => job.status === 'closed').length,
    totalApplications,
    averageApplicationsPerJob: jobs.length > 0 ? Math.round(totalApplications / jobs.length) : 0
  };
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateJobPostingData = (data: JobPostingData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Required fields
  if (!data.companyName) errors.push('Company name is required');
  if (!data.jobTitle) errors.push('Job title is required');
  if (!data.contactEmail) errors.push('Contact email is required');
  
  // Email validation
  if (data.contactEmail && !validateEmail(data.contactEmail)) {
    errors.push('Invalid email format');
  }
  
  // Salary validation
  if (data.salaryMin && data.salaryMax) {
    const min = parseInt(data.salaryMin);
    const max = parseInt(data.salaryMax);
    if (min >= max) errors.push('Maximum salary must be greater than minimum salary');
  }
  
  // Date validation
  if (data.applicationDeadline && isDateInPast(data.applicationDeadline)) {
    errors.push('Application deadline must be in the future');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sorting utilities
export const sortJobsByDate = (jobs: JobPosting[], direction: 'asc' | 'desc' = 'desc'): JobPosting[] => {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.posted).getTime();
    const dateB = new Date(b.posted).getTime();
    return direction === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortApplicationsByDate = (applications: Application[], direction: 'asc' | 'desc' = 'desc'): Application[] => {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a.applied).getTime();
    const dateB = new Date(b.applied).getTime();
    return direction === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Export utilities
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => 
      JSON.stringify(row[header] || '')
    ).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Category utilities
export const getCategoryLabel = (categoryKey: string): string => {
  return SKILL_CATEGORIES[categoryKey]?.label || categoryKey;
};

export const getSubcategories = (categoryKey: string): string[] => {
  return SKILL_CATEGORIES[categoryKey]?.subcategories || [];
};

export const getCategoryColor = (categoryKey: string): string => {
  const colors = {
    'full-stack': 'bg-blue-400/20 text-blue-300',
    'web3': 'bg-purple-400/20 text-purple-300',
    'creative': 'bg-pink-400/20 text-pink-300',
    'marketing': 'bg-green-400/20 text-green-300',
    'executive': 'bg-orange-400/20 text-orange-300'
  };
  return colors[categoryKey as keyof typeof colors] || 'bg-gray-400/20 text-gray-300';
};

// Theme utilities
export const getThemeColor = (colorName: string): string => {
  const colors = {
    primary: 'lime-400',
    secondary: 'slate-400',
    success: 'green-400',
    warning: 'yellow-400',
    error: 'red-400',
    info: 'blue-400'
  };
  return colors[colorName as keyof typeof colors] || 'slate-400';
};