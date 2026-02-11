'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin cookie exists
    const hasCookie = document.cookie.includes('admin-auth=true');
    if (!hasCookie) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-warm-darker">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <AdminShell />;
}
