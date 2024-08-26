'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CombinedFileUploadAndForm from './FileUpload';
import MyCoursework from '@/components/CourseworkDetailsForm';
import ExploreCoursework from './ExploreCoursework';
import LeftSidebarContent from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';

const ClientOnlyMainContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleIconClick = (link: string) => {
    router.push(link);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-blue-100 relative">
      <LeftSidebarContent 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        handleIconClick={handleIconClick}
      />
      <main className={`flex-1 p-8 md:p-12 lg:p-16 ml-0 md:ml-16`}>
        <div className="flex justify-between items-center mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold md:hidden">
            Zu
          </div>
          <FaBars
            onClick={toggleSidebar}
            className={`text-2xl text-gray-600 md:hidden cursor-pointer transition-transform duration-300 ${sidebarOpen ? 'hidden' : 'block'}`}
          />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-2 mb-12">
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold mb-8">
                Hey IB Folks! Unsure about the quality of your answers?{' '}
                <span className="text-purple-600">We get you.</span>
              </h1>
              <CombinedFileUploadAndForm />
            </div>
            <div className="lg:w-1/3 hidden lg:flex items-start justify-center">
              <Image
                src="/images/img1.png"
                alt="Evaluate your Coursework"
                className="w-full h-auto object-contain"
                style={{ maxHeight: '35rem', top: '4rem', position: 'relative' }}
                width={500}
                height={400}
              />
            </div>
          </div>
          <div className="mb-12">
            <MyCoursework />
          </div>
          <div>
            <ExploreCoursework />
          </div>
        </div>
      </main>
      <RightSidebar windowWidth={windowWidth} />
    </div>
  );
};

export default ClientOnlyMainContent;