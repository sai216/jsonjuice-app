'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Stepper } from '../ui/Stepper';
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep';
import { ProfessionalDetailsStep } from '../steps/ProfessionalDetailsStep';
import { EducationalDetailsStep } from '../steps/EducationalDetailsStep';
import { SkillsCertificationsStep } from '../steps/SkillsCertificationsStep';
import { ResumeStep } from '../steps/ResumeStep';
import { ProjectsStep } from '../steps/ProjectsStep';
import { 
  ApplicationStep, 
  PersonalDetails, 
  ProfessionalDetails, 
  EducationalDetails, 
  Skill, 
  Certification, 
  TeamMember,
  Project
} from '../../../types';

interface JobApplication {
  jobId: number;
  jobTitle: string;
  company: string;
}

interface ApplicantViewProps {
  jobApplication?: JobApplication | null;
}

export const ApplicantView: React.FC<ApplicantViewProps> = ({ jobApplication }) => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('personal');
  const [completedSteps, setCompletedSteps] = useState<ApplicationStep[]>([]);

  // Form data states
  const [personalData, setPersonalData] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  });

  const [professionalData, setProfessionalData] = useState<ProfessionalDetails>({
    currentJobTitle: '',
    currentCompany: '',
    workExperience: '',
    salaryExpectation: '',
    availabilityDate: '',
    workLocation: 'remote',
    industry: '',
    careerLevel: 'mid'
  });

  const [educationalData, setEducationalData] = useState<EducationalDetails>({
    degree: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    gpa: '',
    additionalEducation: []
  });

  const [skillsData, setSkillsData] = useState({
    fullStack: [] as Skill[],
    web3: {
      evm: [] as Skill[],
      solana: [] as Skill[]
    },
    storytelling: [] as Skill[],
    technicalMarketing: [] as Skill[],
    executive: [] as Skill[]
  });

  const [certificationsData, setCertificationsData] = useState<Certification[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', email: '' }
  ]);
  const [projects, setProjects] = useState<Project[]>([]);

  const steps: ApplicationStep[] = ['personal', 'professional', 'educational', 'skills', 'resume', 'projects'];
  const currentStepIndex = steps.indexOf(currentStep);

  // Reset form when starting a new application
  useEffect(() => {
    if (jobApplication) {
      setCurrentStep('personal');
      setCompletedSteps([]);
    }
  }, [jobApplication]);

  const validateStep = (step: ApplicationStep): boolean => {
    switch (step) {
      case 'personal':
        return !!(personalData.firstName && personalData.lastName && personalData.email && personalData.phone && personalData.country);
      case 'professional':
        return !!(professionalData.currentJobTitle && professionalData.currentCompany && professionalData.workExperience && professionalData.industry && professionalData.careerLevel && professionalData.workLocation && professionalData.availabilityDate);
      case 'educational':
        return !!(educationalData.degree && educationalData.fieldOfStudy && educationalData.institution && educationalData.graduationYear);
      case 'skills':
        const totalSkills = skillsData.fullStack.length + 
                           skillsData.web3.evm.length + 
                           skillsData.web3.solana.length + 
                           skillsData.storytelling.length + 
                           skillsData.technicalMarketing.length + 
                           (skillsData.executive?.length || 0);
        return totalSkills > 0;
      case 'resume':
        return !!resumeFile;
      case 'projects':
        return teamMembers.some(member => member.name && member.email);
      default:
        return false;
    }
  };

  const goToNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      if (currentStepIndex < steps.length - 1) {
        setCurrentStep(steps[currentStepIndex + 1]);
      }
    } else {
      alert('Please complete all required fields before proceeding.');
    }
  };

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const goToStep = (step: ApplicationStep) => {
    setCurrentStep(step);
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      alert('Please complete all required fields before submitting.');
      return;
    }

    const combinedOutput = {
      timestamp: new Date().toISOString(),
      applicationType: jobApplication ? 'job-application' : 'general-profile',
      
      // Job Information (if applying for specific job)
      ...(jobApplication && {
        jobApplication: {
          jobId: jobApplication.jobId,
          jobTitle: jobApplication.jobTitle,
          company: jobApplication.company,
          appliedAt: new Date().toISOString()
        }
      }),
      
      personalProfile: personalData,
      professionalProfile: professionalData,
      educationalProfile: educationalData,
      skillsProfile: skillsData,
      certifications: certificationsData,
      resume: resumeFile ? {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type,
        lastModified: resumeFile.lastModified
      } : null,
      projectsProfile: {
        teamMembers: teamMembers,
        projects: projects.map(project => ({
          ...project,
          artifact: project.artifact ? {
            name: project.artifact.name,
            size: project.artifact.size,
            type: project.artifact.type
          } : null
        })),
        leaderboardPoints: teamMembers.filter(m =>
          m.email && m.email.includes('@') && m.email.trim() !== ''
        ).length * 10
      },
      summary: {
        totalSkills: skillsData.fullStack.length + skillsData.web3.evm.length + skillsData.web3.solana.length + skillsData.storytelling.length + skillsData.technicalMarketing.length + (skillsData.executive?.length || 0),
        totalCertifications: certificationsData.length,
        totalProjects: projects.length,
        totalTeamMembers: teamMembers.length,
        validEmails: teamMembers.filter(m =>
          m.email && m.email.includes('@') && m.email.trim() !== ''
        ).length,
        completionPercentage: Math.round((completedSteps.length + 1) / steps.length * 100),
        profileStrength: calculateProfileStrength()
      }
    };

    console.log('🚀 Complete Application Output:', JSON.stringify(combinedOutput, null, 2));
    
    const message = jobApplication 
      ? `✅ Job application submitted successfully for ${jobApplication.jobTitle} at ${jobApplication.company}!`
      : '✅ Profile submitted successfully!';
      
    alert(`${message} Check console for complete JSON output.`);
  }, [personalData, professionalData, educationalData, skillsData, certificationsData, resumeFile, teamMembers, projects, completedSteps, currentStep, jobApplication]);

  const calculateProfileStrength = () => {
    let strength = 0;
    const weights = {
      personal: 15,
      professional: 20,
      educational: 15,
      skills: 20,
      resume: 15,
      projects: 15
    };

    steps.forEach(step => {
      if (validateStep(step)) {
        strength += weights[step];
      }
    });

    return Math.round(strength);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalDetailsStep
            data={personalData}
            onChange={setPersonalData}
          />
        );
      case 'professional':
        return (
          <ProfessionalDetailsStep
            data={professionalData}
            onChange={setProfessionalData}
          />
        );
      case 'educational':
        return (
          <EducationalDetailsStep
            data={educationalData}
            onChange={setEducationalData}
          />
        );
      case 'skills':
        return (
          <SkillsCertificationsStep
            skills={skillsData}
            certifications={certificationsData}
            onSkillsChange={setSkillsData}
            onCertificationsChange={setCertificationsData}
          />
        );
      case 'resume':
        return (
          <ResumeStep
            resume={resumeFile}
            onChange={setResumeFile}
          />
        );
      case 'projects':
        return (
          <ProjectsStep
            teamMembers={teamMembers}
            projects={projects}
            onTeamMembersChange={setTeamMembers}
            onProjectsChange={setProjects}
          />
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    if (jobApplication) {
      return `Apply for ${jobApplication.jobTitle}`;
    }
    return 'Professional Profile Builder';
  };

  const getPageDescription = () => {
    if (jobApplication) {
      return `Complete your application for ${jobApplication.jobTitle} at ${jobApplication.company}`;
    }
    return 'Complete your comprehensive professional profile step by step';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-slate-400 text-lg">
            {getPageDescription()}
          </p>
          
          {/* Job Info Card */}
          {jobApplication && (
            <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 bg-lime-400/10 border border-lime-400/30 rounded-lg">
              <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-lime-400 font-medium">
                  {jobApplication.jobTitle}
                </p>
                <p className="text-lime-300 text-sm">
                  {jobApplication.company}
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-4 inline-flex items-center gap-4 px-6 py-2 bg-slate-900/50 rounded-full">
            <span className="text-sm text-slate-400">Profile Strength:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-lime-400 to-green-500 transition-all duration-300"
                  style={{ width: `${calculateProfileStrength()}%` }}
                />
              </div>
              <span className="text-lime-400 font-medium text-sm">
                {calculateProfileStrength()}%
              </span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <Stepper
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          {/* Step Content */}
          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentStepIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-6">
              {/* Step Indicator */}
              <div className="text-center">
                <span className="text-sm text-slate-400 block">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
                <span className="text-xs text-slate-500">
                  {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete
                </span>
              </div>

              {/* Next/Submit Button */}
              {currentStepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNext}
                  className="btn-primary"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary px-8"
                >
                  {jobApplication ? 'Submit Application' : 'Submit Profile'}
                </button>
              )}
            </div>
          </div>

          {/* Validation Status */}
          {!validateStep(currentStep) && (
            <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Please complete all required fields to proceed to the next step.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};