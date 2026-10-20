import type { Metadata } from 'next';
import { ChatPlaceholder } from '@/features/chat/components/ChatPlaceholder';

export const metadata: Metadata = {
  title: 'Technical Chat (Beta) — HCM Engineering Portal',
  description: 'Technical troubleshooting assistant prototype for field and LIS integration engineers.',
};

export default function ChatPage() {
  return <ChatPlaceholder />;
}
