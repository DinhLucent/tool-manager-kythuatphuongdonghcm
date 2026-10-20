import type { Metadata } from 'next';
import { BookingManager } from '@/features/booking/components/BookingManager';

export const metadata: Metadata = {
  title: 'Tool & Equipment Booking — HCM Engineering Portal',
  description: 'Field equipment custody tracking, checkouts and returns with double-booking prevention.',
};

export default function BookingPage() {
  return <BookingManager />;
}
