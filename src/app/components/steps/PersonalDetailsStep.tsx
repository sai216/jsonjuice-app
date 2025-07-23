import React from 'react';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PersonalDetails } from '../../types';

interface PersonalDetailsStepProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  data,
  onChange
}) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Personal Details
        </h2>
        <p className="text-slate-400">
          Let's start with your basic information
        </p>
      </div>

      <div className="card">
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="section-title">
            <User size={24} />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="input-field"
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="input-field"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="section-title">
            <Mail size={24} />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="input-field"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="input-field"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-8">
          <h3 className="section-title">
            <MapPin size={24} />
            Address Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="input-field"
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
                  value={data.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="input-field"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  value={data.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="input-field"
                  placeholder="State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  value={data.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className="input-field"
                  placeholder="12345"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Country *
              </label>
              <select
                value={data.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IN">India</option>
                <option value="SG">Singapore</option>
                <option value="JP">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Links */}
        <div>
          <h3 className="section-title">
            <Globe size={24} />
            Professional Links
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={data.linkedIn}
                onChange={(e) => handleChange('linkedIn', e.target.value)}
                className="input-field"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                value={data.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="input-field"
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Portfolio Website
              </label>
              <input
                type="url"
                value={data.portfolio}
                onChange={(e) => handleChange('portfolio', e.target.value)}
                className="input-field"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};