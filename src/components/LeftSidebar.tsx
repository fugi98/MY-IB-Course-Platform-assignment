'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaBook, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';

const useRouter = dynamic(() => import('next/router').then(mod => mod.useRouter), { ssr: false });

interface LeftSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();

  const handleIconClick = (link: string) => {
    router.push(link);
  };

  const leftIcons: { Icon: IconType; link: string; iconClass?: string }[] = [
    { Icon: BsGrid3X3Gap, link: '/dashboard', iconClass: 'bg-purple-600 text-white' },
    { Icon: FaBook, link: '/courses' },
    { Icon: FaFileAlt, link: '/files' },
    { Icon: FaQuestionCircle, link: '/help' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-90 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`flex flex-col items-center py-8 space-y-4 fixed top-0 left-0 h-full z-20 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${sidebarOpen ? 'w-full bg-gray-900 bg-opacity-90' : 'w-16 bg-white'
          } md:w-16 md:bg-white md:bg-opacity-100 md:translate-x-0`}
      >
        <div className="w-8 h-8 bg-purple-600 py-auto space-y-4 rounded-full flex items-center hidden justify-center text-white text-center font-bold md:block">
          Zu
        </div>
        <FaTimes
          onClick={toggleSidebar}
          className={`text-2xl text-white-800 cursor-pointer transition-transform duration-300 md:hidden ${sidebarOpen ? 'absolute top-4 right-4' : 'hidden'}`}
        />
        {leftIcons.map(({ Icon, link, iconClass }, index) => (
          <button
            key={index}
            onClick={() => handleIconClick(link)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors ${iconClass ? iconClass : 'bg-gray-100 text-gray-600'}`}
          >
            <Icon className="text-2xl" />
          </button>
        ))}
      </aside>
    </>
  );
};

export default LeftSidebar;
