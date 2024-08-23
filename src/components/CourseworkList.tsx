'use client'

import useStore from '@/app/store/useStore'

export default function CourseworkList() {
  const courseworks = useStore((state) => state.courseworks)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My coursework</h2>
      <div className="grid grid-cols-2 gap-4">
        {courseworks.map((coursework, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex space-x-4">
            <div className="w-16 h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{coursework.essayTitle}</h3>
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                <span>{coursework.subject}</span>
                <span>•</span>
                <span>{coursework.courseworkType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
