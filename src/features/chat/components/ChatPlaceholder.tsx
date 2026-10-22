'use client';

import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  AlertCircle, 
  ShieldAlert, 
  Bot, 
  User, 
  Terminal, 
  Clock 
} from 'lucide-react';
import { ChatMessage } from '../types';
import { DIAGNOSTIC_TEMPLATES, MOCK_KNOWLEDGE_REPLIES } from '../data';
import { Badge } from '@/components/Badge';
import { Card, CardContent } from '@/components/Card';
import { formatDateTime } from '@/lib/utils';

export function ChatPlaceholder() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      role: 'system',
      content: 'Chào kỹ sư! Đây là giao diện Prototype của Trợ lý Kỹ thuật (Technical Assistant Beta). Bạn có thể chọn các câu hỏi mẫu bên dưới hoặc nhập câu hỏi kỹ thuật về giao thức ASTM, mã lỗi máy xét nghiệm và sơ đồ cổng COM.',
      timestamp: new Date().toISOString(),
      isPrototypeResponse: true,
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');

    // Check if query matches any known template
    setTimeout(() => {
      let replyContent = '';
      const matchedTemplate = DIAGNOSTIC_TEMPLATES.find((t) => t.prompt === query);

      if (matchedTemplate && MOCK_KNOWLEDGE_REPLIES[matchedTemplate.id]) {
        replyContent = MOCK_KNOWLEDGE_REPLIES[matchedTemplate.id];
      } else {
        replyContent = `ℹ️ [BETA PROTOTYPE RESPONSE]:
Hệ thống AI Backend chuyên dụng (fine-tuned LLM cho cẩm nang thiết bị y tế Roche, Sysmex, Mindray) hiện đang được đóng gói trong mạng nội bộ.
Trong phiên bản MVP này, AI backend chưa được kích hoạt trực tiếp nhằm bảo vệ tài nguyên máy chủ.

Câu hỏi của bạn: "${query}"
Vui lòng tham khảo tài liệu kỹ thuật tại tab Tài Liệu TSC (/knowledge) hoặc tra cứu sơ đồ chân cáp chuẩn.`;
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toISOString(),
        isPrototypeResponse: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-amber-700" />
            Trợ Lý Kỹ Thuật Hiện Trường
            <Badge tone="warning" size="sm" mono>Beta Prototype</Badge>
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Trợ lý chẩn đoán giao thức truyền thông ASTM/HL7, tra cứu mã lỗi và gợi ý pinout cáp RS-232 máy xét nghiệm.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/90 shrink-0 font-mono shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>AI Backend Phase 2</span>
        </div>
      </div>

      {/* Architecture Disclaimer & Prototype Banner */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3 space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-slate-700">
            <h3 className="font-bold text-slate-900 text-xs">
              Trạng thái tính năng: Giao diện Prototype (AI Backend chưa kích hoạt)
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Theo quy hoạch kiến trúc, portal đóng vai trò là một <strong>API Gateway / Proxy</strong> mỏng để không gây tải cho máy chủ. AI backend nội bộ sẽ kết nối ở giai đoạn sau với rate-limiting an toàn.
            </p>
          </div>
        </div>

        {/* Zero PHI Reminder */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-1 rounded border border-rose-200/70">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Cảnh báo an toàn: Tuyệt đối không nhập thông tin bệnh nhân (PHI), barcode bệnh án, hoặc kết quả lâm sàng.</span>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Chat History and Input (Col 1 & 2) */}
        <div className="lg:col-span-2 flex flex-col h-[480px] sm:h-[520px] bg-white rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs leading-relaxed max-w-xl ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-white ${
                    m.role === 'user'
                      ? 'bg-sky-700'
                      : m.role === 'system'
                      ? 'bg-slate-300 text-slate-700'
                      : 'bg-amber-700'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-2.5 sm:p-3 rounded-lg shadow-2xs ${
                    m.role === 'user'
                      ? 'bg-sky-700 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                  }`}
                >
                  {m.isPrototypeResponse && (
                    <span className="text-[9px] font-mono uppercase font-bold text-amber-700 block mb-0.5">
                      [Prototype Simulation]
                    </span>
                  )}
                  <p className="whitespace-pre-line font-sans text-xs">{m.content}</p>
                  <span
                    className={`block text-[9px] mt-1 font-mono ${
                      m.role === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {formatDateTime(m.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Nhập câu hỏi (ví dụ: Sơ đồ cáp RS232, mã lỗi Cobas, chuẩn ASTM)..."
              className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-800"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="px-2.5 py-1.5 rounded bg-sky-700 hover:bg-sky-800 text-white shadow-2xs transition"
              title="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Diagnostic Templates (Col 3) */}
        <div className="space-y-3">
          <Card className="bg-white">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Câu Hỏi & Chẩn Đoán Mẫu</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Nhấp vào câu hỏi mẫu bên dưới để xem hướng dẫn xử lý kỹ thuật offline:
              </p>

              <div className="space-y-1.5 pt-0.5">
                {DIAGNOSTIC_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSend(tmpl.prompt)}
                    className="w-full text-left p-2 rounded border border-slate-200/90 hover:border-sky-300 hover:bg-sky-50/40 transition group space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-sky-800">
                        {tmpl.title}
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                      {tmpl.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Scope Card */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/90 text-xs text-slate-600 space-y-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px] font-mono uppercase">
              <Terminal className="w-3 h-3 text-slate-500" />
              Kế Hoạch AI Gateway:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
              <li>Edge Function proxy ẩn giấu private token.</li>
              <li>Chỉ tài khoản Google Workspace <code className="bg-slate-200 px-1 py-0.2 rounded font-mono text-[10px]">@phuongdong.com.vn</code>.</li>
              <li>Rate limit 30 câu hỏi/phút tránh nghẽn server.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
