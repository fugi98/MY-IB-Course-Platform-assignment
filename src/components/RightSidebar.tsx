'use client';

import React, { useEffect, useState } from 'react';
import { FaFire, FaCalendar, FaCopy } from 'react-icons/fa';

interface RightSidebarProps {
  windowWidth: number;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ windowWidth }) => {
  const rightIcons: { Icon: React.ElementType; value: string; iconClass?: string }[] = [
    {
      Icon: () => (
        <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
          Zu
        </div>
      ),
      value: '120',
    },
    { Icon: FaFire, value: '24', iconClass: 'text-orange-500' },
    { Icon: FaCalendar, value: '' },
    { Icon: FaCopy, value: '' },
  ];

  return (
    <aside
      className={`py-6 fixed top-0 right-0 h-full max-w-xs z-30 ${windowWidth >= 600 ? 'block' : 'hidden'} sm:block lg:flex-col items-center`}
    >
      {rightIcons.map(({ Icon, value, iconClass }, index) => (
        <div key={index} className="mb-6 flex flex-col items-center">
          <div className="flex items-center">
            <Icon className={`text-xl mr-2 ${iconClass}`} />
            {value && <span className="text-sm font-semibold ml-2">{value}</span>}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default RightSidebar;
