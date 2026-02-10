'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Invalid password');
        setLoading(false);
        return;
      }

      // Wait a moment for cookies to be set, then redirect
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-warm-light opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-warm-base opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-bg-elevated rounded-3xl shadow-2xl p-10 border-2 border-warm-accent">
          {/* Header */}
          <div className="mb-10">
            <h1 className="heading-script text-warm-darker mb-3 text-4xl">Admin</h1>
            <p className="text-warm-dark text-sm font-light tracking-wide">
              Manage your portfolio content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-warm-darker mb-3 tracking-wide">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker placeholder-warm-light/50 bg-bg-base transition-all"
                disabled={loading}
                autoFocus
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
              >
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-warm-darker to-warm-base text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase text-sm"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Enter Portal'
              )}
            </motion.button>
          </form>

          {/* Footer hint */}
          <p className="mt-8 text-center text-xs text-warm-light">
            For Natalia only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
