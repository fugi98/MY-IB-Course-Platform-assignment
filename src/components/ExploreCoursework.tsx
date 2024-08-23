'use client'

import { useState } from 'react'

const DUMMY_DATA = [
  { title: "How does the temperature of a Copper...", subject: "Physics HL", readTime: "18 min read", wordCount: "2388 words" },
  { title: "The impact of globalization on local...", subject: "Economics HL", readTime: "22 min read", wordCount: "2756 words" },
  { title: "Analysis of themes in Shakespeare's...", subject: "English Literature", readTime: "25 min read", wordCount: "3102 words" },
  { title: "The role of enzymes in cellular mechanisms...", subject: "Biology HL", readTime: "20 min read", wordCount: "2510 words" },
]

export default function ExploreCoursework() {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'IA Example', 'EE Example', 'IO Example', 'TOK Example']

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4 sm:text-2xl lg:text-3xl">Explore Coursework</h2>
      <div className="flex flex-wrap border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-3 sm:px-4 text-sm sm:text-base ${
              activeTab === tab
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DUMMY_DATA.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-16 h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg">{item.title}</h3>
              <div className="mt-2 flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{item.subject}</span>
                <span>•</span>
                <span>{item.readTime}</span>
                <span>•</span>
                <span>{item.wordCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
