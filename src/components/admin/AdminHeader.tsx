'use client';

import { Menu, ExternalLink } from 'lucide-react';
import type { AdminView } from './AdminSidebar';

interface AdminHeaderProps {
  title: string;
  activeView: AdminView;
  onToggleMobileMenu: () => void;
}

const viewTitles: Record<AdminView, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
};

export default function AdminHeader({ activeView, onToggleMobileMenu }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-bg-elevated/80 backdrop-blur-md border-b-2 border-warm-accent/50">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-warm-dark hover:bg-warm-light/30 hover:text-warm-darker transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile brand */}
          <h1 className="lg:hidden heading-script text-warm-darker text-xl">6del8</h1>

          {/* Page title */}
          <div className="hidden lg:block">
            <h2 className="heading-creative text-2xl">{viewTitles[activeView]}</h2>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-warm-base hover:text-warm-darker hover:bg-warm-light/20 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">View Site</span>
        </a>
      </div>
    </header>
  );
}
