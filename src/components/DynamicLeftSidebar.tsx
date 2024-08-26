'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
import LeftSidebarContent from '@/components/LeftSidebar';

const LeftSidebar: React.FC<{ sidebarOpen: boolean; toggleSidebar: () => void }> = (props) => {
  const router = useRouter();

  const handleIconClick = (link: string) => {
    router.push(link);
  };

  return <LeftSidebarContent {...props} handleIconClick={handleIconClick} />;
};

const DynamicLeftSidebar = dynamic(() => Promise.resolve(LeftSidebar), { ssr: false });

export default DynamicLeftSidebar;
