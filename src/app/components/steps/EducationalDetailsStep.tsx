import React from 'react';
import { GraduationCap, Plus, X } from 'lucide-react';
import { EducationalDetails } from '../../types';

interface EducationalDetailsStepProps {
  data: EducationalDetails;
  onChange: (data: EducationalDetails) => void;
}

export const EducationalDetailsStep: React.FC<EducationalDetailsStepProps> = ({
  data,
  onChange
}) => {
  const handleChange = (field: keyof EducationalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addAdditionalEducation = () => {
    onChange({
      ...data,
      additionalEducation: [
        ...data.additionalEducation,
        { type: '', institution: '', year: '', credential: '' }
      ]
    });
  };

  const updateAdditionalEducation = (index: number, field: string, value: string) => {
    const updated = data.additionalEducation.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, additionalEducation: updated });
  };

  const removeAdditionalEducation = (index: number) => {
    const updated = data.additionalEducation.filter((_, i) => i !== index);
    onChange({ ...data, additionalEducation: updated });
  };

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Educational Background
        </h2>
        <p className="text-slate-400">
          Share your educational qualifications and achievements
        </p>
      </div>

      <div className="card">
        {/* Primary Education */}
        <div className="mb-8">
          <h3 className="section-title">
            <GraduationCap size={24} />
            Primary Education
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Highest Degree *
              </label>
              <select
                value={data.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Degree</option>
                <option value="High School">High School Diploma</option>
                <option value="Associate">Associate Degree</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD/Doctorate</option>
                <option value="Professional">Professional Degree</option>
                <option value="Certificate">Certificate Program</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={data.fieldOfStudy}
                onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                className="input-field"
                placeholder="e.g., Computer Science, Engineering"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Institution/University *
              </label>
              <input
                type="text"
                value={data.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="input-field"
                placeholder="e.g., MIT, Stanford University"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Graduation Year *
              </label>
              <select
                value={data.graduationYear}
                onChange={(e) => handleChange('graduationYear', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              GPA (Optional)
            </label>
            <input
              type="text"
              value={data.gpa || ''}
              onChange={(e) => handleChange('gpa', e.target.value)}
              className="input-field md:w-1/2"
              placeholder="e.g., 3.8/4.0"
            />
          </div>
        </div>

        {/* Additional Education */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-title">
              Additional Education & Training
            </h3>
            <button
              type="button"
              onClick={addAdditionalEducation}
              className="btn-primary flex items-center gap-2 px-4 py-2"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
          
          {data.additionalEducation.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
              <p>No additional education added yet</p>
              <p className="text-sm mt-2">Add bootcamps, certifications, online courses, etc.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.additionalEducation.map((edu, index) => (
                <div key={index} className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium text-slate-200">
                      Additional Education #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeAdditionalEducation(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Type
                      </label>
                      <select
                        value={edu.type}
                        onChange={(e) => updateAdditionalEducation(index, 'type', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select Type</option>
                        <option value="Bootcamp">Bootcamp</option>
                        <option value="Online Course">Online Course</option>
                        <option value="Certification">Certification</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Professional Development">Professional Development</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Institution/Provider
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateAdditionalEducation(index, 'institution', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Coursera, Lambda School"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Year Completed
                      </label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateAdditionalEducation(index, 'year', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 2023"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Credential/Certificate
                      </label>
                      <input
                        type="text"
                        value={edu.credential || ''}
                        onChange={(e) => updateAdditionalEducation(index, 'credential', e.target.value)}
                        className="input-field"
                        placeholder="Certificate name or credential ID"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};