import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  Filter 
} from 'lucide-react';

export const DashboardStep: React.FC = () => {
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const skillCategories = {
    'full-stack': {
      label: 'Full-Stack',
      subcategories: ['Frontend Specialist', 'Backend Specialist', 'Full-Stack Generalist']
    },
    'web3': {
      label: 'Web3',
      subcategories: ['Smart Contract Developer', 'DApp Developer', 'DeFi Engineer']
    },
    'creative': {
      label: 'Creative',
      subcategories: ['Storyteller', 'Visual Designer', 'Animator', 'Content Creator', 'Filmmaker']
    },
    'marketing': {
      label: 'Technical Marketing',
      subcategories: ['Digital Marketing', 'Content Marketing', 'Growth Marketing', 'Technical Writing']
    },
    'executive': {
      label: 'Executive Management',
      subcategories: ['CEO', 'COO', 'CFO', 'CTO', 'CMO', 'CPO', 'CHRO']
    }
  };

  const getSubcategories = () => {
    if (skillCategoryFilter === 'all') return [];
    return skillCategories[skillCategoryFilter]?.subcategories || [];
  };

  const resetFilters = () => {
    setSkillCategoryFilter('all');
    setSubcategoryFilter('all');
    setPeriodFilter('all');
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="space-y-8">
      {/* Advanced Filters */}
      <div className="card">
        <h2 className="section-title mb-6">
          <Filter size={24} />
          Dashboard Filters
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skill Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Talent Skill Category
            </label>
            <select
              value={skillCategoryFilter}
              onChange={(e) => {
                setSkillCategoryFilter(e.target.value);
                setSubcategoryFilter('all');
              }}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {Object.entries(skillCategories).map(([key, category]) => (
                <option key={key} value={key}>{category.label}</option>
              ))}
            </select>
          </div>
          
          {/* Subcategory Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Subcategory Expertise
            </label>
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
              className="input-field"
              disabled={skillCategoryFilter === 'all'}
            >
              <option value="all">All Subcategories</option>
              {getSubcategories().map((subcategory) => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
            {skillCategoryFilter === 'all' && (
              <p className="text-xs text-slate-500 mt-1">Select a category first</p>
            )}
          </div>
          
          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Time Period
            </label>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All System History</option>
              <option value="ytd">Year to Date (YTD)</option>
              <option value="mtd">Month to Date (MTD)</option>
              <option value="last-30">Last 30 Days</option>
              <option value="last-90">Last 90 Days</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>
          
          {/* Date Range */}
          <div>
            {periodFilter === 'custom' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Custom Date Range
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="input-field text-sm"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="input-field text-sm"
                  placeholder="End Date"
                />
              </div>
            ) : (
              <div className="flex items-end h-full">
                <button
                  onClick={resetFilters}
                  className="btn-secondary w-full"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Active Filters Display */}
        {(skillCategoryFilter !== 'all' || subcategoryFilter !== 'all' || periodFilter !== 'all') && (
          <div className="mt-4 p-4 bg-lime-400/10 border border-lime-400/30 rounded-lg">
            <h4 className="text-sm font-medium text-lime-400 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {skillCategoryFilter !== 'all' && (
                <span className="px-3 py-1 bg-purple-400/20 text-purple-300 text-xs rounded-full">
                  Category: {skillCategories[skillCategoryFilter]?.label}
                </span>
              )}
              {subcategoryFilter !== 'all' && (
                <span className="px-3 py-1 bg-pink-400/20 text-pink-300 text-xs rounded-full">
                  Subcategory: {subcategoryFilter}
                </span>
              )}
              {periodFilter !== 'all' && (
                <span className="px-3 py-1 bg-blue-400/20 text-blue-300 text-xs rounded-full">
                  Period: {periodFilter === 'ytd' ? 'Year to Date' : 
                           periodFilter === 'mtd' ? 'Month to Date' : 
                           periodFilter === 'custom' ? 'Custom Range' : periodFilter}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filtered Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="p-4 bg-lime-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Briefcase className="text-lime-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">
            {skillCategoryFilter === 'creative' && subcategoryFilter === 'storyteller' ? '3' : 
             skillCategoryFilter === 'web3' ? '4' : 
             periodFilter === 'mtd' ? '8' : '12'}
          </h3>
          <p className="text-slate-400 text-sm">Active Job Posts</p>
          <p className="text-lime-400 text-xs mt-1">
            {skillCategoryFilter !== 'all' ? `in ${skillCategories[skillCategoryFilter]?.label}` : 'Total'}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-blue-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="text-blue-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">
            {skillCategoryFilter === 'creative' && subcategoryFilter === 'storyteller' ? '45' : 
             skillCategoryFilter === 'web3' ? '89' : 
             periodFilter === 'mtd' ? '156' : '248'}
          </h3>
          <p className="text-slate-400 text-sm">Total Applications</p>
          <p className="text-blue-400 text-xs mt-1">
            {periodFilter === 'mtd' ? 'This Month' : 
             periodFilter === 'ytd' ? 'This Year' : 
             periodFilter === 'all' ? 'All Time' : 'Filtered Period'}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-purple-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="text-purple-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">
            {skillCategoryFilter === 'creative' ? '5' : 
             periodFilter === 'mtd' ? '12' : '18'}
          </h3>
          <p className="text-slate-400 text-sm">Successful Hires</p>
          <p className="text-purple-400 text-xs mt-1">
            {skillCategoryFilter !== 'all' ? `${skillCategories[skillCategoryFilter]?.label} roles` : 'All categories'}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="p-4 bg-orange-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="text-orange-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-200 mb-2">
            {skillCategoryFilter === 'creative' ? '18' : 
             skillCategoryFilter === 'web3' ? '11' : '14'}
          </h3>
          <p className="text-slate-400 text-sm">Avg. Days to Hire</p>
          <p className="text-orange-400 text-xs mt-1">
            {skillCategoryFilter !== 'all' ? 'Category average' : 'Overall average'}
          </p>
        </div>
      </div>

      {/* Filtered Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="section-title mb-6">
            Recent Applications
            {skillCategoryFilter !== 'all' && (
              <span className="text-sm font-normal text-slate-400 ml-2">
                ({skillCategories[skillCategoryFilter]?.label})
              </span>
            )}
          </h2>
          <div className="space-y-4">
            {[
              { 
                name: 'John Smith', 
                role: skillCategoryFilter === 'creative' ? 'Filmmaker / Storyteller' : 'Senior React Developer', 
                time: '2 hours ago', 
                status: 'new',
                category: skillCategoryFilter === 'creative' ? 'Creative' : 'Full-Stack',
                subcategory: skillCategoryFilter === 'creative' ? 'Storyteller' : 'Frontend Specialist'
              },
              { 
                name: 'Sarah Johnson', 
                role: skillCategoryFilter === 'web3' ? 'DeFi Engineer' : 'Web3 Engineer', 
                time: '4 hours ago', 
                status: 'reviewed',
                category: 'Web3',
                subcategory: 'DApp Developer'
              },
              { 
                name: 'Mike Chen', 
                role: 'Smart Contract Dev', 
                time: '1 day ago', 
                status: 'interview',
                category: 'Web3',
                subcategory: 'Smart Contract Developer'
              },
              { 
                name: 'Lisa Wang', 
                role: skillCategoryFilter === 'creative' ? 'Visual Designer' : 'Frontend Engineer', 
                time: '2 days ago', 
                status: 'hired',
                category: skillCategoryFilter === 'creative' ? 'Creative' : 'Full-Stack',
                subcategory: skillCategoryFilter === 'creative' ? 'Visual Designer' : 'Frontend Specialist'
              }
            ].filter(app => {
              if (skillCategoryFilter !== 'all') {
                const categoryMatch = app.category.toLowerCase().replace(' ', '-').replace('full-stack', 'full-stack') === skillCategoryFilter;
                if (!categoryMatch) return false;
                
                if (subcategoryFilter !== 'all') {
                  return app.subcategory === subcategoryFilter;
                }
              }
              return true;
            }).map((app, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-950/40 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-200">{app.name}</h4>
                  <p className="text-sm text-slate-400">{app.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-lime-400/20 text-lime-300 text-xs rounded">
                      {app.category}
                    </span>
                    <span className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                      {app.subcategory}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{app.time}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  app.status === 'new' ? 'bg-blue-400/20 text-blue-300' :
                  app.status === 'reviewed' ? 'bg-yellow-400/20 text-yellow-300' :
                  app.status === 'interview' ? 'bg-purple-400/20 text-purple-300' :
                  'bg-green-400/20 text-green-300'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title mb-6">
            Job Performance
            {periodFilter !== 'all' && (
              <span className="text-sm font-normal text-slate-400 ml-2">
                ({periodFilter === 'ytd' ? 'Year to Date' : 
                  periodFilter === 'mtd' ? 'Month to Date' : 
                  periodFilter})
              </span>
            )}
          </h2>
          <div className="space-y-4">
            {[
              { 
                role: skillCategoryFilter === 'creative' ? 'Filmmaker / Storyteller' : 'Senior React Developer', 
                applications: skillCategoryFilter === 'creative' ? 28 : 45, 
                views: skillCategoryFilter === 'creative' ? 156 : 234,
                category: skillCategoryFilter === 'creative' ? 'Creative' : 'Full-Stack'
              },
              { 
                role: 'Web3 Engineer', 
                applications: periodFilter === 'mtd' ? 18 : 32, 
                views: periodFilter === 'mtd' ? 89 : 189,
                category: 'Web3'
              },
              { 
                role: skillCategoryFilter === 'creative' ? 'Visual Designer' : 'Smart Contract Developer', 
                applications: skillCategoryFilter === 'creative' ? 22 : 28, 
                views: skillCategoryFilter === 'creative' ? 134 : 156,
                category: skillCategoryFilter === 'creative' ? 'Creative' : 'Web3'
              },
              { 
                role: 'Frontend Engineer', 
                applications: 38, 
                views: 201,
                category: 'Full-Stack'
              }
            ].filter(job => {
              if (skillCategoryFilter !== 'all') {
                return job.category.toLowerCase().replace(' ', '-').replace('full-stack', 'full-stack') === skillCategoryFilter;
              }
              return true;
            }).map((job, index) => (
              <div key={index} className="p-4 bg-slate-950/40 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-200">{job.role}</h4>
                  <span className="px-2 py-1 bg-lime-400/20 text-lime-300 text-xs rounded">
                    {job.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{job.applications} applications</span>
                  <span className="text-slate-400">{job.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};