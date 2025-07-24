import React, { useState } from 'react';
import { Code, Award, Plus, X } from 'lucide-react';
import { Skill, Certification } from '../../types';

interface SkillsCertificationsStepProps {
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
  onSkillsChange: (skills: any) => void;
  onCertificationsChange: (certifications: Certification[]) => void;
}

export const SkillsCertificationsStep: React.FC<SkillsCertificationsStepProps> = ({
  skills,
  certifications,
  onSkillsChange,
  onCertificationsChange
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications'>('skills');
  const [activeSkillCategory, setActiveSkillCategory] = useState<'fullStack' | 'web3' | 'storytelling' | 'marketing'>('fullStack');
  const [activeWeb3Tab, setActiveWeb3Tab] = useState<'evm' | 'solana'>('evm');

  // Skill categories
  const skillCategories = {
    fullStack: ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    web3: {
      evm: ['Solidity', 'Vyper', 'Hardhat', 'Truffle', 'Web3.js', 'Ethers.js'],
      solana: ['Rust', 'Move', 'Anchor', 'Solana Web3.js']
    },
    storytelling: ['Narrative Development', 'Image Development', 'Graphic Design', 'Basic Animation', 'Motion Animation', 'Short-form UGC Videos', 'Short Films', 'Collaborative Films'],
    marketing: ['Google PPC', 'SEO', 'Social Content Development', 'Social Content Strategy', 'Email Marketing', 'Analytics']
  };

  const addCertification = () => {
    onCertificationsChange([
      ...certifications,
      { name: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '', verificationUrl: '' }
    ]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    onCertificationsChange(updated);
  };

  const removeCertification = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index));
  };

  const updateSkill = (category: string, skillName: string, data: Partial<Skill>) => {
    if (category === 'fullStack') {
      const existingIndex = skills.fullStack.findIndex(s => s.skill === skillName);
      if (existingIndex >= 0) {
        const updated = [...skills.fullStack];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        onSkillsChange({ ...skills, fullStack: updated });
      } else {
        onSkillsChange({
          ...skills,
          fullStack: [...skills.fullStack, { skill: skillName, level: 'beginner', years: 0, portfolio: '', ...data }]
        });
      }
    } else if (category === 'web3-evm') {
      const existingIndex = skills.web3.evm.findIndex(s => s.skill === skillName);
      if (existingIndex >= 0) {
        const updated = [...skills.web3.evm];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        onSkillsChange({ ...skills, web3: { ...skills.web3, evm: updated } });
      } else {
        onSkillsChange({
          ...skills,
          web3: {
            ...skills.web3,
            evm: [...skills.web3.evm, { skill: skillName, level: 'beginner', years: 0, portfolio: '', ...data }]
          }
        });
      }
    } else if (category === 'web3-solana') {
      const existingIndex = skills.web3.solana.findIndex(s => s.skill === skillName);
      if (existingIndex >= 0) {
        const updated = [...skills.web3.solana];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        onSkillsChange({ ...skills, web3: { ...skills.web3, solana: updated } });
      } else {
        onSkillsChange({
          ...skills,
          web3: {
            ...skills.web3,
            solana: [...skills.web3.solana, { skill: skillName, level: 'beginner', years: 0, portfolio: '', ...data }]
          }
        });
      }
    } else if (category === 'storytelling') {
      const existingIndex = skills.storytelling.findIndex(s => s.skill === skillName);
      if (existingIndex >= 0) {
        const updated = [...skills.storytelling];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        onSkillsChange({ ...skills, storytelling: updated });
      } else {
        onSkillsChange({
          ...skills,
          storytelling: [...skills.storytelling, { skill: skillName, level: 'beginner', years: 0, portfolio: '', ...data }]
        });
      }
    } else if (category === 'marketing') {
      const existingIndex = skills.technicalMarketing.findIndex(s => s.skill === skillName);
      if (existingIndex >= 0) {
        const updated = [...skills.technicalMarketing];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        onSkillsChange({ ...skills, technicalMarketing: updated });
      } else {
        onSkillsChange({
          ...skills,
          technicalMarketing: [...skills.technicalMarketing, { skill: skillName, level: 'beginner', years: 0, portfolio: '', ...data }]
        });
      }
    }
  };

  const removeSkill = (category: string, skillName: string) => {
    if (category === 'fullStack') {
      onSkillsChange({
        ...skills,
        fullStack: skills.fullStack.filter(s => s.skill !== skillName)
      });
    } else if (category === 'web3-evm') {
      onSkillsChange({
        ...skills,
        web3: {
          ...skills.web3,
          evm: skills.web3.evm.filter(s => s.skill !== skillName)
        }
      });
    } else if (category === 'web3-solana') {
      onSkillsChange({
        ...skills,
        web3: {
          ...skills.web3,
          solana: skills.web3.solana.filter(s => s.skill !== skillName)
        }
      });
    } else if (category === 'storytelling') {
      onSkillsChange({
        ...skills,
        storytelling: skills.storytelling.filter(s => s.skill !== skillName)
      });
    } else if (category === 'marketing') {
      onSkillsChange({
        ...skills,
        technicalMarketing: skills.technicalMarketing.filter(s => s.skill !== skillName)
      });
    }
  };

  const getSelectedSkills = (category: string) => {
    switch (category) {
      case 'fullStack': return skills.fullStack;
      case 'web3-evm': return skills.web3.evm;
      case 'web3-solana': return skills.web3.solana;
      case 'storytelling': return skills.storytelling;
      case 'marketing': return skills.technicalMarketing;
      default: return [];
    }
  };

  const SkillSelector = ({ category, availableSkills }: { category: string; availableSkills: string[] }) => {
    const selectedSkills = getSelectedSkills(category);

    return (
      <div className="space-y-4">
        {availableSkills.map((skillName) => {
          const selectedSkill = selectedSkills.find(s => s.skill === skillName);
          const isSelected = !!selectedSkill;

          return (
            <div key={skillName} className="p-4 bg-slate-950/40 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 font-medium">{skillName}</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateSkill(category, skillName, {});
                    } else {
                      removeSkill(category, skillName);
                    }
                  }}
                  className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-lime-500 focus:ring-lime-500"
                />
              </div>
              
              {isSelected && (
                <div className="space-y-3 pt-3 border-t border-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Level</label>
                      <select
                        value={selectedSkill?.level || 'beginner'}
                        onChange={(e) => updateSkill(category, skillName, { level: e.target.value as any })}
                        className="input-field"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Years</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={selectedSkill?.years || 0}
                        onChange={(e) => updateSkill(category, skillName, { years: parseInt(e.target.value) || 0 })}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Portfolio/GitHub Link</label>
                    <input
                      type="url"
                      value={selectedSkill?.portfolio || ''}
                      onChange={(e) => updateSkill(category, skillName, { portfolio: e.target.value })}
                      placeholder="https://github.com/username or portfolio link"
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Skills & Certifications
        </h2>
        <p className="text-slate-400">
          Showcase your technical skills and professional certifications
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex space-x-2 p-1 bg-slate-900/70 rounded-lg">
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'skills'
              ? 'bg-lime-400/20 text-lime-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Code size={16} />
          Technical Skills
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'certifications'
              ? 'bg-lime-400/20 text-lime-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Award size={16} />
          Certifications
        </button>
      </div>

      <div className="card">
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Skill Category Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-950/50 rounded-lg">
              <button
                onClick={() => setActiveSkillCategory('fullStack')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSkillCategory === 'fullStack'
                    ? 'bg-lime-400/20 text-lime-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Full-Stack
              </button>
              <button
                onClick={() => setActiveSkillCategory('web3')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSkillCategory === 'web3'
                    ? 'bg-lime-400/20 text-lime-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Web3
              </button>
              <button
                onClick={() => setActiveSkillCategory('storytelling')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSkillCategory === 'storytelling'
                    ? 'bg-lime-400/20 text-lime-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Storytelling
              </button>
              <button
                onClick={() => setActiveSkillCategory('marketing')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSkillCategory === 'marketing'
                    ? 'bg-lime-400/20 text-lime-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Marketing
              </button>
            </div>

            {/* Skills Content */}
            {activeSkillCategory === 'fullStack' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Full-Stack Development</h3>
                <SkillSelector category="fullStack" availableSkills={skillCategories.fullStack} />
              </div>
            )}

            {activeSkillCategory === 'web3' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-200">Web3 Development</h3>
                
                <div className="flex space-x-2 p-1 bg-slate-950/50 rounded-lg">
                  <button
                    onClick={() => setActiveWeb3Tab('evm')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeWeb3Tab === 'evm'
                        ? 'bg-lime-400/20 text-lime-300'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    EVM Track
                  </button>
                  <button
                    onClick={() => setActiveWeb3Tab('solana')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeWeb3Tab === 'solana'
                        ? 'bg-lime-400/20 text-lime-300'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    Solana/Aptos/Sui
                  </button>
                </div>
                
                {activeWeb3Tab === 'evm' && (
                  <div>
                    <h4 className="text-lg font-medium text-slate-300 mb-4">EVM Languages & Smart Contracts</h4>
                    <SkillSelector category="web3-evm" availableSkills={skillCategories.web3.evm} />
                  </div>
                )}
                
                {activeWeb3Tab === 'solana' && (
                  <div>
                    <h4 className="text-lg font-medium text-slate-300 mb-4">Solana/Aptos/Sui Languages</h4>
                    <SkillSelector category="web3-solana" availableSkills={skillCategories.web3.solana} />
                  </div>
                )}
              </div>
            )}

            {activeSkillCategory === 'storytelling' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Storytelling & Creative</h3>
                <SkillSelector category="storytelling" availableSkills={skillCategories.storytelling} />
              </div>
            )}

            {activeSkillCategory === 'marketing' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Technical Marketing</h3>
                <SkillSelector category="marketing" availableSkills={skillCategories.marketing} />
              </div>
            )}

            {/* Skills Summary */}
            <div className="mt-8 p-4 bg-slate-950/40 border border-slate-800 rounded-lg">
              <h4 className="font-medium text-lime-400 mb-3">Skills Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Full-Stack:</span>
                  <span className="text-slate-300 ml-2 font-medium">{skills.fullStack.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Web3:</span>
                  <span className="text-slate-300 ml-2 font-medium">{skills.web3.evm.length + skills.web3.solana.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Storytelling:</span>
                  <span className="text-slate-300 ml-2 font-medium">{skills.storytelling.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Marketing:</span>
                  <span className="text-slate-300 ml-2 font-medium">{skills.technicalMarketing.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="section-title">
                <Award size={24} />
                Professional Certifications
              </h3>
              <button
                onClick={addCertification}
                className="btn-primary flex items-center gap-2 px-4 py-2"
              >
                <Plus size={16} />
                Add Certification
              </button>
            </div>

            {certifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Award size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No certifications added yet</p>
                <p className="text-sm">Add your professional certifications, licenses, and credentials</p>
              </div>
            ) : (
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-lg font-medium text-slate-200">
                        Certification #{index + 1}
                      </h4>
                      <button
                        onClick={() => removeCertification(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Certification Name *
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCertification(index, 'name', e.target.value)}
                          className="input-field"
                          placeholder="e.g., AWS Certified Developer"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Issuing Organization *
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                          className="input-field"
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          value={cert.issueDate}
                          onChange={(e) => updateCertification(index, 'issueDate', e.target.value)}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Expiry Date (if applicable)
                        </label>
                        <input
                          type="date"
                          value={cert.expiryDate || ''}
                          onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Credential ID
                        </label>
                        <input
                          type="text"
                          value={cert.credentialId || ''}
                          onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                          className="input-field"
                          placeholder="Certificate ID or badge number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                          Verification URL
                        </label>
                        <input
                          type="url"
                          value={cert.verificationUrl || ''}
                          onChange={(e) => updateCertification(index, 'verificationUrl', e.target.value)}
                          className="input-field"
                          placeholder="https://verify.certificationprovider.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};