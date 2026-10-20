export type EquipmentStatus = 'available' | 'in_use' | 'maintenance';

export type EquipmentCategory = 
  | 'interface_converter' 
  | 'calibrator' 
  | 'measuring' 
  | 'toolkit';

export type BookingStatus = 'active' | 'returned' | 'cancelled';

export interface EquipmentItem {
  id: string;
  assetCode: string;
  name: string;
  category: EquipmentCategory;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  description: string;
  currentBookingId?: string;
  currentBorrowerName?: string;
}

export interface BookingRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  assetCode: string;
  engineerId: string;
  engineerName: string;
  siteName: string;
  purpose: string;
  checkoutDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: BookingStatus;
  notes?: string;
}

export interface CheckoutPayload {
  equipmentId: string;
  engineerId: string;
  engineerName: string;
  siteName: string;
  purpose: string;
  expectedReturnDate: string;
  notes?: string;
}
