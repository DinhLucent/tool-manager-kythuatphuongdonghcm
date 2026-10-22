'use client';

import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Boxes, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  History, 
  MapPin, 
  Building2, 
  User, 
  ShieldCheck,
  List,
  LayoutGrid
} from 'lucide-react';
import { EquipmentItem, BookingRecord, CheckoutPayload, EquipmentStatus } from '../types';
import { INITIAL_EQUIPMENT_DATA, INITIAL_BOOKING_RECORDS } from '../data';
import { executeCheckout, executeReturn } from '../rules';
import { CheckoutModal } from './CheckoutModal';
import { Card, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { formatDateTime } from '@/lib/utils';

export function BookingManager() {
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT_DATA);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKING_RECORDS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'active_checkouts' | 'history'>('inventory');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
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

      setEquipmentList((prev) =>
        prev.map((e) => (e.id === updatedEquipment.id ? updatedEquipment : e))
      );
      setBookings((prev) => [newBooking, ...prev]);

      setCheckoutModalItem(null);
      setFeedback({
        type: 'success',
        text: `Đã bàn giao "${updatedEquipment.name}" cho ${payload.engineerName} (${payload.siteName}).`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi khi đặt tool';
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
        text: `Không tìm thấy lượt mượn hoạt động của thiết bị ${equipment.assetCode}.`,
      });
      return;
    }

    try {
      const { updatedEquipment, updatedBooking } = executeReturn(
        equipment,
        targetBooking,
        undefined,
        'Trả lại văn phòng trong tình trạng hoạt động tốt'
      );

      setEquipmentList((prev) =>
        prev.map((e) => (e.id === updatedEquipment.id ? updatedEquipment : e))
      );
      setBookings((prev) =>
        prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
      );

      setFeedback({
        type: 'success',
        text: `Đã thu hồi "${updatedEquipment.name}" (${updatedEquipment.assetCode}) về kho kỹ thuật.`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi khi thu hồi thiết bị';
      setFeedback({ type: 'error', text: message });
    }
  };

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'available':
        return <Badge tone="success" size="sm" mono>Sẵn Sàng</Badge>;
      case 'in_use':
        return <Badge tone="warning" size="sm" mono>Đang Mượn</Badge>;
      case 'maintenance':
        return <Badge tone="danger" size="sm" mono>Bảo Trì / QC</Badge>;
    }
  };

  const getReturnCountdown = (expectedReturnDate: string) => {
    const now = new Date();
    const returnDate = new Date(expectedReturnDate);
    const diffTime = returnDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[10px] whitespace-nowrap">
          Quá hạn {Math.abs(diffDays)}d
        </span>
      );
    }
    if (diffDays === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[10px] whitespace-nowrap">
          Đến hạn hôm nay
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-red-50 text-red-700 font-semibold border border-red-200 text-[10px] whitespace-nowrap">
        Còn {diffDays} ngày
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-red-600" />
            Đặt Tool & Thiết Bị Đo Kiểm
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Sổ đăng ký mượn trả tool dùng chung: bộ đổi cổng Moxa, đồng hồ Fluke, bộ cân chỉnh quang học với cơ chế chống trùng lịch.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200/90 shrink-0 font-mono shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Double-Booking Protection</span>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-2.5 sm:p-3 rounded-lg text-xs font-medium flex items-center justify-between transition animate-in fade-in duration-100 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80'
              : 'bg-rose-50 text-rose-900 border border-rose-200/80'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 font-bold px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] text-slate-500 font-medium block">Tổng thiết bị kho</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{stats.total}</div>
          <span className="text-[10px] text-slate-400 font-mono">Kho thiết bị kỹ thuật</span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] text-slate-500 font-medium block">Sẵn sàng xuất viện</span>
          <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">{stats.available}</div>
          <span className="text-[10px] text-emerald-600 font-mono">Trong kho</span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] text-slate-500 font-medium block">Đang ở bệnh viện</span>
          <div className="text-lg font-bold text-amber-700 font-mono mt-0.5">{stats.inUse}</div>
          <span className="text-[10px] text-amber-600 font-mono">{activeBookings.length} lượt mượn</span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] text-slate-500 font-medium block">Đang bảo trì / Kiểm định</span>
          <div className="text-lg font-bold text-rose-700 font-mono mt-0.5">{stats.maintenance}</div>
          <span className="text-[10px] text-rose-600 font-mono">Khóa xuất kho</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200/90 flex gap-2 text-xs font-medium overflow-x-auto pb-0.5 scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`pb-2 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'border-red-600 text-red-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Danh Mục Thiết Bị ({equipmentList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('active_checkouts')}
          className={`pb-2 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'active_checkouts'
              ? 'border-red-600 text-red-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Đang Mượn ({activeBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`pb-2 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-red-600 text-red-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Lịch Sử Giao Nhận ({bookings.length})</span>
        </button>
      </div>

      {/* Tab 1: Equipment Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-3">
          {/* Search & Category Filter */}
          <div className="bg-white p-2.5 sm:p-3 rounded border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm mã thiết bị (EQ-001), tên máy, số serial hoặc vị trí..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:bg-white text-slate-800"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-800"
            >
              <option value="all">Tất cả chủng loại</option>
              <option value="interface_converter">Bộ Chuyển Đổi COM / Moxa</option>
              <option value="measuring">Thiết Bị Đo Điện Áp / Fluke</option>
              <option value="calibrator">Bộ Cân Chỉnh Quang Học</option>
              <option value="toolkit">Bộ Dụng Cụ Cơ Khí</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="text-[11px] text-slate-500">
              Hiển thị <span className="font-bold text-slate-900 tnum">{filteredEquipment.length}</span> / {equipmentList.length} thiết bị kiểm định
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition ${
                  viewMode === 'table'
                    ? 'bg-white text-red-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Bảng Kỹ Thuật</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition ${
                  viewMode === 'cards'
                    ? 'bg-white text-red-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Dạng Thẻ</span>
              </button>
            </div>
          </div>

          {viewMode === 'table' ? (
            /* High-Density Equipment Table (Operate Mode) */
            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-[11px] font-mono text-slate-600">
                      <th className="py-2.5 px-3 whitespace-nowrap">Mã Tài Sản</th>
                      <th className="py-2.5 px-3 whitespace-nowrap">Tên Thiết Bị & S/N</th>
                      <th className="py-2.5 px-2.5 whitespace-nowrap">Chủng Loại</th>
                      <th className="py-2.5 px-2.5 whitespace-nowrap">Trạng Thái</th>
                      <th className="py-2.5 px-3 min-w-[200px]">Vị Trí / Người Đang Mượn</th>
                      <th className="py-2.5 px-3 text-right whitespace-nowrap">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-sans">
                    {filteredEquipment.map((item) => {
                      const isInUse = item.status === 'in_use';
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                              {item.assetCode}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">
                              S/N: {item.serialNumber}
                            </div>
                          </td>
                          <td className="py-2.5 px-2.5 whitespace-nowrap">
                            <span className="text-[11px] text-slate-600">
                              {item.category === 'interface_converter' && 'Bộ đổi COM/Moxa'}
                              {item.category === 'measuring' && 'Đồng hồ Fluke'}
                              {item.category === 'calibrator' && 'Bộ quang chuẩn'}
                              {item.category === 'toolkit' && 'Bộ tool cơ khí'}
                            </span>
                          </td>
                          <td className="py-2.5 px-2.5 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="py-2.5 px-3 text-[11px]">
                            {isInUse && item.currentBorrowerName ? (
                              <div className="flex items-center gap-1 font-semibold text-amber-800">
                                <User className="w-3 h-3 text-amber-600 shrink-0" />
                                <span>{item.currentBorrowerName}</span>
                                <span className="text-slate-400">•</span>
                                <span className="font-normal text-slate-600">{item.location}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-slate-600">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            {item.status === 'available' && (
                              <button
                                type="button"
                                onClick={() => setCheckoutModalItem(item)}
                                className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold shadow-2xs transition"
                              >
                                Đặt Tool
                              </button>
                            )}
                            {item.status === 'in_use' && (
                              <button
                                type="button"
                                onClick={() => handleReturnItem(item)}
                                className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold shadow-2xs transition"
                              >
                                Thu Hồi
                              </button>
                            )}
                            {item.status === 'maintenance' && (
                              <span className="text-[11px] text-slate-400 italic">
                                Hiệu chuẩn
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Equipment Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {filteredEquipment.map((item) => (
                <Card key={item.id} className="flex flex-col justify-between hover:border-slate-300 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] bg-white">
                  <CardContent className="p-3.5 sm:p-4 space-y-2">
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200/80">
                        {item.assetCode}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        S/N: {item.serialNumber}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      {item.status === 'in_use' && item.currentBorrowerName && (
                        <div className="flex items-center gap-1 text-amber-900 font-medium bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200/60">
                          <User className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">Kỹ sư mượn: {item.currentBorrowerName}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <div className="px-3.5 py-2 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end">
                    {item.status === 'available' && (
                      <button
                        type="button"
                        onClick={() => setCheckoutModalItem(item)}
                        className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold shadow-2xs transition"
                      >
                        Đặt Tool
                      </button>
                    )}

                    {item.status === 'in_use' && (
                      <button
                        type="button"
                        onClick={() => handleReturnItem(item)}
                        className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold shadow-2xs transition"
                      >
                        Bàn Giao / Trả
                      </button>
                    )}

                    {item.status === 'maintenance' && (
                      <span className="text-[11px] text-slate-400 font-medium italic">
                        Đang hiệu chuẩn
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Active Checkouts */}
      {activeTab === 'active_checkouts' && (
        <div className="space-y-3">
          {activeBookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-slate-200/90 space-y-1.5 p-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-800">Không có tool nào đang được mượn</h3>
              <p className="text-xs text-slate-500">Tất cả dụng cụ và máy đo hiện đang sẵn sàng trong kho kỹ thuật.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200/90 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 text-[10px] font-mono">
                    <tr>
                      <th className="px-3 py-2">Thiết Bị</th>
                      <th className="px-3 py-2">Kỹ Sư</th>
                      <th className="px-3 py-2">Bệnh Viện / Mục Đích</th>
                      <th className="px-3 py-2">Ngày Mượn</th>
                      <th className="px-3 py-2">Hạn Dự Kiến</th>
                      <th className="px-3 py-2 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {activeBookings.map((b) => {
                      const item = equipmentList.find((e) => e.id === b.equipmentId);
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-3 py-2 font-medium text-slate-900">
                            <div>{b.equipmentName}</div>
                            <span className="font-mono text-[10px] text-slate-500">{b.assetCode}</span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="font-medium text-slate-800">{b.engineerName}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1 font-medium text-slate-800">
                              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{b.siteName}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 truncate block max-w-xs">{b.purpose}</span>
                          </td>
                          <td className="px-3 py-2 text-slate-600 font-mono text-[11px]">
                            {formatDateTime(b.checkoutDate)}
                          </td>
                          <td className="px-3 py-2 font-mono text-[11px]">
                            <div className="font-medium text-amber-800">
                              {formatDateTime(b.expectedReturnDate)}
                            </div>
                            <div className="mt-0.5">
                              {getReturnCountdown(b.expectedReturnDate)}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right">
                            {item && (
                              <button
                                type="button"
                                onClick={() => handleReturnItem(item)}
                                className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-800 text-white font-medium text-[11px] transition shadow-2xs"
                              >
                                Thu Hồi
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
        <div className="bg-white rounded-lg border border-slate-200/90 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 text-[10px] font-mono">
                <tr>
                  <th className="px-3 py-2">Thiết Bị</th>
                  <th className="px-3 py-2">Kỹ Sư</th>
                  <th className="px-3 py-2">Điểm Triển Khai</th>
                  <th className="px-3 py-2">Ngày Mượn</th>
                  <th className="px-3 py-2">Ngày Trả</th>
                  <th className="px-3 py-2">Trạng Thái</th>
                  <th className="px-3 py-2">Ghi Chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-3 py-2 font-medium text-slate-900">
                      <div>{b.equipmentName}</div>
                      <span className="font-mono text-[10px] text-slate-500">{b.assetCode}</span>
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-800">
                      {b.engineerName}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-medium text-slate-800">{b.siteName}</div>
                      <div className="text-[10px] text-slate-500 max-w-xs">{b.purpose}</div>
                    </td>
                    <td className="px-3 py-2 text-slate-600 font-mono text-[11px]">
                      {formatDateTime(b.checkoutDate)}
                    </td>
                    <td className="px-3 py-2 text-slate-600 font-mono text-[11px]">
                      {b.actualReturnDate ? formatDateTime(b.actualReturnDate) : '—'}
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={b.status === 'active' ? 'warning' : 'success'} size="sm" mono>
                        {b.status === 'active' ? 'Đang Mượn' : 'Đã Trả'}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-slate-500 text-[11px] max-w-xs">
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
