'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ContactBlock } from '@/components/ContactBlock';

export default function ContactPage() {

  return (
    // The block carries its own photo now, so the page around it takes the
    // page colour and still fills the viewport.
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-bg-base md:min-h-[calc(100vh-5rem)]">
      {/* w-full: container-custom carries mx-auto, which in a flex column would
          shrink-wrap this block and centre it instead of stretching it. */}
      <div className="w-full container-custom pt-5 md:pt-7">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-warm-dark transition-colors hover:text-warm-darker"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex flex-1 items-center">
        <div className="w-full">
          <ContactBlock />
        </div>
      </div>
    </div>
  );
}
