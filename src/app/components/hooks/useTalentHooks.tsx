// hooks/useTalentHooks.ts - Custom hooks for talent/employer functionality

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  FilterState, 
  JobPostingData, 
  JobPostingStep, 
  EmployerStep,
  JobPosting,
  Application,
  ValidationErrors,
  FormState
} from '../types/talent';
import { 
  SKILL_CATEGORIES, 
  DEFAULT_JOB_POSTING_DATA, 
  VALIDATION_RULES 
} from '../constants/talent';

// Hook for managing filter state in dashboard
export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    skillCategoryFilter: 'all',
    subcategoryFilter: 'all',
    periodFilter: 'all',
    dateRange: { start: '', end: '' }
  });

  const setSkillCategoryFilter = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      skillCategoryFilter: category,
      subcategoryFilter: 'all' // Reset subcategory when category changes
    }));
  }, []);

  const setSubcategoryFilter = useCallback((subcategory: string) => {
    setFilters(prev => ({ ...prev, subcategoryFilter: subcategory }));
  }, []);

  const setPeriodFilter = useCallback((period: string) => {
    setFilters(prev => ({ ...prev, periodFilter: period }));
  }, []);

  const setDateRange = useCallback((dateRange: { start: string; end: string }) => {
    setFilters(prev => ({ ...prev, dateRange }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      skillCategoryFilter: 'all',
      subcategoryFilter: 'all',
      periodFilter: 'all',
      dateRange: { start: '', end: '' }
    });
  }, []);

  // Computed properties
  const hasActiveFilters = useMemo(() => {
    return filters.skillCategoryFilter !== 'all' || 
           filters.subcategoryFilter !== 'all' || 
           filters.periodFilter !== 'all';
  }, [filters]);

  const availableSubcategories = useMemo(() => {
    if (filters.skillCategoryFilter === 'all') return [];
    return SKILL_CATEGORIES[filters.skillCategoryFilter]?.subcategories || [];
  }, [filters.skillCategoryFilter]);

  const activeFiltersDisplay = useMemo(() => {
    const activeFilters = [];

    if (filters.skillCategoryFilter !== 'all') {
      const category = SKILL_CATEGORIES[filters.skillCategoryFilter];
      activeFilters.push({
        label: `Category: ${category?.label}`,
        className: 'bg-purple-400/20 text-purple-300'
      });
    }

    if (filters.subcategoryFilter !== 'all') {
      activeFilters.push({
        label: `Subcategory: ${filters.subcategoryFilter}`,
        className: 'bg-pink-400/20 text-pink-300'
      });
    }

    if (filters.periodFilter !== 'all') {
      const periodLabel = filters.periodFilter === 'ytd' ? 'Year to Date' : 
                         filters.periodFilter === 'mtd' ? 'Month to Date' : 
                         filters.periodFilter === 'custom' ? 'Custom Range' : 
                         filters.periodFilter;
      activeFilters.push({
        label: `Period: ${periodLabel}`,
        className: 'bg-blue-400/20 text-blue-300'
      });
    }

    return activeFilters;
  }, [filters]);

  return {
    ...filters,
    setSkillCategoryFilter,
    setSubcategoryFilter,
    setPeriodFilter,
    setDateRange,
    resetFilters,
    hasActiveFilters,
    availableSubcategories,
    activeFiltersDisplay
  };
};

// Hook for managing job posting form
export const useJobPosting = () => {
  const [jobPostingData, setJobPostingData] = useState<JobPostingData>(DEFAULT_JOB_POSTING_DATA);
  const [jobPostingStep, setJobPostingStep] = useState<JobPostingStep>('company');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateJobPostingData = useCallback((updates: Partial<JobPostingData>) => {
    setJobPostingData(prev => ({ ...prev, ...updates }));
    // Clear related errors when data changes
    const updatedFields = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  }, []);

  const validateStep = useCallback((step: JobPostingStep): boolean => {
    const newErrors: ValidationErrors = {};
    
    switch (step) {
      case 'company':
        if (!jobPostingData.companyName) newErrors.companyName = 'Company name is required';
        if (!jobPostingData.department) newErrors.department = 'Department is required';
        if (!jobPostingData.hiringManager) newErrors.hiringManager = 'Hiring manager is required';
        if (!jobPostingData.contactEmail) newErrors.contactEmail = 'Contact email is required';
        else if (!/\S+@\S+\.\S+/.test(jobPostingData.contactEmail)) {
          newErrors.contactEmail = 'Invalid email format';
        }
        break;
      
      case 'role':
        if (!jobPostingData.jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!jobPostingData.jobDescription) newErrors.jobDescription = 'Job description is required';
        else if (jobPostingData.jobDescription.length < 50) {
          newErrors.jobDescription = 'Job description must be at least 50 characters';
        }
        if (!jobPostingData.requirements) newErrors.requirements = 'Requirements are required';
        if (!jobPostingData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        if (!jobPostingData.jobType) newErrors.jobType = 'Job type is required';
        if (!jobPostingData.workLocation) newErrors.workLocation = 'Work location is required';
        break;
      
      case 'compensation':
        if (!jobPostingData.salaryMin) newErrors.salaryMin = 'Minimum salary is required';
        if (!jobPostingData.salaryMax) newErrors.salaryMax = 'Maximum salary is required';
        if (jobPostingData.salaryMin && jobPostingData.salaryMax) {
          const min = parseInt(jobPostingData.salaryMin);
          const max = parseInt(jobPostingData.salaryMax);
          if (min >= max) newErrors.salaryMax = 'Maximum salary must be greater than minimum';
        }
        break;
      
      case 'screening':
        if (!jobPostingData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
        else {
          const deadline = new Date(jobPostingData.applicationDeadline);
          const today = new Date();
          if (deadline <= today) newErrors.applicationDeadline = 'Deadline must be in the future';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [jobPostingData]);

  const nextStep = useCallback(() => {
    if (validateStep(jobPostingStep)) {
      const steps: JobPostingStep[] = ['company', 'role', 'compensation', 'screening', 'review'];
      const currentIndex = steps.indexOf(jobPostingStep);
      if (currentIndex < steps.length - 1) {
        setJobPostingStep(steps[currentIndex + 1]);
      }
    }
  }, [jobPostingStep, validateStep]);

  const previousStep = useCallback(() => {
    const steps: JobPostingStep[] = ['company', 'role', 'compensation', 'screening', 'review'];
    const currentIndex = steps.indexOf(jobPostingStep);
    if (currentIndex > 0) {
      setJobPostingStep(steps[currentIndex - 1]);
    }
  }, [jobPostingStep]);

  const goToStep = useCallback((step: JobPostingStep) => {
    setJobPostingStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setJobPostingData(DEFAULT_JOB_POSTING_DATA);
    setJobPostingStep('company');
    setErrors({});
  }, []);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const isFirstStep = jobPostingStep === 'company';
  const isLastStep = jobPostingStep === 'review';

  return {
    jobPostingData,
    jobPostingStep,
    errors,
    setJobPostingData,
    setJobPostingStep,
    updateJobPostingData,
    validateStep,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    isValid,
    isFirstStep,
    isLastStep
  };
};

// Hook for managing application state
export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    jobId: '',
    status: '',
    search: ''
  });

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      if (filters.jobId && app.jobId.toString() !== filters.jobId) return false;
      if (filters.status && app.status !== filters.status) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return app.name.toLowerCase().includes(searchLower) ||
               app.email.toLowerCase().includes(searchLower) ||
               app.role.toLowerCase().includes(searchLower);
      }
      return true;
    });
  }, [applications, filters]);

  const updateApplicationStatus = useCallback((id: number, status: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: status as any } : app
      )
    );
  }, []);

  const applicationStats = useMemo(() => {
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
      rejected: stats.rejected || 0
    };
  }, [applications]);

  return {
    applications: filteredApplications,
    allApplications: applications,
    loading,
    filters,
    setFilters,
    updateApplicationStatus,
    applicationStats
  };
};

// Hook for managing employer navigation
export const useEmployerNavigation = () => {
  const [currentStep, setCurrentStep] = useState<EmployerStep>('dashboard');
  const [previousStep, setPreviousStep] = useState<EmployerStep | null>(null);

  const navigateToStep = useCallback((step: EmployerStep) => {
    setPreviousStep(currentStep);
    setCurrentStep(step);
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (previousStep) {
      setCurrentStep(previousStep);
      setPreviousStep(null);
    }
  }, [previousStep]);

  const canGoBack = Boolean(previousStep);

  return {
    currentStep,
    previousStep,
    navigateToStep,
    goBack,
    canGoBack
  };
};

// Hook for managing local storage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

// Hook for debouncing values (useful for search)
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};