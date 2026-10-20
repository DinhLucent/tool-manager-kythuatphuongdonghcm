import { DiagnosticTemplate } from './types';

export const DIAGNOSTIC_TEMPLATES: DiagnosticTemplate[] = [
  {
    id: 'tmpl-01',
    title: 'Cobas c501 Serial Handshake',
    prompt: 'Kiểm tra tín hiệu bắt tay ASTM 1381 cổng RS-232 máy Roche Cobas c501 (9600-8-N-1). Các bước xử lý khi máy báo Timeout NAK?',
    category: 'astm',
  },
  {
    id: 'tmpl-02',
    title: 'DB9 to RJ45 Moxa Pinout',
    prompt: 'Cung cấp sơ đồ chân cắm DB9 Male sang RJ45 chuẩn đấu nối đầu đọc mã vạch và cổng COM Moxa UPort 1150.',
    category: 'pinout',
  },
  {
    id: 'tmpl-03',
    title: 'Sysmex XN-550 Error 1021',
    prompt: 'Mã lỗi 1021 trên máy huyết học Sysmex XN-550 (Aspiration pressure abnormal). Cần kiểm tra van áp lực và bơm hút nào?',
    category: 'error_code',
  },
  {
    id: 'tmpl-04',
    title: 'Mindray BC-5380 MLLP Network Frame',
    prompt: 'Cấu hình cổng MLLP TCP/IP 2101 kết nối LIS cho Mindray BC-5380. Định dạng ký tự bắt đầu <VT> và kết thúc <FS><CR>.',
    category: 'astm',
  },
];

export const MOCK_KNOWLEDGE_REPLIES: Record<string, string> = {
  'tmpl-01': `🛠️ [Offline Diagnostic Guidance — ASTM 1381 Handshake]:
1. Thiết lập cổng COM: Baudrate 9600, Data bits 8, Parity None, Stop bits 1, Flow Control: Hardware (hoặc XON/XOFF theo config Cobas).
2. Kiểm tra dây tín hiệu DB9: Pin 2 (RXD) -> Pin 3 (TXD), Pin 3 (TXD) -> Pin 2 (RXD), Pin 5 (GND) -> Pin 5 (GND).
3. Khi máy trả về NAK liên tục:
   - Kiểm tra mã checksum modulo 256 ở cuối frame (giữa [ETX] và [CR][LF]).
   - Kiểm tra frame number có tăng tuần tự từ 1 đến 7 (reset về 0 sau 7).
   - Đảm bảo host trả lời ACK (0x06) trong vòng dưới 15 giây sau khi nhận frame.`,

  'tmpl-02': `🔌 [DB9 Male to RJ45 Pinout Standard — Moxa / PhuongDong]:
- DB9 Pin 2 (RXD)  <---> RJ45 Pin 3
- DB9 Pin 3 (TXD)  <---> RJ45 Pin 6
- DB9 Pin 5 (GND)  <---> RJ45 Pin 4 & 5 (Signal Ground)
- DB9 Pin 7 (RTS)  <---> RJ45 Pin 1
- DB9 Pin 8 (CTS)  <---> RJ45 Pin 8
Lưu ý: Không dùng cáp Ethernet thẳng hoặc cáp console Cisco (cần đảo chân TX/RX theo sơ đồ null modem).`,

  'tmpl-03': `⚠️ [Sysmex XN-550 Error 1021 — Aspiration Pressure]:
1. Nguyên nhân: Áp lực hút mẫu máu không đạt ngưỡng âm quy định (-0.06 MPa) trong chu kỳ 3.2 giây.
2. Kiểm tra thực địa:
   - Kiểm tra ống silicone nối từ kim hút (Sample Probe) vào buồng trộn có bị nứt/gập không.
   - Vệ sinh kim hút chống tắc nghẽn cục máu đông bằng dung dịch Cellclean.
   - Kiểm tra hoạt động của Van điện từ SV10 và Bơm màng hút mẫu P1.`,

  'tmpl-04': `🌐 [Mindray BC-5380 MLLP TCP Framing]:
- Start of Block: 0x0B (<VT>)
- Data Payload: HL7 v2.3.1 ASCII Message (MSH, PID, OBR, OBX)
- End of Block: 0x1C (<FS>) theo sau bởi 0x0D (<CR>)
- Port mặc định: 2101 hoặc 5100
- Đảm bảo LIS Server gửi gói tin ACK (MSA|AA) sau mỗi gói tin ORU^R01 nhận được trong vòng 3000ms.`,
};
