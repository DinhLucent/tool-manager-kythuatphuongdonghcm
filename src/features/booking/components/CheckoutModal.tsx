'use client';

import React, { useState } from 'react';
import { X, CalendarCheck, AlertCircle, ShieldCheck } from 'lucide-react';
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
  const [engineerName, setEngineerName] = useState('Lê Hoàng Nam (You)');
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
      setFormError('Please enter the destination hospital or laboratory site name.');
      return;
    }

    if (!purpose.trim()) {
      setFormError('Please describe the purpose of this field deployment.');
      return;
    }

    if (!expectedReturnDate) {
      setFormError('Please specify the expected return date.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Check Out Equipment</h3>
              <p className="text-xs text-slate-500 font-mono">
                {equipment.assetCode} — {equipment.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {(formError || errorMessage) && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{formError || errorMessage}</span>
            </div>
          )}

          {/* Current Location Context */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600">
            <span className="font-medium text-slate-700">Storage Location:</span> {equipment.location}
          </div>

          {/* Engineer Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Responsible Engineer *
            </label>
            <input
              type="text"
              required
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="e.g., Lê Hoàng Nam"
            />
          </div>

          {/* Destination Hospital / Site */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Hospital / Laboratory Site *
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="e.g., Bệnh viện Chợ Rẫy (Khoa Hóa Sinh)"
            />
          </div>

          {/* Purpose */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Operational Purpose *
            </label>
            <textarea
              required
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="e.g., Cài đặt đường truyền LIS máy Cobas c501 và kiểm tra tín hiệu RS-232"
            />
          </div>

          {/* Expected Return Date */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Expected Return Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Accessories & Remarks (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              placeholder="e.g., Kèm theo cáp USB nối dài 1.8m và đầu chuyển DB9"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm transition"
            >
              Confirm Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
