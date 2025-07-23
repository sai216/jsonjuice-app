import React from 'react';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';
import { ProfessionalDetails } from '../../types';

interface ProfessionalDetailsStepProps {
  data: ProfessionalDetails;
  onChange: (data: ProfessionalDetails) => void;
}

export const ProfessionalDetailsStep: React.FC<ProfessionalDetailsStepProps> = ({
  data,
  onChange
}) => {
  const handleChange = (field: keyof ProfessionalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Professional Details
        </h2>
        <p className="text-slate-400">
          Tell us about your professional experience and career goals
        </p>
      </div>

      <div className="card">
        {/* Current Role */}
        <div className="mb-8">
          <h3 className="section-title">
            <Briefcase size={24} />
            Current Role
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Job Title *
              </label>
              <input
                type="text"
                value={data.currentJobTitle}
                onChange={(e) => handleChange('currentJobTitle', e.target.value)}
                className="input-field"
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Company *
              </label>
              <input
                type="text"
                value={data.currentCompany}
                onChange={(e) => handleChange('currentCompany', e.target.value)}
                className="input-field"
                placeholder="e.g., Tech Corp Inc."
                required
              />
            </div>
          </div>
        </div>

        {/* Experience & Career Level */}
        <div className="mb-8">
          <h3 className="section-title">
            Experience & Level
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Total Work Experience *
              </label>
              <select
                value={data.workExperience}
                onChange={(e) => handleChange('workExperience', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-7">5-7 years</option>
                <option value="7-10">7-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Career Level *
              </label>
              <select
                value={data.careerLevel}
                onChange={(e) => handleChange('careerLevel', e.target.value as any)}
                className="input-field"
                required
              >
                <option value="">Select Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead/Principal</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Industry & Compensation */}
        <div className="mb-8">
          <h3 className="section-title">
            <DollarSign size={24} />
            Industry & Compensation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Industry *
              </label>
              <select
                value={data.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Gaming">Gaming</option>
                <option value="Blockchain/Crypto">Blockchain/Crypto</option>
                <option value="Fintech">Fintech</option>
                <option value="SaaS">SaaS</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Consulting">Consulting</option>
                <option value="Education">Education</option>
                <option value="Media">Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Salary Expectation (USD)
              </label>
              <select
                value={data.salaryExpectation}
                onChange={(e) => handleChange('salaryExpectation', e.target.value)}
                className="input-field"
              >
                <option value="">Select Range</option>
                <option value="30k-50k">$30,000 - $50,000</option>
                <option value="50k-70k">$50,000 - $70,000</option>
                <option value="70k-100k">$70,000 - $100,000</option>
                <option value="100k-130k">$100,000 - $130,000</option>
                <option value="130k-160k">$130,000 - $160,000</option>
                <option value="160k-200k">$160,000 - $200,000</option>
                <option value="200k-250k">$200,000 - $250,000</option>
                <option value="250k+">$250,000+</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Availability & Work Preferences */}
        <div>
          <h3 className="section-title">
            <Calendar size={24} />
            Availability & Work Preferences
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Availability Date *
              </label>
              <input
                type="date"
                value={data.availabilityDate}
                onChange={(e) => handleChange('availabilityDate', e.target.value)}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Work Location Preference *
              </label>
              <select
                value={data.workLocation}
                onChange={(e) => handleChange('workLocation', e.target.value as any)}
                className="input-field"
                required
              >
                <option value="">Select Preference</option>
                <option value="remote">Fully Remote</option>
                <option value="onsite">On-site Only</option>
                <option value="hybrid">Hybrid (Remote + On-site)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};