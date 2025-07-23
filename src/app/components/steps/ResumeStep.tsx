import React from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

interface ResumeStepProps {
  resume: File | null;
  onChange: (file: File | null) => void;
}

export const ResumeStep: React.FC<ResumeStepProps> = ({ resume, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    onChange(null);
  };

  return (
    <div className="space-y-8 form-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide mb-2">
          Resume Upload
        </h2>
        <p className="text-slate-400">
          Upload your professional resume as the source of truth for your profile
        </p>
      </div>

      <div className="card">
        {/* Upload Area */}
        <div className="mb-8">
          {!resume ? (
            <div className="border-2 border-dashed border-lime-400/50 rounded-lg p-8 text-center hover:border-lime-400 transition-all duration-200 bg-slate-900/30">
              <Upload className="mx-auto mb-4 text-lime-400" size={48} />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Upload Your Resume</h3>
              <p className="text-slate-400 mb-4">
                PDF format preferred, max 10MB. Will be parsed for professional information.
              </p>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="resume-upload"
                className="btn-primary inline-flex items-center gap-2 cursor-pointer"
              >
                <Upload size={20} />
                Choose Resume File
              </label>
              
              <div className="mt-4 text-xs text-slate-500">
                Supported formats: PDF, DOC, DOCX (Max 10MB)
              </div>
            </div>
          ) : (
            <div className="border border-lime-400/50 rounded-lg p-6 bg-lime-400/5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-lime-400/20 rounded-lg">
                    <FileText className="text-lime-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-medium flex items-center gap-2">
                      <Check className="text-lime-400" size={16} />
                      Resume Uploaded Successfully
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">
                      {resume.name}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {formatFileSize(resume.size)} • {resume.type || 'Unknown format'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <label
                    htmlFor="resume-replace"
                    className="btn-secondary px-4 py-2 text-sm cursor-pointer"
                  >
                    Replace
                  </label>
                  <button
                    onClick={removeFile}
                    className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-replace"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Processing Information */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-6">
          <h4 className="section-title">
            <AlertCircle size={20} />
            Resume Processing Information
          </h4>
          
          <div className="space-y-4 text-sm text-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-lime-400 mb-2">What we extract:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• Contact information</li>
                  <li>• Work experience and roles</li>
                  <li>• Education background</li>
                  <li>• Technical skills</li>
                  <li>• Certifications</li>
                  <li>• Professional achievements</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-lime-400 mb-2">Processing details:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• Parsed via AI-powered extraction</li>
                  <li>• Data stored securely</li>
                  <li>• Available for profile auto-fill</li>
                  <li>• Used for skill matching</li>
                  <li>• Cached for 24 hours</li>
                  <li>• JSON schema output</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for better parsing */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
          <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
            <FileText size={20} />
            Tips for Better Resume Parsing
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <h5 className="font-medium text-slate-200 mb-2">Format Guidelines:</h5>
              <ul className="space-y-1 text-slate-400">
                <li>• Use standard section headings</li>
                <li>• Keep formatting simple and clean</li>
                <li>• Use bullet points for lists</li>
                <li>• Include dates for experiences</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-slate-200 mb-2">Content Tips:</h5>
              <ul className="space-y-1 text-slate-400">
                <li>• List technical skills clearly</li>
                <li>• Include company names and titles</li>
                <li>• Add education details</li>
                <li>• Mention certifications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="text-center pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            🔒 Your resume is processed securely and used only for profile creation and job matching. 
            We do not share your resume with third parties without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};