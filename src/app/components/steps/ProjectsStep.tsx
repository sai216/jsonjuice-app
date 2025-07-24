import React, { useState } from 'react';
import { Users, Plus, X, Star, Upload } from 'lucide-react';
import { TeamMember, Project } from '../../types';

interface ProjectsStepProps {
  teamMembers: TeamMember[];
  projects: Project[];
  onTeamMembersChange: (members: TeamMember[]) => void;
  onProjectsChange: (projects: Project[]) => void;
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({
  teamMembers,
  projects,
  onTeamMembersChange,
  onProjectsChange
}) => {
  const [currentProject, setCurrentProject] = useState<Project>({
    name: '',
    type: '',
    url: '',
    description: '',
    teamMembers: [],
    artifact: null
  });

  const projectTypes = [
    'Hackathon',
    'Web3 App',
    'Mobile App',
    'Web Application',
    'Open Source Project',
    'Technical Documentation',
    'Short Film',
    'Creative Project',
    'Research Project'
  ];

  const addTeamMember = () => {
    if (teamMembers.length < 10) {
      onTeamMembersChange([...teamMembers, { name: '', email: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      onTeamMembersChange(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index: number, field: 'name' | 'email', value: string) => {
    const updated = teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    onTeamMembersChange(updated);
  };

  const addProject = () => {
    if (currentProject.name && currentProject.type && currentProject.description) {
      onProjectsChange([...projects, { ...currentProject }]);
      setCurrentProject({
        name: '',
        type: '',
        url: '',
        description: '',
        teamMembers: [],
        artifact: null
      });
    }
  };

  const removeProject = (index: number) => {
    onProjectsChange(projects.filter((_, i) => i !== index));
  };

  const handleProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCurrentProject({ ...currentProject, artifact: file });
  };

  const validEmailCount = teamMembers.filter(m => 
    m.email && m.email.includes('@') && m.email.trim() !== ''
  ).length;

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Projects & Team
        </h2>
        <p className="text-slate-400">
          Showcase your collaborative projects and build your team profile
        </p>
      </div>

      {/* Team Members Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title">
            <Users size={24} />
            Team Members (1-10)
          </h3>
          <button
            onClick={addTeamMember}
            disabled={teamMembers.length >= 10}
            className="btn-primary flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex gap-4 items-center p-4 bg-slate-950/40 border border-slate-800 rounded-lg">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={member.name}
                  onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                  className="input-field mb-2"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={member.email}
                  onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                  className="input-field"
                />
              </div>
              
              {teamMembers.length > 1 && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Leaderboard Points */}
        <div className="p-4 bg-lime-400/10 border border-lime-400/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-lime-400" size={20} />
            <h4 className="font-medium text-lime-300">Leaderboard Points</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Current Points:</span>
              <span className="text-lime-400 ml-2 font-bold text-lg">{validEmailCount * 10}</span>
            </div>
            <div>
              <span className="text-slate-400">Valid Emails:</span>
              <span className="text-slate-300 ml-2 font-medium">{validEmailCount}/{teamMembers.length}</span>
            </div>
            <div>
              <span className="text-slate-400">Max Possible:</span>
              <span className="text-slate-300 ml-2 font-medium">100 points</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Earn 10 points per valid team member email (max 10 members)
          </p>
        </div>
      </div>

      {/* Add New Project Section */}
      <div className="card">
        <h3 className="section-title mb-6">
          <Plus size={24} />
          Add Collaborative Project
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              placeholder="e.g., DeFi Dashboard App"
              value={currentProject.name}
              onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Type *
            </label>
            <select 
              value={currentProject.type}
              onChange={(e) => setCurrentProject({...currentProject, type: e.target.value})}
              className="input-field"
            >
              <option value="">Select type...</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project URL (GitHub, Demo, etc.)
          </label>
          <input
            type="url"
            placeholder="https://github.com/username/project or https://demo.project.com"
            value={currentProject.url}
            onChange={(e) => setCurrentProject({...currentProject, url: e.target.value})}
            className="input-field"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Description * (max 500 characters)
          </label>
          <textarea
            placeholder="Describe your project, technologies used, your role, and key achievements..."
            maxLength={500}
            rows={4}
            value={currentProject.description}
            onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
            className="input-field"
          />
          <p className="text-xs text-slate-400 mt-1">
            {currentProject.description.length}/500 characters
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Artifact (Optional)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov,.zip"
              onChange={handleProjectFileChange}
              className="input-field file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-lime-400 file:text-black hover:file:bg-lime-300"
            />
          </div>
          {currentProject.artifact && (
            <p className="text-sm text-lime-400 mt-2">
              ✓ {currentProject.artifact.name}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            PDF, images, videos, or zip files. Max 25MB
          </p>
        </div>
        
        <button 
          onClick={addProject}
          disabled={!currentProject.name || !currentProject.type || !currentProject.description}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Project to Portfolio
        </button>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="card">
          <h3 className="section-title mb-6">
            Your Project Portfolio ({projects.length})
          </h3>
          
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-slate-200">{project.name}</h4>
                    <p className="text-lime-400 text-sm">{project.type}</p>
                  </div>
                  <button
                    onClick={() => removeProject(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <p className="text-slate-300 text-sm mb-3">{project.description}</p>
                
                {project.url && (
                  <p className="text-blue-400 text-sm mb-2">
                    🔗 <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {project.url}
                    </a>
                  </p>
                )}
                
                {project.artifact && (
                  <p className="text-slate-400 text-sm">
                    📎 Artifact: {project.artifact.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};