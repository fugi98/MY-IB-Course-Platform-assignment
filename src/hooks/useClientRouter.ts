'use client';

import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

export const useClientRouter = (): NextRouter | null => {
  const router = useRouter();
  const [clientRouter, setClientRouter] = useState<NextRouter | null>(null);

  useEffect(() => {
    // Set the router once the component is mounted
    setClientRouter(router);
  }, [router]); // Add router to the dependency array

  return clientRouter;
};
