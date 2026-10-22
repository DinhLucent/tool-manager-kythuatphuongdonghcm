import type { Metadata } from 'next';
import { ChatPlaceholder } from '@/features/chat/components/ChatPlaceholder';

export const metadata: Metadata = {
  title: 'Chat Kỹ Thuật — Kỹ Thuật Phương Đông',
  description: 'Trợ lý AI hỗ trợ tra cứu kỹ thuật y sinh (bản giới thiệu tính năng dành cho Đội kỹ thuật Miền Trung & Miền Nam).',
};

export default function ChatPage() {
  return <ChatPlaceholder />;
}
