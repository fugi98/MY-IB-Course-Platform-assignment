'use client'

import { useState } from 'react'
import useStore from '@/app/store/useStore'
import { FaCheck } from 'react-icons/fa' // Import the new icon for evaluation button

export default function CourseworkForm() {
  const [formData, setFormData] = useState({
    courseworkType: '',
    subject: '',
    essayTitle: '',
  })
  const addCoursework = useStore((state) => state.addCoursework)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCoursework(formData)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Select your course & subjects*</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <select
            name="courseworkType"
            value={formData.courseworkType}
            onChange={handleChange}
            required
            className="flex-1 p-2 border rounded-lg bg-white"
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
            className="flex-1 p-2 border rounded-lg bg-white"
          >
            <option value="">Subject</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="essayTitle">
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
            className="w-full p-2 border rounded-lg bg-white text-gray-500 placeholder-gray-300 focus:border-purple-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors"
        >
          <FaCheck className="text-white bg-gray-500 rounded-full p-1.5 mr-2" />
          <span>Evaluate your Score</span>
        </button>
      </form>
    </div>
  )
}
