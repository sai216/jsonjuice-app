'use client'
import React, { useState } from 'react';
import { 
  Eye, 
  Star, 
  Calendar, 
  Search, 
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { ApplicationDetailsManager } from './components/esteps/ApplicationDetailsManager'; // Fixed import path

// Rest of your component code stays exactly the same...
interface CandidateApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  currentPosition: string;
  currentCompany: string;
  experience: string;
  expectedSalary: string;
  availabilityDate: string;
  appliedDate: string;
  status: 'new' | 'reviewing' | 'interview-scheduled' | 'interview-completed' | 'offer-sent' | 'hired' | 'rejected';
  lastUpdated: string;
  resumeUrl?: string;
  coverLetter: string;
  portfolioUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  rating: number;
  notes: string;
  tags: string[];
  skills: string[];
  interviewDate?: string;
  interviewType?: string;
  interviewer?: string;
  interviewNotes?: string;
  referralSource: string;
  additionalNotes: string;
}

type ApplicationStatus = CandidateApplication['status'];

const mockApplications: CandidateApplication[] = [
  {
    id: 1,
    jobId: 101,
    jobTitle: 'Senior React Developer',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    city: 'San Francisco',
    state: 'CA',
    currentPosition: 'Frontend Developer',
    currentCompany: 'TechStart Inc.',
    experience: '5 years',
    expectedSalary: '$120,000 - $150,000',
    availabilityDate: '2024-02-15',
    appliedDate: '2024-01-20',
    status: 'interview-scheduled',
    lastUpdated: '2024-01-22',
    coverLetter: 'I am excited to apply for the Senior React Developer position at your company. With 5 years of experience in frontend development, I have developed strong skills in React, TypeScript, and modern web technologies...',
    portfolioUrl: 'https://johnsmith.dev',
    linkedInUrl: 'https://linkedin.com/in/johnsmith',
    githubUrl: 'https://github.com/johnsmith',
    rating: 4,
    notes: 'Strong technical background, excellent communication skills. Portfolio shows good understanding of React patterns.',
    tags: ['Strong Communication', 'React Expert', 'Available Soon'],
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    interviewDate: '2024-01-25',
    interviewType: 'Technical Interview',
    interviewer: 'Sarah Johnson, Lead Developer',
    referralSource: 'LinkedIn',
    additionalNotes: 'Interested in remote work, has experience with our tech stack.'
  },
  {
    id: 2,
    jobId: 102,
    jobTitle: 'Web3 Engineer',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    city: 'Austin',
    state: 'TX',
    currentPosition: 'Blockchain Developer',
    currentCompany: 'CryptoTech',
    experience: '3 years',
    expectedSalary: '$100,000 - $130,000',
    availabilityDate: '2024-03-01',
    appliedDate: '2024-01-19',
    status: 'reviewing',
    lastUpdated: '2024-01-21',
    coverLetter: 'As a passionate blockchain developer with 3 years of experience in DeFi protocols and smart contract development, I am thrilled to apply for the Web3 Engineer position...',
    githubUrl: 'https://github.com/sarahjohnson',
    linkedInUrl: 'https://linkedin.com/in/sarahjohnson',
    rating: 3,
    notes: 'Good Web3 experience, needs assessment on React skills.',
    tags: ['Web3 Expert', 'DeFi Experience'],
    skills: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'Hardhat'],
    referralSource: 'Company Website',
    additionalNotes: 'Has worked on several DeFi projects, looking for hybrid work arrangement.'
  },
  {
    id: 3,
    jobId: 103,
    jobTitle: 'Frontend Developer',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 456-7890',
    city: 'New York',
    state: 'NY',
    currentPosition: 'Junior Developer',
    currentCompany: 'StartupXYZ',
    experience: '2 years',
    expectedSalary: '$80,000 - $100,000',
    availabilityDate: '2024-02-01',
    appliedDate: '2024-01-18',
    status: 'offer-sent',
    lastUpdated: '2024-01-23',
    coverLetter: 'I am writing to express my strong interest in the Frontend Developer position. Although I have 2 years of experience, I am eager to learn and contribute to your team...',
    portfolioUrl: 'https://mikechen.portfolio.com',
    rating: 5,
    notes: 'Excellent potential, great attitude, quick learner. Perfect culture fit.',
    tags: ['High Potential', 'Culture Fit', 'Quick Learner'],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    referralSource: 'Employee Referral',
    additionalNotes: 'Referred by Jennifer Lee. Very enthusiastic and motivated.'
  },
  {
    id: 4,
    jobId: 104,
    jobTitle: 'Full Stack Developer',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 321-9876',
    city: 'Seattle',
    state: 'WA',
    currentPosition: 'Software Engineer',
    currentCompany: 'MegaCorp',
    experience: '7 years',
    expectedSalary: '$140,000 - $170,000',
    availabilityDate: '2024-04-01',
    appliedDate: '2024-01-16',
    status: 'rejected',
    lastUpdated: '2024-01-20',
    coverLetter: 'With 7 years of full-stack development experience, I believe I would be a valuable addition to your engineering team...',
    linkedInUrl: 'https://linkedin.com/in/emilydavis',
    rating: 2,
    notes: 'Overqualified for the position, salary expectations too high for our budget.',
    tags: ['Overqualified', 'High Salary Expectation'],
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
    referralSource: 'Job Board',
    additionalNotes: 'Strong background but not the right fit for this level position.'
  }
];

export const EnhancedApplicationsStep: React.FC = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'status'>('date');

  const handleStatusChange = (applicationId: number, newStatus: string, notes?: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { 
              ...app, 
              status: newStatus as ApplicationStatus, 
              lastUpdated: new Date().toISOString(),
              notes: notes ? `${app.notes}\n\n[${new Date().toLocaleDateString()}] Status changed to ${newStatus}: ${notes}` : app.notes
            }
          : app
      )
    );
  };

  const handleRatingChange = (applicationId: number, rating: number) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, rating } : app
      )
    );
  };

  const handleNotesUpdate = (applicationId: number, notes: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, notes } : app
      )
    );
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-400/20 text-blue-300';
      case 'reviewing':
        return 'bg-yellow-400/20 text-yellow-300';
      case 'interview-scheduled':
        return 'bg-purple-400/20 text-purple-300';
      case 'interview-completed':
        return 'bg-indigo-400/20 text-indigo-300';
      case 'offer-sent':
        return 'bg-green-400/20 text-green-300';
      case 'hired':
        return 'bg-emerald-400/20 text-emerald-300';
      case 'rejected':
        return 'bg-red-400/20 text-red-300';
      default:
        return 'bg-slate-400/20 text-slate-300';
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'reviewing':
        return 'Reviewing';
      case 'interview-scheduled':
        return 'Interview Scheduled';
      case 'interview-completed':
        return 'Interview Completed';
      case 'offer-sent':
        return 'Offer Sent';
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const uniqueJobs = [...new Set(applications.map(app => app.jobTitle))];

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = 
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.currentCompany.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesJob = jobFilter === 'all' || app.jobTitle === jobFilter;
      
      return matchesSearch && matchesStatus && matchesJob;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const applicationStats = {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    reviewing: applications.filter(app => app.status === 'reviewing').length,
    interviews: applications.filter(app => ['interview-scheduled', 'interview-completed'].includes(app.status)).length,
    offers: applications.filter(app => app.status === 'offer-sent').length,
    hired: applications.filter(app => app.status === 'hired').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="space-y-8 p-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400">Applications Management</h2>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-2">
            <Download size={16} />
            Export All
          </button>
          <button className="px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-2">
            <Mail size={16} />
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Application Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-slate-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <Briefcase className="text-slate-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.total}</h3>
          <p className="text-slate-400 text-xs">Total</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-blue-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <AlertCircle className="text-blue-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.new}</h3>
          <p className="text-slate-400 text-xs">New</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-yellow-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <Clock className="text-yellow-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.reviewing}</h3>
          <p className="text-slate-400 text-xs">Reviewing</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-purple-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <Users className="text-purple-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.interviews}</h3>
          <p className="text-slate-400 text-xs">Interviews</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-green-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.offers}</h3>
          <p className="text-slate-400 text-xs">Offers</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-emerald-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <CheckCircle className="text-emerald-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.hired}</h3>
          <p className="text-slate-400 text-xs">Hired</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="p-3 bg-red-400/10 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <XCircle className="text-red-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{applicationStats.rejected}</h3>
          <p className="text-slate-400 text-xs">Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search candidates, emails, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="interview-scheduled">Interview Scheduled</option>
              <option value="interview-completed">Interview Completed</option>
              <option value="offer-sent">Offer Sent</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Job Filter */}
          <div>
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
            >
              <option value="all">All Jobs</option>
              {uniqueJobs.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'status')}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-200 mb-2">No applications found</h3>
            <p className="text-slate-400">
              {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'No applications have been received yet.'
              }
            </p>
          </div>
        ) : (
          filteredApplications.map(application => (
            <div key={application.id} className="bg-slate-800 rounded-lg p-6 hover:border hover:border-lime-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center font-bold">
                    {application.firstName[0]}{application.lastName[0]}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">
                          {application.firstName} {application.lastName}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {application.currentPosition} at {application.currentCompany}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              className={star <= application.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}
                            />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">({application.rating}/5)</span>
                        </div>

                        {/* Status */}
                        <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusLabel(application.status)}
                        </span>
                      </div>
                    </div>

                    {/* Job & Contact Info */}
                    <div className="flex items-center gap-6 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {application.jobTitle}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {application.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {application.city}, {application.state}
                      </span>
                    </div>

                    {/* Tags */}
                    {application.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {application.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Row */}
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
                        <span>{application.experience} experience</span>
                        <span>{application.expectedSalary}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick Actions */}
                        {application.status === 'new' && (
                          <button
                            onClick={() => handleStatusChange(application.id, 'reviewing')}
                            className="px-3 py-1 text-xs bg-slate-700 text-slate-200 rounded hover:bg-slate-600"
                          >
                            Start Review
                          </button>
                        )}
                        
                        {application.status === 'reviewing' && (
                          <button
                            onClick={() => handleStatusChange(application.id, 'interview-scheduled')}
                            className="px-3 py-1 text-xs bg-lime-500 text-black rounded hover:bg-lime-400"
                          >
                            Schedule Interview
                          </button>
                        )}

                        {application.status === 'interview-completed' && (
                          <button
                            onClick={() => handleStatusChange(application.id, 'offer-sent')}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Send Offer
                          </button>
                        )}

                        {/* View Details Button */}
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="px-4 py-2 text-sm bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-2"
                        >
                          <Eye size={14} />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Interview Info */}
                    {application.interviewDate && (
                      <div className="mt-3 p-3 bg-blue-400/10 border border-blue-400/30 rounded">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className="text-blue-400" />
                          <span className="text-blue-300">
                            Interview: {new Date(application.interviewDate).toLocaleDateString()} - {application.interviewType}
                          </span>
                          {application.interviewer && (
                            <span className="text-slate-400">with {application.interviewer}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredApplications.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-400">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-slate-700 text-slate-400 rounded cursor-not-allowed" disabled>
              Previous
            </button>
            <span className="px-3 py-1 bg-lime-400/20 text-lime-300 text-sm rounded">1</span>
            <button className="px-3 py-1 text-sm bg-slate-700 text-slate-400 rounded cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <ApplicationDetailsManager
          application={selectedApplication}
          onStatusChange={handleStatusChange}
          onRatingChange={handleRatingChange}
          onNotesUpdate={handleNotesUpdate}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};