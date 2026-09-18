import { ContactBlock } from '@/components/ContactBlock';

export default function ContactPage() {
  // Nothing above the block: the photo starts right under the header.
  return (
    // The photo sets the height; no forced full screen, so there is no cream
    // gap under a wide crop.
    <div className="bg-bg-base">
      <ContactBlock />
    </div>
  );
}
