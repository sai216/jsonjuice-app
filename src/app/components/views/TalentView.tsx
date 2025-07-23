import React from 'react';
import { Briefcase, Users, TrendingUp, Star, MapPin, Clock } from 'lucide-react';

interface TalentViewProps {
  onApplyClick?: (jobId: number, jobTitle: string, company: string) => void;
}

export const TalentView: React.FC<TalentViewProps> = ({ onApplyClick }) => {
  const handleApplyClick = (jobId: number, jobTitle: string, company: string) => {
    if (onApplyClick) {
      onApplyClick(jobId, jobTitle, company);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-4">
            Talent Marketplace
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Connect with top talent and discover exciting opportunities in the JsonJuice ecosystem
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <div className="p-4 bg-lime-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="text-lime-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">1,247</h3>
            <p className="text-slate-400 text-sm">Active Jobs</p>
          </div>
          
          <div className="card text-center">
            <div className="p-4 bg-blue-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">5,832</h3>
            <p className="text-slate-400 text-sm">Registered Talent</p>
          </div>
          
          <div className="card text-center">
            <div className="p-4 bg-purple-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">892</h3>
            <p className="text-slate-400 text-sm">Successful Hires</p>
          </div>
          
          <div className="card text-center">
            <div className="p-4 bg-orange-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="text-orange-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">4.9</h3>
            <p className="text-slate-400 text-sm">Average Rating</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Jobs */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="section-title mb-6">
                <Briefcase size={24} />
                Featured Opportunities
              </h2>
              
              <div className="space-y-6">
                {/* Job Card 1 */}
                <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg hover:border-lime-400/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">
                        Senior Full-Stack Developer
                      </h3>
                      <p className="text-lime-400 font-medium">DeFi Protocol Inc.</p>
                    </div>
                    <span className="px-3 py-1 bg-lime-400/20 text-lime-300 text-xs font-medium rounded-full">
                      FEATURED
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      Remote
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Full-time
                    </span>
                    <span className="text-lime-400 font-medium">$120k - $180k</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'Node.js', 'Solidity', 'PostgreSQL'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    Join our growing team to build the next generation of DeFi applications. 
                    We're looking for a passionate developer with strong full-stack skills...
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Posted 2 hours ago</span>
                    <button 
                      onClick={() => handleApplyClick(1, 'Senior Full-Stack Developer', 'DeFi Protocol Inc.')}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Job Card 2 */}
                <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg hover:border-lime-400/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">
                        Web3 Frontend Engineer
                      </h3>
                      <p className="text-lime-400 font-medium">Crypto Exchange</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-400/20 text-orange-300 text-xs font-medium rounded-full">
                      HOT
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Full-time
                    </span>
                    <span className="text-lime-400 font-medium">$100k - $150k</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['TypeScript', 'Next.js', 'Web3.js', 'Tailwind'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    Build beautiful and intuitive user interfaces for our trading platform. 
                    Experience with Web3 integration and modern React patterns required...
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Posted 1 day ago</span>
                    <button 
                      onClick={() => handleApplyClick(2, 'Web3 Frontend Engineer', 'Crypto Exchange')}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Job Card 3 */}
                <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-lg hover:border-lime-400/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">
                        Smart Contract Developer
                      </h3>
                      <p className="text-lime-400 font-medium">NFT Marketplace</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      Remote
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Contract
                    </span>
                    <span className="text-lime-400 font-medium">$80 - $120/hr</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Solidity', 'Hardhat', 'OpenZeppelin', 'IPFS'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    Develop and audit smart contracts for our NFT marketplace. 
                    Strong security focus and experience with gas optimization required...
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Posted 3 days ago</span>
                    <button 
                      onClick={() => handleApplyClick(3, 'Smart Contract Developer', 'NFT Marketplace')}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="section-title mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary text-left">
                  Post a Job
                </button>
                <button className="w-full btn-secondary text-left">
                  Browse All Jobs
                </button>
                <button className="w-full btn-secondary text-left">
                  View Talent Pool
                </button>
                <button className="w-full btn-secondary text-left">
                  Manage Applications
                </button>
              </div>
            </div>

            {/* Trending Skills */}
            <div className="card">
              <h3 className="section-title mb-4">
                <TrendingUp size={20} />
                Trending Skills
              </h3>
              
              <div className="space-y-3">
                {[
                  { skill: 'Solidity', demand: 95 },
                  { skill: 'React', demand: 88 },
                  { skill: 'Node.js', demand: 82 },
                  { skill: 'Python', demand: 76 },
                  { skill: 'TypeScript', demand: 71 }
                ].map(({ skill, demand }) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-lime-400 transition-all duration-300"
                          style={{ width: `${demand}%` }}
                        />
                      </div>
                      <span className="text-lime-400 text-xs font-medium w-8">
                        {demand}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="section-title mb-4">
                Recent Activity
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-slate-300">
                      <span className="font-medium">John D.</span> applied for Senior Developer role
                    </p>
                    <p className="text-slate-500 text-xs">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-slate-300">
                      New job posted: <span className="font-medium">Web3 Designer</span>
                    </p>
                    <p className="text-slate-500 text-xs">15 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-slate-300">
                      <span className="font-medium">Sarah M.</span> was hired for Frontend role
                    </p>
                    <p className="text-slate-500 text-xs">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center card">
          <h2 className="text-2xl font-bold text-lime-400 mb-4">
            Ready to Join the JsonJuice Ecosystem?
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Whether you're looking for talent or seeking new opportunities, 
            our platform connects the best minds in Web3 and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8">
              Get Started as Employer
            </button>
            <button 
              onClick={() => handleApplyClick(0, 'General Application', 'JsonJuice')}
              className="btn-secondary px-8"
            >
              Join as Talent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};