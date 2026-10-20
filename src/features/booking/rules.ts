import { EquipmentItem, BookingRecord, CheckoutPayload } from './types';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Validates whether an equipment item can be checked out.
 * 
 * Invariants:
 * 1. Equipment status must be 'available'.
 * 2. There must be NO concurrent active booking for this equipment item (prevents double-booking).
 * 3. Required checkout fields (engineerName, siteName, purpose) must be non-empty.
 * 4. Expected return date must be in the future.
 */
export function canCheckout(
  equipment: EquipmentItem,
  activeBookings: BookingRecord[],
  payload?: Partial<CheckoutPayload>
): ValidationResult {
  // Rule 1: Physical equipment status check
  if (equipment.status === 'in_use') {
    return {
      allowed: false,
      reason: `Equipment "${equipment.name}" (${equipment.assetCode}) is already checked out and in use.`,
    };
  }

  if (equipment.status === 'maintenance') {
    return {
      allowed: false,
      reason: `Equipment "${equipment.name}" (${equipment.assetCode}) is currently undergoing calibration or maintenance.`,
    };
  }

  // Rule 2: Double-booking prevention check across active bookings
  const hasActiveBooking = activeBookings.some(
    (b) => b.equipmentId === equipment.id && b.status === 'active'
  );

  if (hasActiveBooking) {
    return {
      allowed: false,
      reason: `Double-booking rejected: An active booking record already exists for ${equipment.assetCode}.`,
    };
  }

  // Rule 3: Payload validation (if provided)
  if (payload) {
    if (!payload.engineerName || payload.engineerName.trim() === '') {
      return { allowed: false, reason: 'Engineer name is required for custody tracking.' };
    }
    if (!payload.siteName || payload.siteName.trim() === '') {
      return { allowed: false, reason: 'Destination hospital/laboratory site name is required.' };
    }
    if (!payload.purpose || payload.purpose.trim() === '') {
      return { allowed: false, reason: 'Checkout purpose description is required.' };
    }
    if (!payload.expectedReturnDate) {
      return { allowed: false, reason: 'Expected return date is required.' };
    }

    const returnTime = new Date(payload.expectedReturnDate).getTime();
    if (isNaN(returnTime)) {
      return { allowed: false, reason: 'Invalid expected return date format.' };
    }
  }

  return { allowed: true };
}

/**
 * Applies a checkout transition, generating an active booking record and updating equipment state.
 */
export function executeCheckout(
  equipment: EquipmentItem,
  activeBookings: BookingRecord[],
  payload: CheckoutPayload,
  generatedBookingId?: string
): { updatedEquipment: EquipmentItem; newBooking: BookingRecord } {
  const check = canCheckout(equipment, activeBookings, payload);
  if (!check.allowed) {
    throw new Error(check.reason || 'Checkout transition forbidden by business rules.');
  }

  const bookingId = generatedBookingId || `bk-${Date.now()}`;
  const now = new Date().toISOString();

  const newBooking: BookingRecord = {
    id: bookingId,
    equipmentId: equipment.id,
    equipmentName: equipment.name,
    assetCode: equipment.assetCode,
    engineerId: payload.engineerId,
    engineerName: payload.engineerName,
    siteName: payload.siteName,
    purpose: payload.purpose,
    checkoutDate: now,
    expectedReturnDate: payload.expectedReturnDate,
    status: 'active',
    notes: payload.notes,
  };

  const updatedEquipment: EquipmentItem = {
    ...equipment,
    status: 'in_use',
    currentBookingId: bookingId,
    currentBorrowerName: payload.engineerName,
  };

  return { updatedEquipment, newBooking };
}

/**
 * Validates whether an active booking can be returned.
 * 
 * Invariants:
 * 1. Booking status must be 'active'.
 * 2. Booking equipmentId must match equipment.id.
 * 3. Equipment status must be 'in_use'.
 */
export function canReturn(
  equipment: EquipmentItem,
  booking: BookingRecord
): ValidationResult {
  if (booking.status !== 'active') {
    return {
      allowed: false,
      reason: `Cannot return booking ${booking.id}: Status is already "${booking.status}".`,
    };
  }

  if (booking.equipmentId !== equipment.id) {
    return {
      allowed: false,
      reason: `Mismatched equipment: Booking references ${booking.equipmentId} but target is ${equipment.id}.`,
    };
  }

  if (equipment.status !== 'in_use') {
    return {
      allowed: false,
      reason: `Invalid state: Equipment ${equipment.assetCode} is not in "in_use" status (current: ${equipment.status}).`,
    };
  }

  return { allowed: true };
}

/**
 * Applies a return transition, closing the booking record and releasing the equipment item.
 */
export function executeReturn(
  equipment: EquipmentItem,
  booking: BookingRecord,
  actualReturnDate?: string,
  returnNotes?: string
): { updatedEquipment: EquipmentItem; updatedBooking: BookingRecord } {
  const check = canReturn(equipment, booking);
  if (!check.allowed) {
    throw new Error(check.reason || 'Return transition forbidden by business rules.');
  }

  const returnTimestamp = actualReturnDate || new Date().toISOString();

  const updatedBooking: BookingRecord = {
    ...booking,
    status: 'returned',
    actualReturnDate: returnTimestamp,
    notes: returnNotes ? `${booking.notes ? booking.notes + ' | ' : ''}Return note: ${returnNotes}` : booking.notes,
  };

  const updatedEquipment: EquipmentItem = {
    ...equipment,
    status: 'available',
    currentBookingId: undefined,
    currentBorrowerName: undefined,
  };

  return { updatedEquipment, updatedBooking };
}
