import type { Metadata } from 'next';
import { KnowledgeCatalogue } from '@/features/knowledge/components/KnowledgeCatalogue';

export const metadata: Metadata = {
  title: 'Knowledge Base — HCM Engineering Portal',
  description: 'Search technical service manuals, wiring schematics, and ASTM/HL7 interface specifications.',
};

export default function KnowledgePage() {
  return <KnowledgeCatalogue />;
}
