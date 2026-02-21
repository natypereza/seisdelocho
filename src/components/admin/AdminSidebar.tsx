'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type AdminView = 'dashboard' | 'projects';

interface AdminSidebarProps {
  activeView: AdminView;
  onNavigate: (view: AdminView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

const navItems: { id: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
];

export default function AdminSidebar({
  activeView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onLogout,
}: AdminSidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="hidden lg:flex flex-col bg-bg-elevated border-r-2 border-warm-accent h-screen sticky top-0 overflow-hidden flex-shrink-0"
    >
      {/* Brand */}
      <div className="p-5 border-b-2 border-warm-accent/50 flex items-center justify-between min-h-[72px]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <img src="/n-logo-2.png" alt="6del8" className="h-8 w-auto" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-base mt-1">Portfolio Admin</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg text-warm-dark hover:bg-warm-light/30 hover:text-warm-darker transition-colors flex-shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 w-full rounded-xl transition-all group ${
                collapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
              } ${
                isActive
                  ? 'bg-warm-light/30 text-warm-darker font-semibold shadow-sm'
                  : 'text-warm-dark hover:bg-warm-light/20 hover:text-warm-darker'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-warm-darker' : ''}`} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm tracking-wide whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t-2 border-warm-accent/50 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 w-full rounded-xl text-warm-base hover:bg-warm-light/20 hover:text-warm-darker transition-colors ${
            collapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
          }`}
          title={collapsed ? 'View Site' : undefined}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs tracking-wide whitespace-nowrap"
              >
                View Site
              </motion.span>
            )}
          </AnimatePresence>
        </a>
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full rounded-xl text-warm-base hover:bg-red-50 hover:text-red-600 transition-colors ${
            collapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs tracking-wide whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
