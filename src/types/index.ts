export type View = 'applicant' | 'talent';
export type ApplicationStep = 'personal' | 'professional' | 'educational' | 'skills' | 'resume' | 'projects';

export interface IconProps {
  className?: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export interface ProfessionalDetails {
  currentJobTitle: string;
  currentCompany: string;
  workExperience: string;
  salaryExpectation: string;
  availabilityDate: string;
  workLocation: 'remote' | 'onsite' | 'hybrid';
  industry: string;
  careerLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
}

export interface EducationalDetails {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
  additionalEducation: Array<{
    type: string;
    institution: string;
    year: string;
    credential?: string;
  }>;
}

export interface Skill {
  skill: string;
  level: 'beginner' | 'intermediate' | 'expert';
  years: number;
  portfolio: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface TeamMember {
  name: string;
  email: string;
}

export interface Project {
  name: string;
  type: string;
  url: string;
  description: string;
  teamMembers: TeamMember[];
  artifact: File | null;
}

export interface ApplicationFormData {
  personal: PersonalDetails;
  professional: ProfessionalDetails;
  educational: EducationalDetails;
  skills: {
    fullStack: Skill[];
    web3: {
      evm: Skill[];
      solana: Skill[];
    };
    storytelling: Skill[];
    technicalMarketing: Skill[];
  };
  certifications: Certification[];
  resume: File | null;
  projects: Project[];
  teamMembers: TeamMember[];
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  skills: string[];
  description: string;
  referralBonus: string;
  applicants: number;
  featured: boolean;
}