'use client'
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  FileText,
  Download,
  Eye,
  Clock,
  Star,
  ArrowLeft,
  ExternalLink,
  Edit
} from 'lucide-react';

// Shared interface that matches exactly with EnhancedApplicationsStep
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

interface ApplicationDetailsManagerProps {
  application: CandidateApplication;
  onStatusChange: (applicationId: number, newStatus: string, notes?: string) => void;
  onRatingChange: (applicationId: number, rating: number) => void;
  onNotesUpdate: (applicationId: number, notes: string) => void;
  onClose: () => void;
}

export const ApplicationDetailsManager: React.FC<ApplicationDetailsManagerProps> = ({
  application,
  onStatusChange,
  onRatingChange,
  onNotesUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'assessment' | 'timeline'>('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(application.notes);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>(application.status);
  const [statusNotes, setStatusNotes] = useState('');

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
        return 'New Application';
      case 'reviewing':
        return 'Under Review';
      case 'interview-scheduled':
        return 'Interview Scheduled';
      case 'interview-completed':
        return 'Interview Completed';
      case 'offer-sent':
        return 'Offer Sent';
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Not Selected';
      default:
        return status;
    }
  };

  const handleStatusUpdate = () => {
    onStatusChange(application.id, newStatus, statusNotes);
    setShowStatusModal(false);
    setStatusNotes('');
  };

  const handleNotesUpdate = () => {
    onNotesUpdate(application.id, notes);
    setIsEditingNotes(false);
  };

  const StatusUpdateModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Update Application Status</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              New Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
            >
              <option value="new">New Application</option>
              <option value="reviewing">Under Review</option>
              <option value="interview-scheduled">Interview Scheduled</option>
              <option value="interview-completed">Interview Completed</option>
              <option value="offer-sent">Offer Sent</option>
              <option value="hired">Hired</option>
              <option value="rejected">Not Selected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={statusNotes}
              onChange={(e) => setStatusNotes(e.target.value)}
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
              placeholder="Add any notes about this status change..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowStatusModal(false)}
            className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusUpdate}
            className="flex-1 px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Candidate Summary */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center font-bold text-lg">
              {application.firstName[0]}{application.lastName[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-200">
                {application.firstName} {application.lastName}
              </h2>
              <p className="text-slate-400">{application.currentPosition} at {application.currentCompany}</p>
              <p className="text-sm text-slate-500">{application.experience} experience</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(application.id, star)}
                  className={`${
                    star <= application.rating ? 'text-yellow-400' : 'text-slate-600'
                  } hover:text-yellow-300 transition-colors`}
                >
                  <Star size={20} fill={star <= application.rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">Rating: {application.rating}/5</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-slate-400" />
            <a href={`mailto:${application.email}`} className="text-lime-400 hover:text-lime-300">
              {application.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-slate-400" />
            <span className="text-slate-300">{application.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-slate-300">{application.city}, {application.state}</span>
          </div>
        </div>
      </div>

      {/* Status & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium text-slate-200 mb-3">Current Status</h3>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(application.status)}`}>
              {getStatusLabel(application.status)}
            </span>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-3 py-1 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-600"
            >
              Change Status
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Last updated: {new Date(application.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium text-slate-200 mb-3">Key Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Expected Salary:</span>
              <span className="text-slate-300">{application.expectedSalary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Available From:</span>
              <span className="text-slate-300">{new Date(application.availabilityDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Applied:</span>
              <span className="text-slate-300">{new Date(application.appliedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Tags */}
      <div className="bg-slate-800/50 rounded-lg p-4">
        <h3 className="font-medium text-slate-200 mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {application.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-lime-400/20 text-lime-300 text-sm rounded">
              {skill}
            </span>
          ))}
        </div>
        
        {application.tags.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {application.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cover Letter Preview */}
      <div className="bg-slate-800/50 rounded-lg p-4">
        <h3 className="font-medium text-slate-200 mb-3">Cover Letter</h3>
        <div className="bg-slate-900/50 rounded p-4 text-sm text-slate-300 leading-relaxed">
          {application.coverLetter.length > 300 
            ? `${application.coverLetter.substring(0, 300)}...`
            : application.coverLetter
          }
        </div>
        {application.coverLetter.length > 300 && (
          <button 
            onClick={() => setActiveTab('documents')}
            className="text-lime-400 hover:text-lime-300 text-sm mt-2"
          >
            Read full cover letter →
          </button>
        )}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Resume */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-slate-200">Resume/CV</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-2">
              <Eye size={14} />
              View
            </button>
            <button className="px-3 py-1 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-2">
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
        {application.resumeUrl ? (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FileText size={16} />
            <span>Resume uploaded - Click to view</span>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No resume uploaded</p>
        )}
      </div>

      {/* Cover Letter */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-4">Cover Letter</h3>
        <div className="bg-slate-900/50 rounded p-4 text-sm text-slate-300 leading-relaxed max-h-96 overflow-y-auto">
          {application.coverLetter || 'No cover letter provided'}
        </div>
      </div>

      {/* Links & Portfolio */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-4">Links & Portfolio</h3>
        <div className="space-y-3">
          {application.portfolioUrl && (
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded">
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-slate-400" />
                <span className="text-sm text-slate-300">Portfolio</span>
              </div>
              <a
                href={application.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 text-sm"
              >
                View Portfolio →
              </a>
            </div>
          )}
          
          {application.linkedInUrl && (
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded">
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-slate-400" />
                <span className="text-sm text-slate-300">LinkedIn</span>
              </div>
              <a
                href={application.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 text-sm"
              >
                View Profile →
              </a>
            </div>
          )}
          
          {application.githubUrl && (
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded">
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-slate-400" />
                <span className="text-sm text-slate-300">GitHub</span>
              </div>
              <a
                href={application.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 text-sm"
              >
                View Code →
              </a>
            </div>
          )}
          
          {!application.portfolioUrl && !application.linkedInUrl && !application.githubUrl && (
            <p className="text-sm text-slate-500 text-center py-4">No links provided</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      {/* Rating */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-4">Candidate Rating</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRatingChange(application.id, star)}
                className={`${
                  star <= application.rating ? 'text-yellow-400' : 'text-slate-600'
                } hover:text-yellow-300 transition-colors`}
              >
                <Star size={24} fill={star <= application.rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          <span className="text-lg font-medium text-slate-300">{application.rating}/5</span>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-slate-200">Assessment Notes</h3>
          <button
            onClick={() => setIsEditingNotes(!isEditingNotes)}
            className="px-3 py-1 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-2"
          >
            <Edit size={14} />
            {isEditingNotes ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        {isEditingNotes ? (
          <div className="space-y-4">
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-slate-200"
              placeholder="Add your assessment notes, interview feedback, strengths, concerns, etc..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleNotesUpdate}
                className="px-4 py-2 text-sm bg-lime-500 text-black rounded hover:bg-lime-400"
              >
                Save Notes
              </button>
              <button
                onClick={() => {
                  setNotes(application.notes);
                  setIsEditingNotes(false);
                }}
                className="px-4 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 rounded p-4 min-h-[100px]">
            {application.notes ? (
              <p className="text-sm text-slate-300 whitespace-pre-wrap">{application.notes}</p>
            ) : (
              <p className="text-sm text-slate-500 italic">No assessment notes yet. Click Edit to add notes.</p>
            )}
          </div>
        )}
      </div>

      {/* Interview Information */}
      {(application.interviewDate || application.interviewNotes) && (
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="font-medium text-slate-200 mb-4">Interview Information</h3>
          
          {application.interviewDate && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-slate-300">
                  {new Date(application.interviewDate).toLocaleDateString()} - {application.interviewType}
                </span>
              </div>
              {application.interviewer && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  <User size={16} className="text-slate-400" />
                  <span className="text-slate-300">Interviewer: {application.interviewer}</span>
                </div>
              )}
            </div>
          )}
          
          {application.interviewNotes && (
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Interview Notes</h4>
              <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-300">
                {application.interviewNotes}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Assessment Actions */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              setNewStatus('interview-scheduled');
              setShowStatusModal(true);
            }}
            className="py-2 text-sm bg-lime-500 text-black rounded hover:bg-lime-400"
          >
            Schedule Interview
          </button>
          <button
            onClick={() => {
              setNewStatus('offer-sent');
              setShowStatusModal(true);
            }}
            className="py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Send Offer
          </button>
          <button
            onClick={() => {
              setNewStatus('rejected');
              setShowStatusModal(true);
            }}
            className="py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-6">Application Timeline</h3>
        
        <div className="space-y-4">
          {/* Application Submitted */}
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-lime-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-200">Application Submitted</h4>
                <span className="text-xs text-slate-400">{new Date(application.appliedDate).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-400">Candidate applied for {application.jobTitle}</p>
            </div>
          </div>

          {/* Application Reviewed */}
          {application.status !== 'new' && (
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-lime-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-200">Application Reviewed</h4>
                  <span className="text-xs text-slate-400">{new Date(application.lastUpdated).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-400">Status changed to: {getStatusLabel(application.status)}</p>
              </div>
            </div>
          )}

          {/* Interview Scheduled */}
          {application.interviewDate && (
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-200">Interview Scheduled</h4>
                  <span className="text-xs text-slate-400">{new Date(application.interviewDate).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-400">{application.interviewType} with {application.interviewer}</p>
              </div>
            </div>
          )}

          {/* Current Status */}
          <div className="flex items-start gap-4">
            <div className={`w-3 h-3 rounded-full mt-2 ${
              ['hired', 'offer-sent'].includes(application.status) ? 'bg-green-400' :
              application.status === 'rejected' ? 'bg-red-400' :
              'bg-yellow-400'
            }`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-200">Current Status</h4>
                <span className="text-xs text-slate-400">Now</span>
              </div>
              <p className="text-sm text-slate-400">{getStatusLabel(application.status)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium text-slate-200 mb-4">Additional Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Referral Source:</span>
            <span className="text-slate-300">{application.referralSource || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Job ID:</span>
            <span className="text-slate-300">#{application.jobId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Application ID:</span>
            <span className="text-slate-300">#{application.id}</span>
          </div>
        </div>
        
        {application.additionalNotes && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Additional Notes</h4>
            <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-300">
              {application.additionalNotes}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-300"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-200">
                {application.firstName} {application.lastName}
              </h1>
              <p className="text-slate-400 text-sm">Application for {application.jobTitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(application.status)}`}>
              {getStatusLabel(application.status)}
            </span>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-4 py-2 text-sm bg-lime-500 text-black rounded hover:bg-lime-400"
            >
              Change Status
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'assessment', label: 'Assessment', icon: Star },
            { id: 'timeline', label: 'Timeline', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-lime-400 text-lime-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'assessment' && renderAssessment()}
          {activeTab === 'timeline' && renderTimeline()}
        </div>

        {/* Status Update Modal */}
        {showStatusModal && <StatusUpdateModal />}
      </div>
    </div>
  );
};