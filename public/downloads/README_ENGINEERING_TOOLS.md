# Kho Phần Mềm & Công Cụ Kỹ Thuật Thiết Yếu (Engineering Tools)
> **Tổ chức**: Trung tâm Dịch vụ Kỹ thuật (TSC) — Công ty TNHH Thiết bị Y tế Phương Đông  
> **Khu vực**: Đội ngũ Kỹ sư TP.HCM & Miền Tây (~14 kỹ sư)  
> **Cập nhật**: Tháng 10/2026

---

## 1. Đánh Giá Danh Mục Phần Mềm Cần Thiết (Tải Về Tích Lũy)

Theo nguyên tắc "chỉ tải và tích lũy các phần mềm thực sự thiết yếu trước", đội ngũ kỹ thuật Phương Đông đã đánh giá và phân loại các công cụ thành 3 nhóm trọng tâm:

### Nhóm 1: Phần mềm lõi do Kỹ sư Phương Đông phát triển (Core Internal Tools)
1. **Phuong Dong LIS Diagnostic & Server Suite (`Software.zip` — 122.69 MB)**:
   - **Tác giả / Lưu trữ**: Kỹ sư Đinh Hoàng Sáng (SharePoint: `TSC/IT/Đinh Hoàng Sáng/DIAG/Server`).
   - **Mã băm toàn vẹn (SHA-256)**: 
     ```
     e1c05a117de5933b9aab71a6141aa5d94df87acc4fd0f55013e3c12c75477aee
     ```
   - **Thành phần bên trong**:
     - `IMMULITE2000/`: Bộ xử lý trung gian dịch vụ LIS cho máy miễn dịch Siemens Immulite 2000 (`processor.py`, `service.py`, `rotatelogger.py`, `crypto.py`).
     - `IMMUNOMAT_1/`: Bộ dịch vụ LIS cho máy miễn dịch tự động Immunomat.
     - `IMMUNLITE_IT/`: Module ghi log, phân tích gói tin và cấu hình cổng kết nối `main.py`.
   - **Ứng dụng thực địa**: Dùng để dựng máy chủ LIS ảo (Virtual LIS Server) ngay trên laptop kỹ sư để test truyền kết quả xét nghiệm khi cài đặt máy tại bệnh viện mà chưa có đường truyền LIS của viện.

---

### Nhóm 2: Driver phần cứng chuẩn hóa (Hardware Interface Drivers)
2. **Moxa UPort 1100 Series WHQL Certified Driver**:
   - **Hỗ trợ**: Cáp chuyển đổi USB-to-RS232/422/485 Moxa UPort 1110, UPort 1150.
   - **Tầm quan trọng**: 90% máy xét nghiệm (Bio-Rad D-10, Evolis; Nihon Kohden MEK-6500, MEK-7300; Furuno CA-270; Analyticon Urilyzer) sử dụng cổng nối tiếp DB9 RS-232 để giao tiếp LIS.
   - **Chứng chỉ**: WHQL 64-bit, tương thích Windows 10, Windows 11 và Windows Server.

---

### Nhóm 3: Tiện ích chẩn đoán & kiểm thử hiện trường (Portable Diagnostic Scripts)
3. **`ASTM_Checksum_Calculator.ps1`** (Có sẵn trong thư mục này):
   - **Mục đích**: Tính toán tức thì mã Checksum 2 ký tự Hex (Modulo 256) của khung truyền ASTM E1381/E1394.
   - **Cách chạy**:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\ASTM_Checksum_Calculator.ps1 -Frame "1H|\^&|||Bio-Rad^EVOLIS|||||||P|1|20261022"
     ```

4. **`Serial_COM_Loopback_Test.ps1`** (Có sẵn trong thư mục này):
   - **Mục đích**: Tự động dò tìm tất cả cổng COM đang cắm trên máy tính và chạy kiểm tra Loopback chân số 2 (RxD) và chân số 3 (TxD).
   - **Cách chạy**:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\Serial_COM_Loopback_Test.ps1 -PortName "COM3" -BaudRate 9600
     ```

---

## 2. Hướng Dẫn Kỹ Sư Triển Khai Thực Địa (Offline Readiness)

Khi kỹ sư đến bệnh viện xử lý sự cố hoặc lắp đặt máy mới trong môi trường phòng xét nghiệm không có Internet:
1. Đảm bảo copy trọn bộ thư mục `downloads` và file `Software.zip` vào ổ cứng cá nhân hoặc USB công tác.
2. Kiểm tra mã SHA-256 trước khi giải nén bằng lệnh PowerShell:
   ```powershell
   Get-FileHash -Path .\Software.zip -Algorithm SHA256
   ```
3. Khởi chạy script giả lập hoặc kết nối cổng COM theo sơ đồ chân đã được ghi chú chi tiết trong từng tài liệu ngành hàng trên **HCM Engineering Portal**.
