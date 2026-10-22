# Bản Đồ Cấu Trúc Tài Nguyên Kỹ Thuật Ngành Hàng (TSC)
> **Tổ chức**: Trung tâm Dịch vụ Kỹ thuật (TSC) — Công ty TNHH Thiết bị Y tế Phương Đông  
> **Nguồn lưu trữ**: Microsoft 365 SharePoint (`tbytphuongdong.sharepoint.com`)  
> **Đích phát triển**: HCM Engineering Portal (Hệ thống điều hành kỹ thuật khu vực TP.HCM)  
> **Ngày khảo sát & lập bản đồ**: Tháng 10/2026 (Khảo sát trực tiếp qua phiên đăng nhập kỹ sư)

---

## 1. Tổng Quan & Cơ Chế Truy Cập

### 1.1 Thông Tin Hệ Thống Lưu Trữ
- **Tenant SharePoint**: `tbytphuongdong.sharepoint.com`
- **Thư mục gốc kho TSC**: `/Shared Documents/CCC/TSC`
- **Đường dẫn Web gốc**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC&viewid=3fae4583%2D4c87%2D4f96%2D84f9%2Dbac3e9aa722e&ga=1
  ```
- **Cơ chế xác thực (Auth)**: Microsoft Entra ID (Azure AD SSO) qua tài khoản nội bộ Phương Đông (`@phuongdong.com.vn`).

### 1.2 Ràng Buộc Kỹ Thuật Đã Xác Minh Thực Tế
1. **Phân quyền chia sẻ (Sharing Policy)**: 
   - Bị khóa cứng ở cấp độ tổ chức: `Only people with existing access can use the link` (Chỉ những người đã được cấp quyền trong tổ chức Phương Đông).
   - Không cho phép tạo liên kết nặc danh công khai (`Anyone with the link` bị vô hiệu hóa).
2. **Quyền hạn kỹ sư thực địa**:
   - Các thư mục hãng dùng chung (`BIORAD`, `HES`, `IC`, `CAI`, `QIA`...): Quyền **`Read-only`** (Xem/tải về, không sửa xóa nhằm bảo toàn dữ liệu gốc).
   - Thư mục cá nhân (`IT/Đinh Hoàng Sáng`): Quyền **`Full Control / Read-Write`** (Được phép tạo mới, upload công cụ, cập nhật tài liệu).
3. **Chính sách Iframe**:
   - Máy chủ SharePoint kích hoạt `X-Frame-Options: SAMEORIGIN`.
   - **Quy tắc thiết kế cho Portal**: Web portal trên Vercel đóng vai trò là **Bộ chỉ mục tra cứu thông minh (Smart Deep-Link Index)**. Kỹ sư tìm kiếm trên web, bấm mở tài liệu sẽ mở tab mới trỏ trực tiếp vào SharePoint, tận dụng session đăng nhập M365 sẵn có trên trình duyệt để hiển thị PDF/Excel tức thì.

---

## 2. Bản Đồ Danh Mục Ngành Hàng (Product Lines)

Toàn bộ kho tài nguyên kỹ thuật tại `TSC` được chia thành **11 nhóm ngành hàng và nghiệp vụ chính**:

| Mã Ngành Hàng | Tên Ngành Hàng / Mảng Chuyên Môn | Hãng Sản Xuất / Đối Tác Tiêu Biểu | Dòng Thiết Bị / Nội Dung Trọng Tâm | Số Lượng Thư Mục / File |
| :--- | :--- | :--- | :--- | :--- |
| **`BIORAD`** | Sinh Hóa - Miễn Dịch & Truyền Máu | Bio-Rad Laboratories (Mỹ/Pháp) | D-10, D-100, Evolis, IH-500, PR4100, PW40, Saxo, VNBS, LIS protocols | 16 thư mục chuyên sâu |
| **`HES`** | Huyết Học & Đông Máu | Nihon Kohden, Behnk Elektronik, Elitech | MEK-6500, 7300, 8222, 9100, 9200, Máy đông máu BE, Thống kê CCDT | 5 danh mục, 14+ protocol |
| **`IC`** | Hồi Sức Cấp Cứu, Thận & Ngoại Khoa | Baxter / Gambro, ECMO, Hillrom, Seca, Vygon | Máy thận AK96, AK98, AK200; Lọc máu liên tục Prismaflex, Prismax | 6 hãng, 9+ bộ tài liệu |
| **`CAI`** | Tự Động Hóa Phòng Lab, Sinh Hóa & Nước Tiểu | Analyticon, Furuno, Tokyo Boeki, EXIAS, BioCare, AVE | Máy nước tiểu Urilyzer, Sinh hóa Furuno CA-270/400, Điện giải e\|1 | 8 nhóm hãng, 11+ protocol |
| **`QIA`** | Sinh Học Phân Tử & Tách Chiết | Qiagen (Đức) | EZ2 Connect, NeuMoDx, QIAcube, QIAcuity (dPCR), QIAquant, Rotor-Gene Q | 13 thư mục dòng máy |
| **`MM`** | Sinh Học Phân Tử PCR & Vi Sinh | Bio-Rad, Hamilton Robotics, Seegene, Mindray | CFX96 Touch, CFX Opus, Robot hút mẫu Nimbus/Starlet, Seeprep32 | 10 thư mục dòng máy |
| **`BB`** | Ngân Hàng Máu & Chiết Tách Tế Bào | Terumo BCT (Nhật Bản/Mỹ) | Máy gạn tách tiểu cầu Trima Accel, Hệ thống bất hoạt mầm bệnh Mirasol | 2 thư mục nghiệp vụ |
| **`IMD`** | Chẩn Đoán Hình Ảnh & Thiết Bị Mổ | Fujifilm, Carestream Health, Karl Storz | Máy in DryView, Hệ thống nội soi phẫu thuật, X-quang kỹ thuật số | 3 nhóm hãng lớn |
| **`MATC`** | Thiết Bị Y Tế Chuyên Sâu & Hồi Sức | Medtronic / Puritan Bennett, Philips | Máy thở điều trị tích cực, Monitor theo dõi bệnh nhân | 2 nhóm hãng |
| **`IT`** | Công Nghệ Thông Tin & LIS Bridge | Nội bộ Phương Đông (Đội ngũ Kỹ sư IT) | LIS Driver, Diagnostic Software Server/Client, Bảng kiểm IT.xlsx | 5 thư mục kỹ sư + File cài |
| **`CHUNG`** | Nghiệp Vụ Vận Hành & Quản Trị Kỹ Thuật | Ban Giám đốc & Trưởng vùng TSC | Quy trình đặt linh kiện (Part Order), Gói bảo dưỡng, Tuyến xe, Kỹ sư vùng | 8 biểu mẫu vận hành lớn |

---

## 3. Chi Tiết Cấu Trúc Từng Ngành Hàng & Liên Kết Truy Cập

### 3.1 Ngành Hàng `BIORAD` (Bio-Rad Laboratories)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/BIORAD`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FBIORAD
  ```
- **Danh mục thiết bị & Tài liệu chi tiết**:
  1. **`D10` & `D100`**: Máy đo sắc ký lỏng hiệu năng cao (HPLC) xét nghiệm HbA1c và biến thể Hemoglobin.
     - Tài liệu LIS: `LB000867revA D-100 LIS Technical Bulletin.pdf` (2.30 MB)
     - Đặc tả giao thức: ASTM E1381/E1394, RS-232C, baudrate 9600/19200.
  2. **`EVOLIS` & `EVOLIS TWIN PLUS`**: Hệ thống phân tích miễn dịch tự động 4 đĩa vi thể ELISA hoàn toàn khép kín.
     - Tài liệu LIS: `EVOLIS - Connectivity Manual 1_1.pdf` (361 KB)
     - Đặc tả giao thức: ASTM bidirectional, hỗ trợ truy vấn mẫu (Query mode), tải kết quả tự động.
  3. **`IH500` & `IHCOM` & `Saxo`**: Hệ thống định nhóm máu và sàng lọc kháng thể bất thường bằng kỹ thuật Gelcard.
     - Phần mềm quản lý: IH-Com data management software.
  4. **`PR4100` & `PW40`**: Đầu đọc vi đĩa hấp thụ quang học và máy rửa 96 giếng tự động.
     - Tài liệu giao tiếp: `PR4100.pdf` (519 KB)
  5. **`VNBS`**: Hệ thống sàng lọc sơ sinh sơ bộ (Newborn Screening).
  6. **`LIS protocol`**: Thư mục tổng hợp các giao thức truyền thông LIS của toàn bộ dải sản phẩm Bio-Rad:
     - `EVOLIS - Connectivity Manual 1_1.pdf`
     - `LB000867revA D-100 LIS Technical Bulletin.pdf`
     - `LB002308revA GDM 3.3 LIS Requirements.pdf` (189 KB)
     - `PR4100.pdf`
  7. **`CHECKSHEET`**: Biểu mẫu kiểm tra bảo dưỡng định kỳ (PM) và nghiệm thu lắp đặt máy (IQ/OQ/PQ).

---

### 3.2 Ngành Hàng `HES` (Huyết Học & Đông Máu)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/HES`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FHES
  ```
- **Kỹ sư đầu mối ghi nhận**: Nguyễn Thanh Tùng, Nguyễn Khả Tài.
- **Danh mục chuyên sâu**:
  1. **`SERVICE MATERIALS/Nihon Kohden`**: Kho giao thức LIS đầy đủ của dòng máy huyết học Nihon Kohden Celltac:
     - `0614-907179E MEK_CHM ASTM.pdf` (1.29 MB) — Giao thức ASTM chuẩn cho các dòng MEK.
     - `0614-907509 MEK9100 HL7.pdf` (979 KB) — Giao thức mạng chuẩn HL7 v2.x cho dòng cao cấp MEK-9100.
     - `MEK 9200 HL7 Manual.pdf` (1.10 MB) — Sổ tay kết nối mạng HL7 cho model MEK-9200.
     - `ASTM_MEK6500_6510_7300.pdf` (1.72 MB) — Tài liệu cấu hình LIS cho MEK-6500, MEK-6510, MEK-7300.
     - `mek7222_protocol-a.pdf` (158 KB) & `mek8222_protocol-a.pdf` (152 KB) — Giao thức Serial Protocol A.
  2. **`SERVICE MATERIALS/BE`**: Behnk Elektronik (Đức) — Các dòng máy đông máu bán tự động và tự động (Thrombotimer, CL4, Thrombostat).
  3. **`SERVICE MATERIALS/Elitech`**: Elitech Group — Hóa chất và máy phân tích chuyên biệt.
  4. **Hệ thống biểu mẫu nghiệp vụ**:
     - `THEO DÕI MÁU CHUẨN/`: Quản lý lô máu chuẩn Calibrator và Control theo ngày hết hạn.
     - `THEO DÕI PHỤ KIỆN THÁO MÁY/`: Quản lý linh kiện tháo máy (cannula, valve, syringe) dùng để cứu máy khẩn cấp.
     - `Thống kê CCDT.xlsx` (18.3 KB): Bảng theo dõi công cụ dụng cụ và đồ nghề kỹ thuật viên.

---

### 3.3 Ngành Hàng `IC` (Thận Nhân Tạo & Hồi Sức Tích Cực)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/IC`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FIC
  ```
- **Kỹ sư đầu mối ghi nhận**: Nguyễn Khả Tài.
- **Hãng thiết bị chủ lực**: **BAXTER / GAMBRO** (Chiếm tỷ trọng lớn nhất):
  1. **`BAXTER/A-AK96 Service Documents`**: Máy lọc thận nhân tạo chu kỳ Gambro AK 96 (tài liệu cân chỉnh, bảo trì bơm, van, cảm biến áp lực).
  2. **`BAXTER/B-AK98 Service Documents`**: Máy lọc thận nhân tạo thế hệ mới Baxter AK 98 (hệ thống điều khiển cảm ứng, hiệu chuẩn nhiệt độ, dẫn điện).
  3. **`BAXTER/C-Prismaflex`**: Hệ thống lọc máu liên tục cấp cứu (CRRT) Prismaflex (sơ đồ bo mạch, mã lỗi hệ thống cân và bơm nhu động).
  4. **`BAXTER/D-Prismax & TherMax`**: Hệ thống lọc máu liên tục tối tân Prismax kèm bộ làm ấm dịch tuần hoàn TherMax.
  5. **`BAXTER/E-WRO-WRO300`**: Hệ thống xử lý nước siêu tinh khiết thẩm thấu ngược (RO) dùng cho máy thận nhân tạo.
  6. **`BAXTER/G.AK200 Service Documents`**: Dòng máy thận truyền thống AK 200.
  7. **Hệ thống theo dõi đối tác**:
     - `DANH SÁCH TÀI LIỆU- từ 01- đến 129.xlsx` (117 KB)
     - `Danh sách tiếp nhận và xử lý thông tin từ đối tác _ 27NOV25.xlsx` (239 KB)
  8. **Các hãng khác**: `ECMO` (Hệ thống tim phổi nhân tạo), `Hillrom` (Giường hồi sức cấp cứu ICU), `Seca` (Cân y tế và máy phân tích thành phần cơ thể), `Vygon` (Bơm tiêm điện và thiết bị tim mạch ICU).

---

### 3.4 Ngành Hàng `CAI` (Sinh Hóa & Tự Động Hóa Phòng Xét Nghiệm)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/CAI`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FCAI
  ```
- **Kỹ sư đầu mối ghi nhận**: Nguyễn Thanh Tùng.
- **Dải sản phẩm & Giao thức LIS**:
  1. **`Furuno` (Nhật Bản)**: Dòng máy sinh hóa tự động tốc độ cao:
     - Dòng máy: CA-270, CA-400, CA-800.
     - LIS Protocol: Thư mục `LIS protocol/Furuno` chứa đầy đủ tài liệu truyền thông 2 chiều ASTM/Serial.
  2. **`Analyticon Biotechnologies` (Đức)**: Phân tích nước tiểu tự động:
     - Dòng máy: Urilyzer 100 Pro, Urilyzer 500 Pro.
     - LIS Protocol: Thư mục `LIS protocol/Analyticon` hỗ trợ chuẩn kết nối LIS bệnh viện.
  3. **`AVE`**: Máy phân tích cặn lắng nước tiểu tự động bằng phương pháp chụp ảnh soi kính hiển vi số (`LIS protocol/AVE`).
  4. **`EXIAS Medical` (Áo)**: Máy phân tích khí máu và điện giải thế hệ mới `EXIAS e|1 Analyzer`.
  5. **`Tokyo Boeki` (Nhật Bản)**: Dòng máy sinh hóa Biolis 24i, 30i, 50i.
  6. **`BioCare Medical` (Mỹ)**: Hệ thống nhuộm hóa mô miễn dịch tự động (IHC) IntelliPATH, ONCORE Pro.
  7. **`OTSUKA` (Nhật Bản)**: Máy đo quang phổ hồng ngoại xét nghiệm vi khuẩn HP qua hơi thở `POCone`.

---

### 3.5 Ngành Hàng `QIA` (Qiagen — Sinh Học Phân Tử)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/QIA`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FQIA
  ```
- **Kỹ sư đầu mối ghi nhận**: Hoàng Trọng Vinh.
- **Dải sản phẩm công nghệ cao**:
  1. **`EZ2 Connect Hardware`**: Hệ thống tách chiết acid nucleic tự động thông minh có kết nối đám mây.
  2. **`NeumoDX`**: Hệ thống Real-time PCR tích hợp phân tích tải lượng virus hoàn toàn tự động từ mẫu gốc.
  3. **`Qiacube Connect` & `Qiacube- Connect`**: Thiết bị tách chiết tự động theo nguyên lý cột ly tâm silica spin column.
  4. **`QIAcube HT / QIAxtractor`**: Hệ thống tách chiết tự động 96 mẫu thông lượng cao.
  5. **`Qiacuity`**: Hệ thống Digital PCR công nghệ vi ngăn nano (Nanoplate dPCR) tiên tiến nhất hiện nay.
  6. **`Qiaquant`**: Hệ thống Real-time PCR luân nhiệt 96 giếng.
  7. **`QIAstat-Dx Analyzer`**: Hệ thống xét nghiệm hội chứng nhiễm trùng cấp đa tác nhân (Syndromic testing) dạng cartridge khép kín.
  8. **`Qiasymphony`**: Hệ thống chuẩn bị mẫu và thiết lập phản ứng PCR tự động hoàn toàn công suất lớn.
  9. **`Rotor Gene Q`**: Thiết bị Real-time PCR thiết kế buồng ly tâm tròn đồng đều nhiệt độ hàng đầu thế giới.
  10. **Biểu mẫu QC**: `Checksheet QC New MM + QIA 15052025.xlsx` (50.3 MB), `Biên bản đánh giá máy nhập kho QIA.xlsx`.

---

### 3.6 Ngành Hàng `MM` (Sinh Học Phân Tử & Vi Sinh)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/MM`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FMM
  ```
- **Kỹ sư đầu mối ghi nhận**: Hoàng Trọng Vinh.
- **Dải thiết bị chuyên sâu**:
  1. **`CFX96` & `CFX Opus`**: Hệ thống Real-time PCR chuyên dụng của Bio-Rad (CFX96 Touch, CFX Opus 96).
  2. **`Nimbus` & `Starlet`**: Robot hút mẫu và phân phối chất lỏng tự động chuẩn phòng Lab của Hamilton Robotics.
  3. **`Seeprep32`**: Máy tách chiết từ tính tự động của Seegene.
  4. **`Mindray`**: Các thiết bị giải pháp sinh học phân tử phối hợp.
  5. **`Biên bản đánh giá máy nhập kho MM.xlsx`** & `PM Check List`.

---

### 3.7 Ngành Hàng `BB` (Ngân Hàng Máu & Huyết Học Lâm Sàng)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/BB`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FBB
  ```
- **Kỹ sư đầu mối ghi nhận**: Nguyễn Khả Tài, Phan Công Kiên.
- **Nội dung chủ lực**:
  1. **`BB-TerumoBCT`**: Thiết bị chiết tách tế bào máu tự động Trima Accel, hệ thống bất hoạt mầm bệnh Mirasol PRT, máy hàn dây túi máu TSCD.
  2. **`Tài liệu BB`**: Các quy trình kỹ thuật ngân hàng máu, chứng chỉ kiểm định và hướng dẫn vận hành chuẩn.

---

### 3.8 Ngành Hàng `IMD` & `MATC` (Chẩn Đoán Hình Ảnh & Hồi Sức Chuyên Sâu)
- **Đường dẫn IMD**: `/Shared Documents/CCC/TSC/IMD`
  - `Carestream`: Hệ thống máy in phim laser y tế DryView (DryView 5700, 5950, 6950).
  - `Fujifilm`: Hệ thống nội soi tiêu hóa kỹ thuật số độ phân giải cao, máy siêu âm Sonosite, hệ thống X-quang FCR/FDR.
  - `Karl Storz`: Hệ thống dàn máy nội soi phẫu thuật tiêu chuẩn phòng mổ OR1.
- **Đường dẫn MATC**: `/Shared Documents/CCC/TSC/MATC`
  - `Medtronic`: Dòng máy thở hồi sức cấp cứu chuyên sâu Puritan Bennett (PB 840, PB 980).

---

### 3.9 Nhóm `IT` (Công Nghệ Thông Tin & Phần Mềm Kết Nối)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/IT`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FIT
  ```
- **Phân chia theo kỹ sư phụ trách**:
  1. **`Đinh Hoàng Sáng`**:
     - `DIAG/Server/Software.zip` (**123 MB**): Bộ cài phần mềm chẩn đoán, công cụ giả lập kết nối LIS Server/Client và công cụ cấu hình cổng truyền thông.
     - `DIAG/Client/`: Tài liệu và công cụ kiểm thử chiều nhận dữ liệu từ thiết bị.
     - `Documents/`: Hướng dẫn kỹ thuật và sơ đồ đấu nối mạng nội bộ.
  2. **`Lê Quốc Đạt`**, **`Phạm Việt Hoàng`**, **`Trịnh Quốc Khánh`**: Các thư mục dự án và công cụ tích hợp LIS chuyên biệt.
  3. **`IT.xlsx` (69.5 KB)**: Sổ theo dõi tài sản, địa chỉ IP mạng máy xét nghiệm và danh mục phiên bản phần mềm.

---

### 3.10 Nhóm `Các Vấn Đề Chung` (Vận Hành & Quy Trình Kỹ Thuật)
- **Đường dẫn thư mục**: `/Shared Documents/CCC/TSC/Các vấn đề chung`
- **URL truy cập**:
  ```
  https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FC%C3%A1c%20v%E1%BA%A5n%20%C4%91%E1%BB%81%20chung
  ```
- **Hệ thống văn bản & Biểu mẫu nghiệp vụ đang áp dụng**:
  1. `Part order_Quy trình đặt hàng phụ kiện_ Rev04_T02.2026.xlsx` (**670 KB**, cập nhật mới nhất): Biểu mẫu và quy trình đặt phụ tùng linh kiện thay thế gửi hãng và kho tổng.
  2. `Gói dịch vụ bảo hành - bảo dưỡng_không giá linh kiện.xlsx` (**815 KB**): Khung định mức vật tư tiêu hao và các bước kiểm tra cho gói dịch vụ bảo trì định kỳ.
  3. `Kỹ sư trưởng vùng.xlsx` (**2.47 MB**): Bảng phân công địa bàn phụ trách, đầu mối kỹ thuật các bệnh viện tại TP.HCM và các tỉnh lân cận.
  4. `Xe di chuyển 20km.xlsx` (**367 KB**): Quy chế tính công tác phí và đăng ký phương tiện di chuyển phục vụ sự cố khẩn cấp.
  5. `Vướng mắc làm việc với hãng.xlsx` (**21.9 KB**): Nhật ký theo dõi các ca khó phát sinh (escalation tickets) gửi chuyên gia kỹ thuật hãng (Bio-Rad, Nihon Kohden, Baxter...).
  6. `Danh sách bán máy nihon 2020-2024.xlsx` (**91.5 KB**): Cơ sở dữ liệu danh mục máy lưu hành tại các phòng xét nghiệm.

---

## 4. Kiến Trúc Tích Hợp Vào Web Portal (`src/features/*`)

Để biến kho tài liệu khổng lồ này thành tài nguyên hoạt động mượt mà cho 14 kỹ sư trên Next.js Portal:

### 4.1 Module `src/features/knowledge/` (Tra Cứu Tài Liệu)
- Cập nhật mô hình dữ liệu (`types.ts`) với trường `department` và bổ sung danh sách Hãng chuẩn xác:
  ```typescript
  export type DepartmentCode = 'BIORAD' | 'HES' | 'IC' | 'CAI' | 'QIA' | 'MM' | 'BB' | 'IMD' | 'IT' | 'GENERAL';
  ```
- Lập chỉ mục tài liệu thực tế trong `data.ts` với đầy đủ keywords chuyên ngành (ASTM, HL7, Baudrate, Pinout, Service, PM).
- Thiết lập nút `View on SharePoint` với thuộc tính `target="_blank" rel="noopener noreferrer"`.

### 4.2 Module `src/features/tools/` (Tải Phần Mềm Kỹ Thuật)
- Đối với file lớn như `Software.zip` (123 MB) trong thư mục IT của anh Đinh Hoàng Sáng:
  - Khuyến nghị đưa bản sao cài đặt lên **GitHub Releases** của repo `tool-manager-kythuatphuongdonghcm` để kỹ sư đi viện có thể tải 1-click tốc độ cao không lo đứt mạng.
  - Trên web portal cung cấp song song 2 nút:
    1. **Primary**: Tải trực tiếp từ GitHub Releases CDN (Kèm mã SHA-256 đối soát).
    2. **Secondary**: Mở thư mục gốc trên SharePoint công ty (`IT/Đinh Hoàng Sáng/DIAG/Server`).

---

## 5. Kết Luận & Giá Trị Đóng Góp
Bản đồ cấu trúc này đã hệ thống hóa toàn bộ tài sản số của Trung tâm Kỹ thuật Phương Đông từ hàng trăm gigabyte trên SharePoint thành một cấu trúc logic, phân tầng rõ ràng. Đây là nền tảng cốt lõi giúp hệ sinh thái **HCM Engineering Portal** vận hành chính xác, tiện lợi, tiết kiệm hàng trăm giờ tìm kiếm tài liệu cho đội ngũ kỹ sư thực địa.
