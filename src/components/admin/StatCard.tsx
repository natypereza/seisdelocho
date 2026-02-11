'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, label, value, subtitle, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-bg-elevated rounded-2xl border-2 border-warm-accent p-6 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warm-light/40 to-warm-accent/40 flex items-center justify-center">
          <Icon className="w-5 h-5 text-warm-darker" />
        </div>
      </div>
      <p className="text-2xl font-bold text-warm-darker mb-1">{value}</p>
      <p className="text-sm font-medium text-warm-dark uppercase tracking-wide">{label}</p>
      {subtitle && <p className="text-xs text-warm-base mt-1">{subtitle}</p>}
    </motion.div>
  );
}
