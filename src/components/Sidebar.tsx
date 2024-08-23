import { Icon } from '@iconify/react'

export default function Sidebar() {
  const icons = ['grid-4', 'book-open', 'file-text', 'help-circle']

  return (
    <aside className="w-16 bg-white shadow-md flex flex-col items-center py-4 space-y-6">
      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
        Zu
      </div>
      {icons.map((icon, index) => (
        <button key={index} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
          <Icon icon={icon} width="24" height="24" />
        </button>
      ))}
    </aside>
  )
}