import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, DollarSign, Target, Award, Calendar } from 'lucide-react';

export const AnalyticsStep: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400 mb-6">Hiring Analytics</h2>
        <div className="flex items-center gap-4">
          <select className="input-field w-auto">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
          <button className="btn-secondary">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="p-4 bg-lime-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="text-lime-400" size={24} />
          </div>
          <h3 className="text-3xl font-bold text-lime-400 mb-2">14</h3>
          <p className="text-slate-400 text-sm">Avg. Days to Hire</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingDown size={14} className="text-green-400" />
            <p className="text-green-400 text-xs">-2 days from last month</p>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-blue-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="text-blue-400" size={24} />
          </div>
          <h3 className="text-3xl font-bold text-blue-400 mb-2">73%</h3>
          <p className="text-slate-400 text-sm">Application Response Rate</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp size={14} className="text-green-400" />
            <p className="text-green-400 text-xs">+5% from last month</p>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-purple-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <DollarSign className="text-purple-400" size={24} />
          </div>
          <h3 className="text-3xl font-bold text-purple-400 mb-2">$4.2k</h3>
          <p className="text-slate-400 text-sm">Cost Per Hire</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp size={14} className="text-red-400" />
            <p className="text-red-400 text-xs">+$200 from last month</p>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-orange-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Target className="text-orange-400" size={24} />
          </div>
          <h3 className="text-3xl font-bold text-orange-400 mb-2">89%</h3>
          <p className="text-slate-400 text-sm">Offer Acceptance Rate</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp size={14} className="text-green-400" />
            <p className="text-green-400 text-xs">+12% from last month</p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="section-title mb-6">Job Performance</h3>
          <div className="space-y-4">
            {[
              { job: 'Senior React Developer', views: 1234, applications: 45, ratio: '3.6%', trend: 'up' },
              { job: 'Web3 Engineer', views: 892, applications: 32, ratio: '3.6%', trend: 'stable' },
              { job: 'Smart Contract Developer', views: 756, applications: 28, ratio: '3.7%', trend: 'up' },
              { job: 'Filmmaker / Storyteller', views: 634, applications: 24, ratio: '3.8%', trend: 'down' },
              { job: 'Technical Marketing Manager', views: 523, applications: 19, ratio: '3.6%', trend: 'up' }
            ].map((job, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-200">{job.job}</h4>
                  <div className="flex items-center gap-2">
                    {job.trend === 'up' && <TrendingUp size={14} className="text-green-400" />}
                    {job.trend === 'down' && <TrendingDown size={14} className="text-red-400" />}
                    <span className="text-lime-400 font-bold">{job.ratio}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{job.views.toLocaleString()} views</span>
                  <span>{job.applications} applications</span>
                </div>
                <div className="mt-2 w-full bg-slate-700 rounded-full h-1">
                  <div 
                    className="bg-lime-400 h-1 rounded-full" 
                    style={{ width: `${(job.applications / job.views) * 100 * 25}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-6">Source Performance</h3>
          <div className="space-y-4">
            {[
              { source: 'JsonJuice Portal', applications: 156, quality: 'High', cost: '$2.1k', roi: '+28%' },
              { source: 'LinkedIn', applications: 89, quality: 'Medium', cost: '$3.2k', roi: '+12%' },
              { source: 'Direct Referrals', applications: 67, quality: 'High', cost: '$1.8k', roi: '+45%' },
              { source: 'Company Website', applications: 45, quality: 'Medium', cost: '$0.5k', roi: '+89%' },
              { source: 'Job Boards', applications: 23, quality: 'Low', cost: '$1.9k', roi: '-8%' }
            ].map((source, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-slate-200">{source.source}</h4>
                    <p className="text-sm text-slate-400">{source.applications} applications • {source.cost}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      source.quality === 'High' ? 'bg-green-400/20 text-green-300' :
                      source.quality === 'Medium' ? 'bg-yellow-400/20 text-yellow-300' :
                      'bg-red-400/20 text-red-300'
                    }`}>
                      {source.quality}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">ROI</span>
                  <span className={`text-xs font-medium ${
                    source.roi.includes('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {source.roi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Funnel */}
      <div className="card">
        <h3 className="section-title mb-6">Hiring Funnel Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { stage: 'Applied', count: 248, percentage: 100, color: 'bg-blue-400' },
            { stage: 'Screened', count: 156, percentage: 63, color: 'bg-yellow-400' },
            { stage: 'Interviewed', count: 45, percentage: 18, color: 'bg-purple-400' },
            { stage: 'Offered', count: 18, percentage: 7, color: 'bg-orange-400' },
            { stage: 'Hired', count: 12, percentage: 5, color: 'bg-green-400' }
          ].map((stage, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
                  <div className={`w-16 h-16 ${stage.color} rounded-full flex items-center justify-center text-black font-bold`}>
                    {stage.count}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-slate-900 px-2 py-1 text-xs text-slate-400 rounded">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-slate-200">{stage.stage}</h4>
              <p className="text-xs text-slate-400 mt-1">
                {index > 0 && `${Math.round((stage.count / 248) * 100)}% conversion`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time-based Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="section-title mb-6">Monthly Hiring Trends</h3>
          <div className="space-y-4">
            {[
              { month: 'January 2024', hires: 8, applications: 156, ratio: '5.1%' },
              { month: 'February 2024', hires: 12, applications: 189, ratio: '6.3%' },
              { month: 'March 2024', hires: 15, applications: 234, ratio: '6.4%' },
              { month: 'April 2024', hires: 10, applications: 198, ratio: '5.1%' },
              { month: 'May 2024', hires: 18, applications: 267, ratio: '6.7%' }
            ].map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-slate-200">{month.month}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">{month.applications} apps</span>
                  <span className="text-green-400 font-medium">{month.hires} hires</span>
                  <span className="text-lime-400 font-bold">{month.ratio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-6">Top Performing Recruiters</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Williams', hires: 12, applications: 89, success: '13.5%' },
              { name: 'Mike Johnson', hires: 8, applications: 67, success: '11.9%' },
              { name: 'Emily Chen', hires: 6, applications: 54, success: '11.1%' },
              { name: 'David Rodriguez', hires: 4, applications: 38, success: '10.5%' },
              { name: 'Lisa Thompson', hires: 3, applications: 29, success: '10.3%' }
            ].map((recruiter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center text-xs font-medium">
                    {recruiter.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-slate-200">{recruiter.name}</span>
                  {index < 3 && <Award size={14} className="text-yellow-400" />}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">{recruiter.applications} apps</span>
                  <span className="text-green-400 font-medium">{recruiter.hires} hires</span>
                  <span className="text-lime-400 font-bold">{recruiter.success}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};