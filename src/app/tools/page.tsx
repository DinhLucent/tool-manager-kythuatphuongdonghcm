import type { Metadata } from 'next';
import { ToolCatalogue } from '@/features/tools/components/ToolCatalogue';

export const metadata: Metadata = {
  title: 'Phần Mềm & Công Cụ — Kỹ Thuật Phương Đông',
  description: 'Tải bộ cài đặt phần mềm, công cụ kết nối LIS và script kiểm tra chẩn đoán kỹ thuật Phương Đông.',
};

export default function ToolsPage() {
  return <ToolCatalogue />;
}
