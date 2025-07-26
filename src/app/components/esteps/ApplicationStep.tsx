import React from 'react';

export const ApplicationsStep: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400">Applications</h2>
        <div className="flex items-center gap-4">
          <select className="input-field w-auto">
            <option>All Jobs</option>
            <option>Senior React Developer</option>
            <option>Web3 Engineer</option>
            <option>Filmmaker / Storyteller</option>
            <option>Smart Contract Developer</option>
            <option>Technical Marketing Manager</option>
          </select>
          <select className="input-field w-auto">
            <option>All Status</option>
            <option>New</option>
            <option>Reviewed</option>
            <option>Interview</option>
            <option>Hired</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application List */}
        <div className="lg:col-span-2 card">
          <h3 className="section-title mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[
              { 
                id: 1, 
                name: 'John Smith', 
                email: 'john.smith@email.com',
                role: 'Senior React Developer', 
                applied: '2024-01-20',
                status: 'new',
                experience: '5 years',
                location: 'San Francisco, CA',
                skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
                avatar: 'JS'
              },
              { 
                id: 2, 
                name: 'Sarah Johnson', 
                email: 'sarah.johnson@email.com',
                role: 'Web3 Engineer', 
                applied: '2024-01-19',
                status: 'reviewed',
                experience: '3 years',
                location: 'Remote',
                skills: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
                avatar: 'SJ'
              },
              { 
                id: 3, 
                name: 'Mike Chen', 
                email: 'mike.chen@email.com',
                role: 'Smart Contract Developer', 
                applied: '2024-01-18',
                status: 'interview',
                experience: '7 years',
                location: 'New York, NY',
                skills: ['Solidity', 'Hardhat', 'OpenZeppelin', 'DeFi'],
                avatar: 'MC'
              },
              { 
                id: 4, 
                name: 'Emma Davis', 
                email: 'emma.davis@email.com',
                role: 'Filmmaker / Storyteller', 
                applied: '2024-01-17',
                status: 'hired',
                experience: '4 years',
                location: 'Los Angeles, CA',
                skills: ['Video Production', 'Storytelling', 'Adobe Suite', 'Motion Graphics'],
                avatar: 'ED'
              },
              { 
                id: 5, 
                name: 'Alex Rodriguez', 
                email: 'alex.rodriguez@email.com',
                role: 'Technical Marketing Manager', 
                applied: '2024-01-16',
                status: 'reviewed',
                experience: '6 years',
                location: 'Austin, TX',
                skills: ['Content Marketing', 'Technical Writing', 'SEO', 'Analytics'],
                avatar: 'AR'
              }
            ].map((application) => (
              <div key={application.id} className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg hover:border-lime-400/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center font-medium text-sm">
                      {application.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-1">{application.name}</h4>
                      <p className="text-sm text-slate-400">{application.email}</p>
                      <p className="text-sm text-lime-400">{application.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    application.status === 'new' ? 'bg-blue-400/20 text-blue-300' :
                    application.status === 'reviewed' ? 'bg-yellow-400/20 text-yellow-300' :
                    application.status === 'interview' ? 'bg-purple-400/20 text-purple-300' :
                    application.status === 'hired' ? 'bg-green-400/20 text-green-300' :
                    'bg-red-400/20 text-red-300'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-slate-300 ml-2">{application.experience}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 ml-2">{application.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Applied:</span>
                    <span className="text-slate-300 ml-2">{application.applied}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {application.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className="btn-primary px-4 py-2 text-sm">
                    View Profile
                  </button>
                  {application.status === 'new' && (
                    <button className="btn-secondary px-4 py-2 text-sm">
                      Review Application
                    </button>
                  )}
                  {application.status === 'reviewed' && (
                    <button className="btn-secondary px-4 py-2 text-sm">
                      Schedule Interview
                    </button>
                  )}
                  {application.status === 'interview' && (
                    <button className="px-4 py-2 text-sm bg-green-400/20 text-green-300 hover:bg-green-400/30 rounded transition-colors">
                      Make Offer
                    </button>
                  )}
                  {application.status !== 'hired' && (
                    <button className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors">
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Stats */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">Application Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Applications</span>
                <span className="text-lime-400 font-bold">248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">New Applications</span>
                <span className="text-blue-400 font-bold">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">In Review</span>
                <span className="text-yellow-400 font-bold">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Interviews</span>
                <span className="text-purple-400 font-bold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hired</span>
                <span className="text-green-400 font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rejected</span>
                <span className="text-red-400 font-bold">141</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left">
                Schedule Interviews
              </button>
              <button className="w-full btn-secondary text-left">
                Send Bulk Email
              </button>
              <button className="w-full btn-secondary text-left">
                Export Applications
              </button>
              <button className="w-full btn-secondary text-left">
                Application Settings
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Application Pipeline</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">New → Review</span>
                  <span className="text-blue-400">32</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Review → Interview</span>
                  <span className="text-yellow-400">45</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Interview → Hire</span>
                  <span className="text-purple-400">18</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};