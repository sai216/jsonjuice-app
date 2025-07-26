import React from 'react';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Define the EmployerStep union type
type EmployerStep = 'dashboard' | 'post-job' | 'manage-jobs' | 'applications' | 'analytics';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: 'active' | 'draft' | 'closed';
  applications: number;
  posted: string;
  deadline: string;
  category?: string;
  subcategory?: string;
}

interface ManageJobsStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<EmployerStep>>;
}

export const ManageJobsStep: React.FC<ManageJobsStepProps> = ({ setCurrentStep }) => {
  const jobPosts: JobPosting[] = [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $180k',
      status: 'active',
      applications: 45,
      posted: '2024-01-15',
      deadline: '2024-02-15',
      category: 'Full-Stack',
      subcategory: 'Frontend Specialist'
    },
    {
      id: 2,
      title: 'Web3 Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      type: 'Full-time',
      salary: '$100k - $150k',
      status: 'active',
      applications: 32,
      posted: '2024-01-10',
      deadline: '2024-02-10',
      category: 'Web3',
      subcategory: 'DApp Developer'
    },
    {
      id: 3,
      title: 'Filmmaker / Storyteller',
      department: 'Creative',
      location: 'Los Angeles',
      type: 'Full-time',
      salary: '$75k - $110k',
      status: 'active',
      applications: 28,
      posted: '2024-01-18',
      deadline: '2024-02-18',
      category: 'Creative',
      subcategory: 'Storyteller'
    },
    {
      id: 4,
      title: 'Product Designer',
      department: 'Design',
      location: 'Hybrid',
      type: 'Full-time',
      salary: '$90k - $130k',
      status: 'closed',
      applications: 22,
      posted: '2023-12-01',
      deadline: '2024-01-01',
      category: 'Creative',
      subcategory: 'Visual Designer'
    },
    {
      id: 5,
      title: 'Smart Contract Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $120k',
      status: 'draft',
      applications: 0,
      posted: '2024-01-22',
      deadline: '2024-02-22',
      category: 'Web3',
      subcategory: 'Smart Contract Developer'
    },
    {
      id: 6,
      title: 'Technical Marketing Manager',
      department: 'Marketing',
      location: 'New York',
      type: 'Full-time',
      salary: '$85k - $125k',
      status: 'active',
      applications: 19,
      posted: '2024-01-20',
      deadline: '2024-02-20',
      category: 'Marketing',
      subcategory: 'Technical Marketing'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400">Manage Job Posts</h2>
        <button
          onClick={() => setCurrentStep('post-job')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Post New Job
        </button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search jobs..."
                className="input-field pl-10 w-64"
              />
            </div>
            <select className="input-field w-auto">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
            <select className="input-field w-auto">
              <option>All Categories</option>
              <option>Full-Stack</option>
              <option>Web3</option>
              <option>Creative</option>
              <option>Marketing</option>
              <option>Executive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Job Title</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Department</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Location</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Salary</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Applications</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((job) => (
                <tr key={job.id} className="border-b border-slate-800 hover:bg-slate-950/40">
                  <td className="py-4 px-4">
                    <div>
                      <h4 className="font-medium text-slate-200">{job.title}</h4>
                      <p className="text-xs text-slate-400">Posted {job.posted}</p>
                      <p className="text-xs text-slate-500">Deadline: {job.deadline}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="px-2 py-1 bg-lime-400/20 text-lime-300 text-xs rounded font-medium">
                        {job.category}
                      </span>
                      {job.subcategory && (
                        <p className="text-xs text-slate-400 mt-1">{job.subcategory}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{job.department}</td>
                  <td className="py-4 px-4 text-slate-300">{job.location}</td>
                  <td className="py-4 px-4 text-slate-300">{job.salary}</td>
                  <td className="py-4 px-4">
                    <span className="text-lime-400 font-medium">{job.applications}</span>
                    {job.applications > 0 && (
                      <p className="text-xs text-slate-400">applicants</p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      job.status === 'active' ? 'bg-green-400/20 text-green-300' :
                      job.status === 'draft' ? 'bg-yellow-400/20 text-yellow-300' :
                      'bg-gray-400/20 text-gray-300'
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors" title="View Job">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors" title="Edit Job">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 rounded hover:bg-red-900/20 transition-colors" title="Delete Job">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <div className="flex justify-between items-center text-sm text-slate-400">
            <span>Showing {jobPosts.length} job posts</span>
            <div className="flex gap-6">
              <span>Active: <span className="text-green-400 font-medium">{jobPosts.filter(job => job.status === 'active').length}</span></span>
              <span>Draft: <span className="text-yellow-400 font-medium">{jobPosts.filter(job => job.status === 'draft').length}</span></span>
              <span>Closed: <span className="text-gray-400 font-medium">{jobPosts.filter(job => job.status === 'closed').length}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
