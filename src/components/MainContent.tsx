import dynamic from 'next/dynamic';

// Dynamically import ClientOnlyMainContent with client-side rendering only
const ClientOnlyMainContent = dynamic(() => import('./ClientOnlyMainContent'), {
  ssr: false,
});

const MainContent: React.FC = () => {
  return <ClientOnlyMainContent />;
};

export default MainContent;
