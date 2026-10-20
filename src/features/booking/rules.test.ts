import { describe, it, expect } from 'vitest';
import { canCheckout, executeCheckout, canReturn, executeReturn } from './rules';
import { EquipmentItem, BookingRecord, CheckoutPayload } from './types';

describe('Equipment Booking Business Rules & Double-Booking Prevention', () => {
  const sampleEquipment: EquipmentItem = {
    id: 'eq-001',
    assetCode: 'EQ-HCM-001',
    name: 'Moxa UPort 1150 USB-to-Serial Converter',
    category: 'interface_converter',
    serialNumber: 'MOX-1150-8849',
    status: 'available',
    location: 'HCM Cabinet A',
    description: 'RS-232/422/485 1-port converter for analyzer connection',
  };

  const validPayload: CheckoutPayload = {
    equipmentId: 'eq-001',
    engineerId: 'eng-14',
    engineerName: 'Lê Hoàng Nam',
    siteName: 'Bệnh viện Chợ Rẫy (Khoa Hóa Sinh)',
    purpose: 'Cài đặt và nghiệm thu đường truyền LIS Cobas c501',
    expectedReturnDate: '2026-12-31T18:00:00Z',
    notes: 'Mang theo cáp DB9-RJ45',
  };

  describe('canCheckout()', () => {
    it('allows checkout when equipment is available and has no active bookings', () => {
      const activeBookings: BookingRecord[] = [];
      const result = canCheckout(sampleEquipment, activeBookings, validPayload);
      expect(result.allowed).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('PREVENTS DOUBLE CHECKOUT if another active booking exists for the same equipment', () => {
      const existingActiveBooking: BookingRecord = {
        id: 'bk-existing',
        equipmentId: 'eq-001',
        equipmentName: sampleEquipment.name,
        assetCode: sampleEquipment.assetCode,
        engineerId: 'eng-02',
        engineerName: 'Nguyễn Văn A',
        siteName: 'BV Đại học Y Dược',
        purpose: 'Khắc phục lỗi cổng COM',
        checkoutDate: '2026-10-18T08:00:00Z',
        expectedReturnDate: '2026-10-22T18:00:00Z',
        status: 'active',
      };

      const result = canCheckout(sampleEquipment, [existingActiveBooking], validPayload);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Double-booking rejected');
    });

    it('rejects checkout when equipment status is in_use', () => {
      const inUseEquipment: EquipmentItem = {
        ...sampleEquipment,
        status: 'in_use',
        currentBorrowerName: 'Nguyễn Văn A',
      };

      const result = canCheckout(inUseEquipment, [], validPayload);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('already checked out');
    });

    it('rejects checkout when equipment is undergoing maintenance', () => {
      const maintenanceEquipment: EquipmentItem = {
        ...sampleEquipment,
        status: 'maintenance',
      };

      const result = canCheckout(maintenanceEquipment, [], validPayload);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('maintenance');
    });

    it('rejects checkout with missing mandatory engineer name', () => {
      const invalidPayload = { ...validPayload, engineerName: '' };
      const result = canCheckout(sampleEquipment, [], invalidPayload);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Engineer name is required');
    });

    it('rejects checkout with missing destination hospital/site name', () => {
      const invalidPayload = { ...validPayload, siteName: '   ' };
      const result = canCheckout(sampleEquipment, [], invalidPayload);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('site name is required');
    });
  });

  describe('executeCheckout()', () => {
    it('successfully transitions equipment to in_use and creates active booking record', () => {
      const { updatedEquipment, newBooking } = executeCheckout(
        sampleEquipment,
        [],
        validPayload,
        'bk-test-123'
      );

      expect(updatedEquipment.status).toBe('in_use');
      expect(updatedEquipment.currentBookingId).toBe('bk-test-123');
      expect(updatedEquipment.currentBorrowerName).toBe('Lê Hoàng Nam');

      expect(newBooking.id).toBe('bk-test-123');
      expect(newBooking.status).toBe('active');
      expect(newBooking.siteName).toBe(validPayload.siteName);
      expect(newBooking.equipmentId).toBe('eq-001');
    });

    it('throws error when double checkout is attempted', () => {
      const existingBooking: BookingRecord = {
        id: 'bk-active',
        equipmentId: 'eq-001',
        equipmentName: sampleEquipment.name,
        assetCode: sampleEquipment.assetCode,
        engineerId: 'eng-03',
        engineerName: 'Trần Minh B',
        siteName: 'BV Thống Nhất',
        purpose: 'Test máy',
        checkoutDate: '2026-10-19T08:00:00Z',
        expectedReturnDate: '2026-10-25T18:00:00Z',
        status: 'active',
      };

      expect(() => {
        executeCheckout(sampleEquipment, [existingBooking], validPayload);
      }).toThrow(/Double-booking rejected/);
    });
  });

  describe('canReturn() & executeReturn()', () => {
    const activeBooking: BookingRecord = {
      id: 'bk-active-1',
      equipmentId: 'eq-001',
      equipmentName: sampleEquipment.name,
      assetCode: sampleEquipment.assetCode,
      engineerId: 'eng-14',
      engineerName: 'Lê Hoàng Nam',
      siteName: 'Bệnh viện Chợ Rẫy',
      purpose: 'Cài đặt đường truyền LIS',
      checkoutDate: '2026-10-15T08:00:00Z',
      expectedReturnDate: '2026-10-20T18:00:00Z',
      status: 'active',
    };

    const inUseEquipment: EquipmentItem = {
      ...sampleEquipment,
      status: 'in_use',
      currentBookingId: 'bk-active-1',
      currentBorrowerName: 'Lê Hoàng Nam',
    };

    it('allows return of an active booking', () => {
      const result = canReturn(inUseEquipment, activeBooking);
      expect(result.allowed).toBe(true);
    });

    it('rejects return if booking is already returned', () => {
      const alreadyReturnedBooking: BookingRecord = {
        ...activeBooking,
        status: 'returned',
        actualReturnDate: '2026-10-19T10:00:00Z',
      };

      const result = canReturn(inUseEquipment, alreadyReturnedBooking);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('already "returned"');
    });

    it('rejects return if equipment item is not in_use', () => {
      const availableEquipment: EquipmentItem = {
        ...sampleEquipment,
        status: 'available',
      };

      const result = canReturn(availableEquipment, activeBooking);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('not in "in_use" status');
    });

    it('rejects return if booking equipmentId does not match equipment id', () => {
      const mismatchedBooking: BookingRecord = {
        ...activeBooking,
        equipmentId: 'eq-999',
      };

      const result = canReturn(inUseEquipment, mismatchedBooking);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Mismatched equipment');
    });

    it('successfully transitions equipment back to available on return', () => {
      const returnTimestamp = '2026-10-20T11:00:00Z';
      const { updatedEquipment, updatedBooking } = executeReturn(
        inUseEquipment,
        activeBooking,
        returnTimestamp,
        'Thiết bị hoạt động tốt, đầy đủ cáp'
      );

      expect(updatedEquipment.status).toBe('available');
      expect(updatedEquipment.currentBookingId).toBeUndefined();
      expect(updatedEquipment.currentBorrowerName).toBeUndefined();

      expect(updatedBooking.status).toBe('returned');
      expect(updatedBooking.actualReturnDate).toBe(returnTimestamp);
      expect(updatedBooking.notes).toContain('Thiết bị hoạt động tốt');
    });
  });
});
