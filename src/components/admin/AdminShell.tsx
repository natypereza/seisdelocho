'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ToastProvider from './ToastProvider';
import AdminSidebar, { type AdminView } from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardView from './DashboardView';
import ProjectsView from './ProjectsView';

export default function AdminShell() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  const handleNavigate = (view: AdminView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg-base flex">
        {/* Desktop Sidebar */}
        <AdminSidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={handleLogout}
        />

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-[260px] z-50 lg:hidden bg-bg-elevated border-r-2 border-warm-accent shadow-2xl flex flex-col"
              >
                {/* Mobile Brand */}
                <div className="p-5 border-b-2 border-warm-accent/50">
                  <img src="/N.svg" alt="6del8" className="h-8 w-auto" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-warm-base mt-1">Portfolio Admin</p>
                </div>

                {/* Mobile Nav */}
                <nav className="flex-1 p-3 space-y-1">
                  {([
                    { id: 'dashboard' as const, label: 'Dashboard', icon: '📊' },
                    { id: 'projects' as const, label: 'Projects', icon: '📁' },
                  ]).map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm ${
                          isActive
                            ? 'bg-warm-light/30 text-warm-darker font-semibold'
                            : 'text-warm-dark hover:bg-warm-light/20'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Bottom Actions */}
                <div className="p-3 border-t-2 border-warm-accent/50 space-y-1">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-warm-base hover:bg-warm-light/20 text-xs"
                  >
                    View Site
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-warm-base hover:bg-red-50 hover:text-red-600 text-xs"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <AdminHeader
            title={activeView === 'dashboard' ? 'Dashboard' : 'Projects'}
            activeView={activeView}
            onToggleMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DashboardView onNavigate={setActiveView} />
                </motion.div>
              )}
              {activeView === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectsView />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
