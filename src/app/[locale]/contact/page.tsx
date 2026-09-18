import { ContactBlock } from '@/components/ContactBlock';

export default function ContactPage() {
  // Nothing above the block: the photo starts right under the header.
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-bg-base md:min-h-[calc(100vh-5rem)]">
      <ContactBlock />
    </div>
  );
}
