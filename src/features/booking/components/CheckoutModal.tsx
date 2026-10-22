'use client';

import React, { useState } from 'react';
import { X, ClipboardCheck, AlertCircle } from 'lucide-react';
import { EquipmentItem, CheckoutPayload } from '../types';

interface CheckoutModalProps {
  equipment: EquipmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CheckoutPayload) => void;
  errorMessage?: string;
}

export function CheckoutModal({
  equipment,
  isOpen,
  onClose,
  onSubmit,
  errorMessage,
}: CheckoutModalProps) {
  const [engineerName, setEngineerName] = useState('Lê Hoàng Nam');
  const [siteName, setSiteName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState(() => {
    // Default to tomorrow 17:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    tomorrow.setHours(17, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  });
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen || !equipment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!siteName.trim()) {
      setFormError('Vui lòng nhập tên bệnh viện hoặc phòng xét nghiệm.');
      return;
    }

    if (!purpose.trim()) {
      setFormError('Vui lòng nhập mục đích tác nghiệp tại hiện trường.');
      return;
    }

    if (!expectedReturnDate) {
      setFormError('Vui lòng chỉ định ngày dự kiến hoàn trả.');
      return;
    }

    onSubmit({
      equipmentId: equipment.id,
      engineerId: 'eng-14',
      engineerName: engineerName.trim(),
      siteName: siteName.trim(),
      purpose: purpose.trim(),
      expectedReturnDate: new Date(expectedReturnDate).toISOString(),
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border border-slate-200/90 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-sky-100 text-sky-800">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Phiếu Mượn Thiết Bị Đi Viện</h3>
              <p className="text-[10px] text-slate-500 font-mono">
                {equipment.assetCode} — {equipment.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-4 space-y-3">
          {(formError || errorMessage) && (
            <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{formError || errorMessage}</span>
            </div>
          )}

          {/* Current Location Context */}
          <div className="bg-slate-50 p-2 rounded border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
            <span className="font-medium text-slate-700">Vị trí hiện tại trong kho:</span>
            <span className="font-mono text-slate-900 font-semibold">{equipment.location}</span>
          </div>

          {/* Engineer Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Kỹ sư nhận thiết bị *
            </label>
            <input
              type="text"
              required
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="VD: Lê Hoàng Nam"
            />
          </div>

          {/* Destination Hospital / Site */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Bệnh viện / Phòng khám / Điểm đến *
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="VD: Bệnh viện Chợ Rẫy (Khoa Sinh Hóa)"
            />
          </div>

          {/* Purpose */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Mục đích tác nghiệp *
            </label>
            <textarea
              required
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-900 resize-none"
              placeholder="VD: Cài đặt đường truyền LIS máy Cobas c501 và kiểm tra cổng RS-232"
            />
          </div>

          {/* Expected Return Date */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Thời gian dự kiến trả về văn phòng *
            </label>
            <input
              type="datetime-local"
              required
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono"
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">
              Phụ kiện đi kèm & Ghi chú (nếu có)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="VD: Kèm cáp chuyển DB9 to USB và adaptor nguồn 12V"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white rounded shadow-2xs transition"
            >
              Xác Nhận Xuất Kho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
