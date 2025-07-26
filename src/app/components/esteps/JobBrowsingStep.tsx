// /src/app/components/esteps/JobBrowsingStep.tsx - Fixed without API dependencies
'use client'
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Star,
  Filter,
  ChevronDown,
  Eye,
  Heart,
  ExternalLink,
  Building,
  Calendar,
  Users
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  description: string;
  requirements: string[];
  benefits: string[];
  createdAt: string;
  applicationsCount: number;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  companySize: 'startup' | 'small' | 'medium' | 'large';
}

interface JobBrowsingProps {
  onApplyToJob: (job: Job) => void;
}

// Mock job data - replace with actual API call later
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    type: 'full-time',
    description: `We're looking for a Senior React Developer to join our growing team. You'll be responsible for building scalable web applications using modern React ecosystem including TypeScript, Next.js, and GraphQL.

Key Responsibilities:
• Lead frontend development of our core platform
• Mentor junior developers and conduct code reviews
• Collaborate with design and backend teams
• Implement responsive designs and optimize performance
• Write clean, maintainable, and well-tested code

We offer a collaborative environment where you can grow your skills and make a real impact on our product used by millions of users worldwide.`,
    requirements: [
      '5+ years of React development experience',
      'Strong TypeScript and JavaScript skills',
      'Experience with Next.js, Redux, or similar state management',
      'Familiarity with GraphQL and REST APIs',
      'Understanding of modern CSS frameworks (Tailwind, styled-components)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Strong communication and teamwork skills'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work arrangements and remote options',
      'Professional development budget ($2,500/year)',
      'Unlimited PTO policy',
      'Top-tier equipment and home office setup'
    ],
    createdAt: '2024-01-20',
    applicationsCount: 45,
    experienceLevel: 'senior',
    companySize: 'medium'
  },
  {
    id: '2',
    title: 'Full Stack Web Developer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    salary: '$90,000 - $130,000',
    type: 'full-time',
    description: `Join our fast-growing startup as a Full Stack Developer! You'll work on exciting projects using cutting-edge technologies and have the opportunity to shape our technical direction.

We're building the next generation of e-commerce tools that help small businesses compete with large retailers. Our stack includes React, Node.js, PostgreSQL, and AWS.

This role is perfect for someone who wants to wear multiple hats and contribute to all aspects of our product development.`,
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in React and Node.js',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of cloud platforms (AWS, GCP, or Azure)',
      'Understanding of RESTful APIs and microservices',
      'Familiarity with DevOps practices and CI/CD',
      'Startup mindset and ability to work in fast-paced environment'
    ],
    benefits: [
      'Competitive salary with equity upside',
      'Health and dental insurance',
      'Flexible working hours',
      'Remote-first culture',
      'Learning and development opportunities',
      'Catered lunches and snacks',
      'Annual team retreats'
    ],
    createdAt: '2024-01-18',
    applicationsCount: 32,
    experienceLevel: 'mid',
    companySize: 'startup'
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'DesignStudio Pro',
    location: 'Remote',
    salary: '$75,000 - $110,000',
    type: 'full-time',
    description: `We're seeking a talented Frontend Developer to join our creative team. You'll work closely with designers to bring beautiful, user-friendly interfaces to life.

Our projects range from corporate websites to complex web applications for clients in various industries including healthcare, finance, and entertainment.

The ideal candidate has a strong eye for design and understands how to translate creative concepts into functional, responsive web experiences.`,
    requirements: [
      '2+ years of frontend development experience',
      'Strong HTML, CSS, and JavaScript skills',
      'Experience with React or Vue.js',
      'Understanding of responsive design principles',
      'Familiarity with design tools (Figma, Sketch)',
      'Knowledge of CSS preprocessors and build tools',
      'Attention to detail and pixel-perfect implementation'
    ],
    benefits: [
      'Fully remote position',
      'Flexible working hours',
      'Health insurance stipend',
      'Professional development budget',
      'Modern equipment provided',
      'Collaborative and creative work environment',
      '25 days PTO + holidays'
    ],
    createdAt: '2024-01-15',
    applicationsCount: 67,
    experienceLevel: 'mid',
    companySize: 'small'
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'MobileFirst Inc.',
    location: 'New York, NY',
    salary: '$100,000 - $140,000',
    type: 'full-time',
    description: `Join our mobile development team to build amazing iOS and Android applications using React Native. We're working on consumer apps with millions of users.

You'll be responsible for developing new features, optimizing performance, and ensuring great user experiences across different devices and platforms.

This is a great opportunity to work with a experienced team and learn about mobile development best practices, app store optimization, and user analytics.`,
    requirements: [
      '3+ years of React Native development',
      'Experience with iOS and Android platforms',
      'Knowledge of mobile UI/UX principles',
      'Familiarity with app store deployment processes',
      'Understanding of mobile testing frameworks',
      'Experience with push notifications and analytics',
      'Strong problem-solving skills'
    ],
    benefits: [
      'Competitive salary and bonus structure',
      'Comprehensive benefits package',
      'Stock options',
      'Hybrid work model (3 days in office)',
      'State-of-the-art office in Manhattan',
      'Gym membership reimbursement',
      'Team building events and happy hours'
    ],
    createdAt: '2024-01-12',
    applicationsCount: 28,
    experienceLevel: 'mid',
    companySize: 'medium'
  },
  {
    id: '5',
    title: 'Web Developer Intern',
    company: 'LearnTech Academy',
    location: 'Boston, MA',
    salary: '$20 - $25/hour',
    type: 'part-time',
    description: `Great opportunity for students or recent graduates to gain hands-on experience in web development. You'll work on real projects while learning from experienced developers.

This internship covers both frontend and backend development, giving you exposure to the full web development lifecycle. Perfect for building your portfolio and gaining industry experience.

We're looking for someone eager to learn and contribute to our educational platform used by thousands of students worldwide.`,
    requirements: [
      'Currently pursuing or recently completed CS degree',
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with at least one modern framework (React, Vue, Angular)',
      'Understanding of version control (Git)',
      'Strong willingness to learn and adapt',
      'Good communication skills',
      'Available for 20-25 hours per week'
    ],
    benefits: [
      'Mentorship from senior developers',
      'Real-world project experience',
      'Flexible schedule around school',
      'Potential for full-time offer',
      'Access to learning resources',
      'Collaborative team environment',
      'Portfolio development opportunities'
    ],
    createdAt: '2024-01-10',
    applicationsCount: 89,
    experienceLevel: 'entry',
    companySize: 'small'
  },
  {
    id: '6',
    title: 'Lead Frontend Engineer',
    company: 'Enterprise Solutions Corp',
    location: 'Seattle, WA',
    salary: '$160,000 - $220,000',
    type: 'full-time',
    description: `We're looking for a Lead Frontend Engineer to drive the technical direction of our enterprise software platform. You'll lead a team of developers and architect scalable solutions.

Our platform serves Fortune 500 companies with complex data visualization and workflow management needs. This role requires both technical excellence and leadership skills.

You'll work closely with product managers, designers, and backend engineers to deliver high-quality software that meets enterprise standards for security, performance, and reliability.`,
    requirements: [
      '7+ years of frontend development experience',
      '2+ years of technical leadership experience',
      'Expert-level knowledge of React ecosystem',
      'Experience with enterprise-scale applications',
      'Strong understanding of software architecture',
      'Knowledge of performance optimization techniques',
      'Excellent communication and mentoring skills'
    ],
    benefits: [
      'Highly competitive salary and equity',
      'Premium health benefits',
      'Leadership development programs',
      'Conference and training budget',
      'Sabbatical program after 5 years',
      'On-site fitness center and cafeteria',
      'Relocation assistance available'
    ],
    createdAt: '2024-01-08',
    applicationsCount: 23,
    experienceLevel: 'lead',
    companySize: 'large'
  },
  {
    id: '7',
    title: 'Freelance UI/UX Developer',
    company: 'Creative Agency Co.',
    location: 'Remote',
    salary: '$50 - $80/hour',
    type: 'freelance',
    description: `We're seeking talented freelance UI/UX developers for various client projects. This is a great opportunity for experienced developers who want flexibility and variety in their work.

Projects range from simple landing pages to complex web applications. You'll work directly with our design team to implement pixel-perfect designs with smooth interactions and animations.

Perfect for developers who want to work with multiple clients and build a diverse portfolio while maintaining work-life balance.`,
    requirements: [
      '4+ years of frontend development experience',
      'Strong portfolio of UI/UX implementations',
      'Expertise in HTML, CSS, and JavaScript',
      'Experience with animation libraries (Framer Motion, GSAP)',
      'Understanding of design principles',
      'Ability to work independently',
      'Strong time management skills'
    ],
    benefits: [
      'Flexible working hours',
      'Competitive hourly rates',
      'Variety of interesting projects',
      'Long-term relationship potential',
      'Creative freedom in implementation',
      'Remote collaboration tools provided',
      'Opportunity to work with top-tier clients'
    ],
    createdAt: '2024-01-05',
    applicationsCount: 156,
    experienceLevel: 'senior',
    companySize: 'small'
  },
  {
    id: '8',
    title: 'JavaScript Developer',
    company: 'DataFlow Systems',
    location: 'Chicago, IL',
    salary: '$85,000 - $115,000',
    type: 'contract',
    description: `6-month contract position with potential for extension. We need a skilled JavaScript developer to help modernize our legacy systems and build new features.

You'll work on migrating old jQuery-based applications to modern frameworks and implementing new data visualization components using D3.js and other cutting-edge libraries.

This is perfect for developers who enjoy solving complex technical challenges and working with large datasets in a fast-paced environment.`,
    requirements: [
      '4+ years of JavaScript development experience',
      'Experience with legacy system modernization',
      'Knowledge of data visualization libraries (D3.js, Chart.js)',
      'Understanding of build tools and bundlers',
      'Experience with SQL databases',
      'Strong debugging and problem-solving skills',
      'Ability to work in existing codebases'
    ],
    benefits: [
      'Competitive contract rates',
      'Potential for permanent position',
      'Flexible working arrangements',
      'Access to cutting-edge tools',
      'Collaborative team environment',
      'Professional development opportunities',
      'Downtown Chicago office location'
    ],
    createdAt: '2024-01-03',
    applicationsCount: 41,
    experienceLevel: 'senior',
    companySize: 'medium'
  }
];

export const JobBrowsingStep: React.FC<JobBrowsingProps> = ({ onApplyToJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [salaryRange, setSalaryRange] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [companySize, setCompanySize] = useState('all');
  const [postedDays, setPostedDays] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('relevance');

  const itemsPerPage = 6;

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
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

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = mockJobs.filter(job => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Location filter
      const matchesLocation = !location || 
        job.location.toLowerCase().includes(location.toLowerCase());

      // Job type filter
      const matchesJobType = jobType === 'all' || job.type === jobType;

      // Experience level filter
      const matchesExperience = experienceLevel === 'all' || job.experienceLevel === experienceLevel;

      // Company size filter
      const matchesCompanySize = companySize === 'all' || job.companySize === companySize;

      // Posted days filter
      const daysAgo = getDaysAgo(job.createdAt);
      const matchesPostedDays = postedDays === 'all' || 
        (postedDays === '1' && daysAgo <= 1) ||
        (postedDays === '7' && daysAgo <= 7) ||
        (postedDays === '30' && daysAgo <= 30);

      // Salary range filter (simplified)
      const matchesSalary = salaryRange === 'all' || 
        (salaryRange === '0-50k' && job.salary.includes('$20') || job.salary.includes('$25') || job.salary.includes('$30')) ||
        (salaryRange === '50k-100k' && (job.salary.includes('$75') || job.salary.includes('$85') || job.salary.includes('$90'))) ||
        (salaryRange === '100k-150k' && (job.salary.includes('$100') || job.salary.includes('$110') || job.salary.includes('$120') || job.salary.includes('$130') || job.salary.includes('$140'))) ||
        (salaryRange === '150k+' && (job.salary.includes('$160') || job.salary.includes('$180') || job.salary.includes('$220')));

      return matchesSearch && matchesLocation && matchesJobType && 
             matchesExperience && matchesCompanySize && matchesPostedDays && matchesSalary;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'salary':
          // Simple salary comparison (would need more sophisticated parsing in real app)
          const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bSalary - aSalary;
        case 'company':
          return a.company.localeCompare(b.company);
        case 'relevance':
        default:
          // Simple relevance: prioritize exact title matches, then description matches
          const aScore = (searchTerm && a.title.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                        (searchTerm && a.description.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
          const bScore = (searchTerm && b.title.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                        (searchTerm && b.description.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
          return bScore - aScore;
      }
    });

    return filtered;
  }, [searchTerm, location, jobType, salaryRange, experienceLevel, companySize, postedDays, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, location, jobType, salaryRange, experienceLevel, companySize, postedDays]);

  const JobCard = ({ job }: { job: Job }) => (
    <div className="bg-slate-800 rounded-lg p-6 hover:border hover:border-lime-400/50 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-200 hover:text-lime-400 cursor-pointer"
                onClick={() => setSelectedJob(job)}>
              {job.title}
            </h3>
            <button
              onClick={() => handleSaveJob(job.id)}
              className={`p-2 rounded-full transition-colors ${
                savedJobs.has(job.id)
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Heart size={18} fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Building size={14} />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={14} />
              {job.salary}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getJobTypeColor(job.type)}`}>
              {formatJobType(job.type)}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={12} />
              Posted {getDaysAgo(job.createdAt)}d ago
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Users size={12} />
              {job.applicationsCount} applicants
            </span>
          </div>

          <p className="text-sm text-slate-300 mb-4 line-clamp-2">
            {job.description.substring(0, 150)}...
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedJob(job)}
                className="px-3 py-1 text-xs bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center gap-1"
              >
                <Eye size={12} />
                View Details
              </button>
              <button
                onClick={() => onApplyToJob(job)}
                className="px-3 py-1 text-xs bg-lime-500 text-black rounded hover:bg-lime-400 flex items-center gap-1"
              >
                <ExternalLink size={12} />
                Apply Now
              </button>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              {getDaysAgo(job.createdAt)}d ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const JobDetailModal = ({ job, onClose }: { job: Job; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-200 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <Building size={16} />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} />
                  {job.salary}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getJobTypeColor(job.type)}`}>
                  {formatJobType(job.type)}
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

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => {
                onApplyToJob(job);
                onClose();
              }}
              className="px-6 py-3 bg-lime-500 text-black rounded font-medium hover:bg-lime-400 flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Apply for this Job
            </button>
            <button
              onClick={() => handleSaveJob(job.id)}
              className={`px-6 py-3 rounded font-medium flex items-center gap-2 ${
                savedJobs.has(job.id)
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              <Heart size={16} fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
              {savedJobs.has(job.id) ? 'Saved' : 'Save Job'}
            </button>
          </div>

          {/* Job Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-200 mb-3">Job Description</h2>
              <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                {job.description}
              </div>

              <h2 className="text-lg font-semibold text-slate-200 mb-3">Requirements</h2>
              <ul className="space-y-2 mb-6">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300">
                    <span className="text-lime-400 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>

              <h2 className="text-lg font-semibold text-slate-200 mb-3">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300">
                    <span className="text-green-400 mt-1">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-lg p-4 sticky top-4">
                <h3 className="font-semibold text-slate-200 mb-4">Job Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Job Type:</span>
                    <span className="text-slate-200 ml-2">{formatJobType(job.type)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Experience Level:</span>
                    <span className="text-slate-200 ml-2 capitalize">{job.experienceLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Salary:</span>
                    <span className="text-slate-200 ml-2">{job.salary}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200 ml-2">{job.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Company Size:</span>
                    <span className="text-slate-200 ml-2 capitalize">{job.companySize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Posted:</span>
                    <span className="text-slate-200 ml-2">{getDaysAgo(job.createdAt)} days ago</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Applicants:</span>
                    <span className="text-slate-200 ml-2">{job.applicationsCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Job Title Search */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Title or Keyword
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="e.g. React Developer, Product Manager"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Location Search */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="City, State or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Job Type Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          {/* Salary Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Salary Range
            </label>
            <select
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
            >
              <option value="all">Any Salary</option>
              <option value="0-50k">$0 - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value="100k-150k">$100k - $150k</option>
              <option value="150k+">$150k+</option>
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="md:col-span-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full p-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 flex items-center justify-center gap-1"
            >
              <Filter size={16} />
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Experience Level
                </label>
                <select 
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
                >
                  <option value="all">Any Experience</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead/Principal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Size
                </label>
                <select 
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
                >
                  <option value="all">Any Size</option>
                  <option value="startup">Startup (1-50)</option>
                  <option value="small">Small (51-200)</option>
                  <option value="medium">Medium (201-1000)</option>
                  <option value="large">Large (1000+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Posted
                </label>
                <select 
                  value={postedDays}
                  onChange={(e) => setPostedDays(e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200"
                >
                  <option value="all">Any Time</option>
                  <option value="1">Last 24 hours</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-200">
            {filteredAndSortedJobs.length > 0 ? `${filteredAndSortedJobs.length} Jobs Found` : 'No Jobs Found'}
          </h2>
          {(searchTerm || location) && (
            <p className="text-slate-400 text-sm mt-1">
              {searchTerm && `for "${searchTerm}"`}
              {searchTerm && location && ' '}
              {location && `in ${location}`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date Posted</option>
            <option value="salary">Salary</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      {paginatedJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-200 mb-2">No jobs found</h3>
          <p className="text-slate-400 mb-4">
            Try adjusting your search criteria or browse all available positions.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setLocation('');
              setJobType('all');
              setSalaryRange('all');
              setExperienceLevel('all');
              setCompanySize('all');
              setPostedDays('all');
            }}
            className="px-4 py-2 bg-lime-500 text-black rounded hover:bg-lime-400"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button 
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + Math.max(1, currentPage - 2);
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded ${
                      pageNum === currentPage
                        ? 'bg-lime-400/20 text-lime-300'
                        : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};