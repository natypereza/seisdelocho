'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 bg-bg-elevated rounded-2xl border-2 border-dashed border-warm-light"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-warm-light/20 flex items-center justify-center">
        <Icon className="w-7 h-7 text-warm-dark" />
      </div>
      <h3 className="heading-creative text-xl mb-2">{title}</h3>
      <p className="text-warm-dark text-sm max-w-xs mx-auto">{description}</p>
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-warm-darker to-warm-base text-white font-semibold rounded-xl hover:shadow-lg transition-all uppercase text-sm tracking-wide"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
