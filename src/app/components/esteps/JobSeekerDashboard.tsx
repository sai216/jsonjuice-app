// /src/app/components/esteps/JobSeekerDashboard.tsx - Updated with better consistency
'use client'
import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  Eye, 
  FileText, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Download,
  Building,
  DollarSign
} from 'lucide-react';

interface JobApplication {
  id: number;
  jobId: string; // Changed to string for consistency
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'submitted' | 'under-review' | 'interview-scheduled' | 'interview-completed' | 'offer-extended' | 'rejected' | 'withdrawn';
  lastUpdated: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  interviewDate?: string;
  feedback?: string;
  nextSteps?: string;
  applicationScore?: number;
}

const mockApplications: JobApplication[] = [
  {
    id: 1,
    jobId: '101',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    appliedDate: '2024-01-20',
    status: 'interview-scheduled',
    lastUpdated: '2024-01-22',
    salary: '$120,000 - $180,000',
    type: 'full-time',
    interviewDate: '2024-01-25',
    nextSteps: 'Technical interview with the engineering team',
    applicationScore: 85
  },
  {
    id: 2,
    jobId: '102',
    jobTitle: 'Web3 Engineer',
    company: 'CryptoCorp',
    location: 'Remote',
    appliedDate: '2024-01-18',
    status: 'under-review',
    lastUpdated: '2024-01-19',
    salary: '$100,000 - $150,000',
    type: 'full-time',
    applicationScore: 78
  },
  {
    id: 3,
    jobId: '103',
    jobTitle: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    appliedDate: '2024-01-15',
    status: 'offer-extended',
    lastUpdated: '2024-01-23',
    salary: '$90,000 - $130,000',
    type: 'full-time',
    nextSteps: 'Please respond to the offer by January 30th',
    applicationScore: 92
  },
  {
    id: 4,
    jobId: '104',
    jobTitle: 'Full Stack Developer',
    company: 'MegaCorp',
    location: 'Austin, TX',
    appliedDate: '2024-01-10',
    status: 'rejected',
    lastUpdated: '2024-01-16',
    salary: '$80,000 - $120,000',
    type: 'full-time',
    feedback: 'Strong technical skills, but looking for someone with more React experience.',
    applicationScore: 65
  },
  {
    id: 5,
    jobId: '105',
    jobTitle: 'UI/UX Developer',
    company: 'DesignStudio',
    location: 'Los Angeles, CA',
    appliedDate: '2024-01-12',
    status: 'interview-completed',
    lastUpdated: '2024-01-20',
    salary: '$75,000 - $110,000',
    type: 'contract',
    nextSteps: 'Waiting for final decision from the hiring manager',
    applicationScore: 80
  },
  {
    id: 6,
    jobId: '106',
    jobTitle: 'React Native Developer',
    company: 'MobileFirst Inc.',
    location: 'New York, NY',
    appliedDate: '2024-01-08',
    status: 'submitted',
    lastUpdated: '2024-01-08',
    salary: '$100,000 - $140,000',
    type: 'full-time',
    applicationScore: 73
  },
  {
    id: 7,
    jobId: '107',
    jobTitle: 'Freelance UI/UX Developer',
    company: 'Creative Agency Co.',
    location: 'Remote',
    appliedDate: '2024-01-05',
    status: 'withdrawn',
    lastUpdated: '2024-01-07',
    salary: '$50 - $80/hour',
    type: 'freelance',
    feedback: 'Withdrew application due to timeline conflicts',
    applicationScore: 88
  }
];

export const JobSeekerDashboard: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [sortBy, setSortBy] = useState('lastUpdated');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock size={16} className="text-blue-400" />;
      case 'under-review':
        return <Clock size={16} className="text-yellow-400" />;
      case 'interview-scheduled':
        return <Users size={16} className="text-purple-400" />;
      case 'interview-completed':
        return <Users size={16} className="text-indigo-400" />;
      case 'offer-extended':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-400" />;
      case 'withdrawn':
        return <AlertCircle size={16} className="text-gray-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-400/20 text-blue-300 border border-blue-400/30';
      case 'under-review':
        return 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30';
      case 'interview-scheduled':
        return 'bg-purple-400/20 text-purple-300 border border-purple-400/30';
      case 'interview-completed':
        return 'bg-indigo-400/20 text-indigo-300 border border-indigo-400/30';
      case 'offer-extended':
        return 'bg-green-400/20 text-green-300 border border-green-400/30';
      case 'rejected':
        return 'bg-red-400/20 text-red-300 border border-red-400/30';
      case 'withdrawn':
        return 'bg-gray-400/20 text-gray-300 border border-gray-400/30';
      default:
        return 'bg-slate-400/20 text-slate-300 border border-slate-400/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'under-review':
        return 'Under Review';
      case 'interview-scheduled':
        return 'Interview Scheduled';
      case 'interview-completed':
        return 'Interview Completed';
      case 'offer-extended':
        return 'Offer Extended';
      case 'rejected':
        return 'Rejected';
      case 'withdrawn':
        return 'Withdrawn';
      default:
        return status;
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-400/20 text-green-300';
      case 'part-time':
        return 'bg-blue-400/20 text-blue-300';
      case 'contract':
        return 'bg-purple-400/20 text-purple-300';
      case 'freelance':
        return 'bg-orange-400/20 text-orange-300';
      default:
        return 'bg-slate-400/20 text-slate-300';
    }
  };

  const formatJobType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const filteredAndSortedApplications = applications
    .filter(app => {
      const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesType = typeFilter === 'all' || app.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'appliedDate':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'company':
          return a.company.localeCompare(b.company);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'score':
          return (b.applicationScore || 0) - (a.applicationScore || 0);
        default:
          return 0;
      }
    });

  const applicationStats = {
    total: applications.length,
    active: applications.filter(app => ['submitted', 'under-review', 'interview-scheduled', 'interview-completed'].includes(app.status)).length,
    offers: applications.filter(app => app.status === 'offer-extended').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    interviews: applications.filter(app => ['interview-scheduled', 'interview-completed'].includes(app.status)).length
  };

  const ApplicationDetailModal = ({ application, onClose }: { application: JobApplication; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-200 mb-2">{application.jobTitle}</h2>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Building size={14} />
                  {application.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {application.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {application.salary}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-300 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Status and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-medium text-slate-200 mb-3">Application Status</h3>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(application.status)}
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(application.status)}`}>
                  {getStatusLabel(application.status)}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Last updated: {new Date(application.lastUpdated).toLocaleDateString()}
              </p>
            </div>

            {application.applicationScore && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h3 className="font-medium text-slate-200 mb-3">Application Score</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-lime-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${application.applicationScore}%` }}
                    />
                  </div>
                  <span className="text-lime-400 font-bold">{application.applicationScore}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Match score based on your profile
                </p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h3 className="font-medium text-slate-200 mb-4">Application Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                <CheckCircle size={16} className="text-green-400" />
                <div>
                  <p className="text-sm text-slate-200">Application Submitted</p>
                  <p className="text-xs text-slate-400">{new Date(application.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              {application.status !== 'submitted' && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <CheckCircle size={16} className="text-green-400" />
                  <div>
                    <p className="text-sm text-slate-200">Application Under Review</p>
                    <p className="text-xs text-slate-400">Your application is being reviewed by the hiring team</p>
                  </div>
                </div>
              )}

              {application.interviewDate && (
                <div className="flex items-center gap-3 p-3 bg-blue-400/20 border border-blue-400/30 rounded-lg">
                  <Users size={16} className="text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-200">Interview Scheduled</p>
                    <p className="text-xs text-slate-400">
                      {new Date(application.interviewDate).toLocaleDateString()} - Technical Interview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          {application.nextSteps && (
            <div className="mb-6">
              <h3 className="font-medium text-slate-200 mb-3">Next Steps</h3>
              <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4">
                <p className="text-sm text-slate-300">{application.nextSteps}</p>
              </div>
            </div>
          )}

          {/* Feedback */}
          {application.feedback && (
            <div className="mb-6">
              <h3 className="font-medium text-slate-200 mb-3">Feedback</h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-slate-300">{application.feedback}</p>
              </div>
            </div>
          )}

          {/* Job Details */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="font-medium text-slate-200 mb-3">Job Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Salary:</span>
                <span className="text-slate-200 ml-2">{application.salary}</span>
              </div>
              <div>
                <span className="text-slate-400">Type:</span>
                <span className="text-slate-200 ml-2">{formatJobType(application.type)}</span>
              </div>
              <div>
                <span className="text-slate-400">Applied:</span>
                <span className="text-slate-200 ml-2">{new Date(application.appliedDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-slate-400">Job ID:</span>
                <span className="text-slate-200 ml-2">#{application.jobId}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
            <button className="px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-2">
              <Eye size={16} />
              View Job Posting
            </button>
            <button className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-2">
              <Download size={16} />
              Download Application
            </button>
            {application.status === 'offer-extended' && (
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Respond to Offer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lime-400 mb-4">My Applications</h1>
          <p className="text-slate-400">Track the status of your job applications and manage your career journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="p-4 bg-blue-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{applicationStats.total}</h3>
            <p className="text-slate-400 text-sm">Total Applications</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="p-4 bg-yellow-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="text-yellow-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{applicationStats.active}</h3>
            <p className="text-slate-400 text-sm">Active Applications</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="p-4 bg-purple-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="text-purple-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{applicationStats.interviews}</h3>
            <p className="text-slate-400 text-sm">Interviews</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="p-4 bg-green-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{applicationStats.offers}</h3>
            <p className="text-slate-400 text-sm">Offers Received</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="p-4 bg-red-400/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <XCircle className="text-red-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{applicationStats.rejected}</h3>
            <p className="text-slate-400 text-sm">Not Selected</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="interview-scheduled">Interview Scheduled</option>
                <option value="interview-completed">Interview Completed</option>
                <option value="offer-extended">Offer Extended</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="appliedDate">Applied Date</option>
                <option value="company">Company</option>
                <option value="status">Status</option>
                <option value="score">Match Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredAndSortedApplications.length === 0 ? (
            <div className="bg-slate-800 rounded-lg p-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-200 mb-2">No applications found</h3>
              <p className="text-slate-400">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Start applying to jobs to see your applications here.'
                }
              </p>
              {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredAndSortedApplications.map(application => (
              <div key={application.id} className="bg-slate-800 rounded-lg p-6 hover:border hover:border-lime-400/50 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-1">
                          {application.jobTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Building size={14} />
                            {application.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            {application.salary}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.status)}
                        <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusLabel(application.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getJobTypeColor(application.type)}`}>
                        {formatJobType(application.type)}
                      </span>
                      {application.applicationScore && (
                        <span className="flex items-center gap-1 text-xs text-lime-400">
                          <TrendingUp size={12} />
                          {application.applicationScore}% match
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Applied: {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                        </span>
                        {application.interviewDate && (
                          <span className="flex items-center gap-1 text-purple-400">
                            <Users size={12} />
                            Interview: {new Date(application.interviewDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 text-sm flex items-center gap-2"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </div>

                    {/* Next Steps Preview */}
                    {application.nextSteps && (
                      <div className="mt-3 p-3 bg-lime-400/10 border border-lime-400/30 rounded">
                        <p className="text-sm text-lime-300">
                          <strong>Next Steps:</strong> {application.nextSteps}
                        </p>
                      </div>
                    )}

                    {/* Feedback Preview */}
                    {application.feedback && application.status === 'rejected' && (
                      <div className="mt-3 p-3 bg-red-400/10 border border-red-400/30 rounded">
                        <p className="text-sm text-red-300">
                          <strong>Feedback:</strong> {application.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <ApplicationDetailModal
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
          />
        )}
      </div>
    </div>
  );
};