'use client';

import { motion } from 'framer-motion';

interface DeleteModalProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  title = 'Delete Project?',
  message = 'This action cannot be undone.',
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-bg-elevated rounded-2xl p-8 max-w-sm w-full border-2 border-warm-accent shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="heading-creative text-xl mb-3">{title}</h3>
        <p className="text-warm-dark text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors text-sm"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-warm-light text-warm-darker font-medium rounded-xl hover:bg-warm-light/30 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
