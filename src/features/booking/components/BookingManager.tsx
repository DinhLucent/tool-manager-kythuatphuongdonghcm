'use client';

import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  History, 
  MapPin, 
  Building2, 
  User, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { EquipmentItem, BookingRecord, CheckoutPayload, EquipmentStatus } from '../types';
import { INITIAL_EQUIPMENT_DATA, INITIAL_BOOKING_RECORDS } from '../data';
import { executeCheckout, executeReturn } from '../rules';
import { CheckoutModal } from './CheckoutModal';
import { Card, CardContent } from '@/components/Card';
import { Badge, BadgeTone } from '@/components/Badge';
import { formatDateTime } from '@/lib/utils';

export function BookingManager() {
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT_DATA);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKING_RECORDS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'active_checkouts' | 'history'>('inventory');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkoutModalItem, setCheckoutModalItem] = useState<EquipmentItem | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Active bookings list
  const activeBookings = useMemo(() => {
    return bookings.filter((b) => b.status === 'active');
  }, [bookings]);

  // Statistics
  const stats = useMemo(() => {
    const total = equipmentList.length;
    const available = equipmentList.filter((e) => e.status === 'available').length;
    const inUse = equipmentList.filter((e) => e.status === 'in_use').length;
    const maintenance = equipmentList.filter((e) => e.status === 'maintenance').length;
    return { total, available, inUse, maintenance };
  }, [equipmentList]);

  // Filtered equipment
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.assetCode.toLowerCase().includes(q) ||
        item.serialNumber.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [equipmentList, search, selectedCategory]);

  const handleCheckoutSubmit = (payload: CheckoutPayload) => {
    if (!checkoutModalItem) return;

    try {
      const { updatedEquipment, newBooking } = executeCheckout(
        checkoutModalItem,
        activeBookings,
        payload
      );

      // Reactively update state
      setEquipmentList((prev) =>
        prev.map((e) => (e.id === updatedEquipment.id ? updatedEquipment : e))
      );
      setBookings((prev) => [newBooking, ...prev]);

      setCheckoutModalItem(null);
      setFeedback({
        type: 'success',
        text: `Checked out "${updatedEquipment.name}" to ${payload.engineerName} for ${payload.siteName}.`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to check out equipment';
      setFeedback({ type: 'error', text: message });
    }
  };

  const handleReturnItem = (equipment: EquipmentItem) => {
    const targetBooking = bookings.find(
      (b) => b.equipmentId === equipment.id && b.status === 'active'
    );

    if (!targetBooking) {
      setFeedback({
        type: 'error',
        text: `No active booking found for equipment ${equipment.assetCode}.`,
      });
      return;
    }

    try {
      const { updatedEquipment, updatedBooking } = executeReturn(
        equipment,
        targetBooking,
        undefined,
        'Returned in good physical & operational condition'
      );

      setEquipmentList((prev) =>
        prev.map((e) => (e.id === updatedEquipment.id ? updatedEquipment : e))
      );
      setBookings((prev) =>
        prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
      );

      setFeedback({
        type: 'success',
        text: `Successfully returned "${updatedEquipment.name}" (${updatedEquipment.assetCode}) to inventory.`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to return equipment';
      setFeedback({ type: 'error', text: message });
    }
  };

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'available':
        return <Badge tone="success">Available</Badge>;
      case 'in_use':
        return <Badge tone="warning">In Use</Badge>;
      case 'maintenance':
        return <Badge tone="danger">Maintenance</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-sky-600" />
            Field Equipment & Tool Booking
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Custody tracking, checkouts, and returns for shared laboratory testing instruments and converters.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Double-Booking Prevention Active</span>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between transition animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Equipment</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.total} items</div>
          <span className="text-[11px] text-slate-400">HCM Inventory</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Available for Checkout</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.available} items</div>
          <span className="text-[11px] text-emerald-700">Ready in office</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Currently In Field</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{stats.inUse} items</div>
          <span className="text-[11px] text-amber-700">{activeBookings.length} Active Custodies</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Maintenance / Calibration</span>
          <div className="text-2xl font-bold text-rose-600 mt-1">{stats.maintenance} item</div>
          <span className="text-[11px] text-rose-700">Under calibration</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'border-sky-600 text-sky-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Equipment Catalog ({equipmentList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('active_checkouts')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'active_checkouts'
              ? 'border-sky-600 text-sky-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Active Checkouts ({activeBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'history'
              ? 'border-sky-600 text-sky-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Custody History ({bookings.length})</span>
        </button>
      </div>

      {/* Tab 1: Equipment Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search equipment by code (EQ-HCM-001), name, or serial number..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-800"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="all">All Categories</option>
              <option value="interface_converter">Interface Converters</option>
              <option value="measuring">Measuring Instruments</option>
              <option value="calibrator">Calibrators</option>
              <option value="toolkit">Toolkits</option>
            </select>
          </div>

          {/* Equipment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between hover:border-slate-300 transition shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {item.assetCode}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      S/N: {item.serialNumber}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    {item.status === 'in_use' && item.currentBorrowerName && (
                      <div className="flex items-center gap-1.5 text-amber-800 font-medium bg-amber-50 px-2 py-1 rounded">
                        <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Held by: {item.currentBorrowerName}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-end">
                  {item.status === 'available' && (
                    <button
                      type="button"
                      onClick={() => setCheckoutModalItem(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      Check Out
                    </button>
                  )}

                  {item.status === 'in_use' && (
                    <button
                      type="button"
                      onClick={() => handleReturnItem(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      Check In / Return
                    </button>
                  )}

                  {item.status === 'maintenance' && (
                    <span className="text-xs text-slate-400 font-medium italic">
                      Locked for calibration
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Active Checkouts */}
      {activeTab === 'active_checkouts' && (
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="text-base font-semibold text-slate-800">No equipment currently checked out</h3>
              <p className="text-xs text-slate-500">All tools and instruments are available in the office inventory.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Equipment</th>
                      <th className="px-4 py-3">Engineer</th>
                      <th className="px-4 py-3">Hospital / Site</th>
                      <th className="px-4 py-3">Checkout Date</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {activeBookings.map((b) => {
                      const item = equipmentList.find((e) => e.id === b.equipmentId);
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-4 py-3 font-medium text-slate-900">
                            <div>{b.equipmentName}</div>
                            <span className="font-mono text-[10px] text-slate-500">{b.assetCode}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-slate-800">{b.engineerName}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{b.siteName}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 truncate block max-w-xs">{b.purpose}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {formatDateTime(b.checkoutDate)}
                          </td>
                          <td className="px-4 py-3 font-medium text-amber-700">
                            {formatDateTime(b.expectedReturnDate)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {item && (
                              <button
                                type="button"
                                onClick={() => handleReturnItem(item)}
                                className="px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition"
                              >
                                Return
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Custody History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Equipment</th>
                  <th className="px-4 py-3">Responsible Engineer</th>
                  <th className="px-4 py-3">Site / Purpose</th>
                  <th className="px-4 py-3">Checkout</th>
                  <th className="px-4 py-3">Returned</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <div>{b.equipmentName}</div>
                      <span className="font-mono text-[10px] text-slate-500">{b.assetCode}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {b.engineerName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">{b.siteName}</div>
                      <div className="text-[11px] text-slate-500 max-w-xs">{b.purpose}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDateTime(b.checkoutDate)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {b.actualReturnDate ? formatDateTime(b.actualReturnDate) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={b.status === 'active' ? 'warning' : 'success'}>
                        {b.status === 'active' ? 'Active' : 'Returned'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[11px] max-w-xs">
                      {b.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        equipment={checkoutModalItem}
        isOpen={Boolean(checkoutModalItem)}
        onClose={() => setCheckoutModalItem(null)}
        onSubmit={handleCheckoutSubmit}
      />
    </div>
  );
}
