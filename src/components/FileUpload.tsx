'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStore from '@/app/store/useStore';
import '@/styles/globals.css';
import { FaUpload, FaCheck, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CombinedFileUploadAndForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadMessage, setShowUploadMessage] = useState(false); // Added state for upload message
  const [formData, setFormData] = useState({
    courseworkType: '',
    subject: '',
    essayTitle: '',
  });
  const addFile = useStore((state) => state.addFile);
  const addCoursework = useStore((state) => state.addCoursework);
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        setIsUploading(true);
        setTimeout(() => {
          // Simulating file upload time
          setFile(acceptedFiles[0]);
          addFile(acceptedFiles[0]);
          setIsUploading(false);
        }, 2000);
      }
    },
    [addFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 25 * 1024 * 1024, // 25MB
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      // If no file is uploaded, show an error message
      setShowUploadMessage(true);
      setTimeout(() => setShowUploadMessage(false), 3000); // Hide message after 3 seconds
      return;
    }
    addCoursework(formData);
    router.push('/evaluation'); // This should match the folder name in app/
  };

  return (
    <div className="relative px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm space-y-4 md:space-y-6 mt-6 md:mt-8">
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center ${
            isDragActive ? 'bg-blue-50' : ''
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-600 text-2xl sm:text-3xl" />
          <div className="mt-4 sm:mt-8">
            {isUploading ? (
              <FaSpinner className="text-2xl sm:text-3xl text-blue-600 animate-spin mx-auto" />
            ) : file ? (
              <p className="text-sm sm:text-base">{file.name}</p>
            ) : (
              <>
                <p className="text-gray-600 text-sm sm:text-base">Drag and drop a PDF</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Limit 25 MB per file</p>
              </>
            )}
          </div>
          {!file && !isUploading && (
            <button
              className="mt-4 sm:mt-6 px-4 py-2 bg-white border-2 border-gray-300 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              Upload your file
            </button>
          )}
        </div>
        <div className="sm:p-2 md:p-2 rounded-lg shadow-sm">
          <h2 className="text-md sm:text-lg font-semibold mb-4">Select your course & subjects*</h2>
          <form onSubmit={handleSubmit} className="md:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <select
                name="courseworkType"
                value={formData.courseworkType}
                onChange={handleChange}
                required
                className="flex-1 p-2 border border-gray-300 rounded-full bg-white-800 text-black text-sm sm:text-base"
              >
                <option value="">Coursework Type</option>
                <option value="essay">Essay</option>
                <option value="report">Report</option>
              </select>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="flex-1 p-2 border border-gray-300 rounded-full bg-white-800 text-black text-sm sm:text-base"
              >
                <option value="">Subject</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base" htmlFor="essayTitle">
                Enter your essay title* (Required)
              </label>
              <input
                id="essayTitle"
                type="text"
                name="essayTitle"
                value={formData.essayTitle}
                onChange={handleChange}
                placeholder="How nation works..."
                required
                className="w-2/3 p-2 border border-yellow-400 rounded-full bg-white text-gray-500 placeholder-gray-300 focus:border-blue-500 transition-colors text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="w-2/3 px-4 py-2 bg-gray-400 text-gray-700 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              <FaCheck className="text-white bg-gray-500 rounded-full p-1.5 mr-2" />
              <span>Evaluate your Score</span>
            </button>
          </form>
          {showUploadMessage && (
            <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <FaExclamationCircle className="mr-2" />
              <span>Please upload a file before proceeding.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
