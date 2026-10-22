import type { Metadata } from 'next';
import { KnowledgeCatalogue } from '@/features/knowledge/components/KnowledgeCatalogue';

export const metadata: Metadata = {
  title: 'Tài Liệu Kỹ Thuật — Kỹ Thuật Phương Đông',
  description: 'Tra cứu cẩm nang kỹ thuật (Service Manual), đặc tả LIS và sơ đồ cáp theo ngành hàng thiết bị y tế Phương Đông.',
};

export default function KnowledgePage() {
  return <KnowledgeCatalogue />;
}
