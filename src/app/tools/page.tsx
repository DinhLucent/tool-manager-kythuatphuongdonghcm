import type { Metadata } from 'next';
import { ToolCatalogue } from '@/features/tools/components/ToolCatalogue';

export const metadata: Metadata = {
  title: 'Engineering Tools — HCM Engineering Portal',
  description: 'Download verified software utilities, LIS connection bridges, and serial drivers with SHA-256 verification.',
};

export default function ToolsPage() {
  return <ToolCatalogue />;
}
