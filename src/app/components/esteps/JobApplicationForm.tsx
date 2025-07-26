'use client'
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Upload, 
  Briefcase,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface JobApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Professional Information
  currentPosition: string;
  currentCompany: string;
  experience: string;
  expectedSalary: string;
  availabilityDate: string;
  
  // Application Specific
  coverLetter: string;
  resumeFile: File | null;
  portfolioUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  
  // Additional
  referralSource: string;
  additionalNotes: string;
}

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

interface JobApplicationFormProps {
  job: JobDetails;
  onSubmit: (data: JobApplicationData) => void;
  onCancel: () => void;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  job,
  onSubmit,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    currentPosition: '',
    currentCompany: '',
    experience: '',
    expectedSalary: '',
    availabilityDate: '',
    coverLetter: '',
    resumeFile: null,
    portfolioUrl: '',
    linkedInUrl: '',
    githubUrl: '',
    referralSource: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (updates: Partial<JobApplicationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;

      case 2: // Professional Information
        if (!formData.currentPosition) newErrors.currentPosition = 'Current position is required';
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.expectedSalary) newErrors.expectedSalary = 'Expected salary is required';
        if (!formData.availabilityDate) newErrors.availabilityDate = 'Availability date is required';
        break;

      case 3: // Documents & Portfolio
        if (!formData.resumeFile) newErrors.resumeFile = 'Resume is required';
        if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';
        else if (formData.coverLetter.length < 100) {
          newErrors.coverLetter = 'Cover letter must be at least 100 characters';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ resumeFile: file });
    }
  };

  // Step 1: Personal Information
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="john.doe@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="New York"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="10001"
          />
        </div>
      </div>
    </div>
  );

  // Step 2: Professional Information
  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Current Position *
          </label>
          <input
            type="text"
            value={formData.currentPosition}
            onChange={(e) => updateFormData({ currentPosition: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="Senior Developer"
          />
          {errors.currentPosition && (
            <p className="text-red-400 text-xs mt-1">{errors.currentPosition}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Current Company
          </label>
          <input
            type="text"
            value={formData.currentCompany}
            onChange={(e) => updateFormData({ currentCompany: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="Tech Corp Inc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Years of Experience *
          </label>
          <select
            value={formData.experience}
            onChange={(e) => updateFormData({ experience: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          >
            <option value="">Select Experience</option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="6-8">6-8 years</option>
            <option value="9-12">9-12 years</option>
            <option value="13+">13+ years</option>
          </select>
          {errors.experience && (
            <p className="text-red-400 text-xs mt-1">{errors.experience}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Expected Salary *
          </label>
          <input
            type="text"
            value={formData.expectedSalary}
            onChange={(e) => updateFormData({ expectedSalary: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="$80,000 - $120,000"
          />
          {errors.expectedSalary && (
            <p className="text-red-400 text-xs mt-1">{errors.expectedSalary}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Availability Date *
          </label>
          <input
            type="date"
            value={formData.availabilityDate}
            onChange={(e) => updateFormData({ availabilityDate: e.target.value })}
            className="w-full md:w-1/2 p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          />
          {errors.availabilityDate && (
            <p className="text-red-400 text-xs mt-1">{errors.availabilityDate}</p>
          )}
        </div>
      </div>
    </div>
  );

  // Step 3: Documents & Portfolio
  const renderDocuments = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Resume/CV *
        </label>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <div className="text-sm text-slate-300 mb-2">
            <label htmlFor="resume-upload" className="cursor-pointer">
              <span className="text-lime-400 hover:text-lime-300">Click to upload</span>
              <span> or drag and drop</span>
            </label>
          </div>
          <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 10MB</p>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          {formData.resumeFile && (
            <div className="mt-2 text-sm text-lime-400">
              ✓ {formData.resumeFile.name}
            </div>
          )}
        </div>
        {errors.resumeFile && (
          <p className="text-red-400 text-xs mt-1">{errors.resumeFile}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Cover Letter *
        </label>
        <textarea
          rows={6}
          value={formData.coverLetter}
          onChange={(e) => updateFormData({ coverLetter: e.target.value })}
          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
        />
        <div className="flex justify-between mt-1">
          {errors.coverLetter ? (
            <p className="text-red-400 text-xs">{errors.coverLetter}</p>
          ) : (
            <p className="text-slate-500 text-xs">
              {formData.coverLetter.length}/500 characters
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Portfolio URL
          </label>
          <input
            type="url"
            value={formData.portfolioUrl}
            onChange={(e) => updateFormData({ portfolioUrl: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="https://myportfolio.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedInUrl}
            onChange={(e) => updateFormData({ linkedInUrl: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            GitHub Profile
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => updateFormData({ githubUrl: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            How did you hear about us?
          </label>
          <select
            value={formData.referralSource}
            onChange={(e) => updateFormData({ referralSource: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          >
            <option value="">Select source</option>
            <option value="linkedin">LinkedIn</option>
            <option value="job-board">Job Board</option>
            <option value="company-website">Company Website</option>
            <option value="referral">Employee Referral</option>
            <option value="recruiter">Recruiter</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Additional Notes
        </label>
        <textarea
          rows={3}
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
          placeholder="Any additional information you'd like to share..."
        />
      </div>
    </div>
  );

  // Step 4: Review & Submit
  const renderReview = () => (
    <div className="space-y-6">
      <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-lime-400 mb-4">Application Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Name:</span>
            <span className="text-slate-200 ml-2">{formData.firstName} {formData.lastName}</span>
          </div>
          <div>
            <span className="text-slate-400">Email:</span>
            <span className="text-slate-200 ml-2">{formData.email}</span>
          </div>
          <div>
            <span className="text-slate-400">Phone:</span>
            <span className="text-slate-200 ml-2">{formData.phone}</span>
          </div>
          <div>
            <span className="text-slate-400">Current Position:</span>
            <span className="text-slate-200 ml-2">{formData.currentPosition}</span>
          </div>
          <div>
            <span className="text-slate-400">Experience:</span>
            <span className="text-slate-200 ml-2">{formData.experience} years</span>
          </div>
          <div>
            <span className="text-slate-400">Expected Salary:</span>
            <span className="text-slate-200 ml-2">{formData.expectedSalary}</span>
          </div>
          <div>
            <span className="text-slate-400">Available From:</span>
            <span className="text-slate-200 ml-2">{formData.availabilityDate}</span>
          </div>
          <div>
            <span className="text-slate-400">Resume:</span>
            <span className="text-slate-200 ml-2">
              {formData.resumeFile ? '✓ Uploaded' : '✗ Not uploaded'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
        <h4 className="font-medium text-blue-400 mb-3">What happens next?</h4>
        <ul className="text-sm text-slate-300 space-y-2">
          <li>• Your application will be reviewed by our hiring team</li>
          <li>• We'll contact you within 5-7 business days if you're selected for next steps</li>
          <li>• You can track your application status in your dashboard</li>
          <li>• Check your email for updates on your application</li>
        </ul>
      </div>
    </div>
  );

  const stepTitles = [
    'Personal Information',
    'Professional Background',
    'Documents & Portfolio',
    'Review & Submit'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Job Listing
          </button>
          
          <div className="bg-slate-900/50 rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-lime-400 mb-2">Apply for {job.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={14} />
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <div key={stepNumber} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all
                      ${isCompleted
                        ? 'bg-lime-400 text-black'
                        : isActive
                        ? 'bg-lime-400/20 text-lime-300 border-2 border-lime-400'
                        : 'bg-slate-700 text-slate-400'
                      }
                    `}>
                      {isCompleted ? <CheckCircle size={20} /> : stepNumber}
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      isActive ? 'text-lime-400' : 
                      isCompleted ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {title}
                    </span>
                  </div>
                  
                  {index < stepTitles.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 ${
                      isCompleted ? 'bg-lime-400' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-200 mb-6">{stepTitles[currentStep - 1]}</h2>
          
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderProfessionalInfo()}
          {currentStep === 3 && renderDocuments()}
          {currentStep === 4 && renderReview()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-2"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};