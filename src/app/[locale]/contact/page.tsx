'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ContactBlock } from '@/components/ContactBlock';

export default function ContactPage() {
  const locale = useLocale();

  return (
    // The block is black edge to edge, so the whole page goes black and fills
    // the viewport rather than leaving a pale strip under it.
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-black md:min-h-[calc(100vh-5rem)]">
      {/* w-full: container-custom carries mx-auto, which in a flex column would
          shrink-wrap this block and centre it instead of stretching it. */}
      <div className="w-full container-custom pt-5 md:pt-7">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-peach/70 transition-colors hover:text-peach"
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
