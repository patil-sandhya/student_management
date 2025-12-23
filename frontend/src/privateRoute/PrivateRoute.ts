'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: React.ReactNode;
}

// private route component to protect routes from unauthenticated access
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const checkAuthentication = async () => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      router.push('/');
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  return children;
};

export default PrivateRoute;