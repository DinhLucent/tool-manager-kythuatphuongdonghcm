import { ToolRelease } from './types';

/**
 * Verified engineering software, diagnostic suites, and Ghost OS images
 * categorized by Product Line (Ngành Hàng).
 */
export const SAMPLE_TOOLS_DATA: ToolRelease[] = [
  // ==========================================
  // IT & LIS CORE TOOLS (Đinh Hoàng Sáng)
  // ==========================================
  {
    id: 'tool-diag-server',
    name: 'Phuong Dong LIS Diagnostic & Server Suite (Đinh Hoàng Sáng)',
    slug: 'pd-lis-diagnostic-suite',
    description: 'Bộ công cụ kiểm thử chẩn đoán và giả lập máy chủ LIS Server chuyên dụng của Kỹ sư Đinh Hoàng Sáng lưu trữ tại SharePoint TSC/IT/DIAG/Server.',
    category: 'diagnostic',
    department: 'IT',
    deviceModel: 'Immulite 2000, Immunomat, Bio-Rad, Furuno, MEK',
    version: 'v2023.11',
    releaseDate: '2023-11-08',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Trích xuất trực tiếp từ kho SharePoint nội bộ IT/Đinh Hoàng Sáng/DIAG/Server.\n• Bộ giả lập kết nối LIS Server/Client cho các dòng máy xét nghiệm Immulite 2000, Immunomat, Bio-Rad, Furuno.\n• Tích hợp công cụ giám sát cổng COM và phân tích gói tin ASTM/HL7.\n• File đã được tải và kiểm tra toàn vẹn mã băm SHA-256.',
    downloadUrl: '/downloads/Software.zip',
    sha256Checksum: 'e1c05a117de5933b9aab71a6141aa5d94df87acc4fd0f55013e3c12c75477aee',
    fileSizeBytes: 128649545, // 122.69 MB
    isActive: true,
    isSampleData: false,
    storageLocation: 'local',
    sharepointUrl: 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FIT%2F%C4%90inh%20Ho%C3%A0ng%20S%C3%A1ng%2FDIAG%2FServer',
  },

  // ==========================================
  // GENERAL (Công Cụ Kỹ Thuật Dùng Chung)
  // ==========================================
  {
    id: 'tool-astm-calc',
    name: 'ASTM 1381/1394 Checksum Calculator & Frame Verifier',
    slug: 'astm-checksum-calculator',
    description: 'Tiện ích script PowerShell gọn nhẹ (zero-dependency) giúp kỹ sư tính nhanh mã Checksum Modulo 256 và kiểm tra khung truyền ASTM E1381/1394 tại hiện trường phòng xét nghiệm.',
    category: 'utility',
    department: 'GENERAL',
    deviceModel: 'Tất cả máy xét nghiệm dùng giao thức ASTM',
    version: 'v1.0.0',
    releaseDate: '2026-10-22',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Chạy trực tiếp qua PowerShell không cần cài đặt phần mềm ngoài.\n• Tính chuẩn mã 2 ký tự Hex theo thuật toán tổng byte modulo 256 từ sau STX đến ETX/ETB.\n• Hiển thị cấu trúc khung hoàn chỉnh trên đường truyền wire.',
    downloadUrl: '/downloads/ASTM_Checksum_Calculator.ps1',
    fileSizeBytes: 1711,
    isActive: true,
    isSampleData: false,
    storageLocation: 'local',
  },
  {
    id: 'tool-serial-loopback',
    name: 'Serial COM Port Enumerate & Loopback Test Script',
    slug: 'serial-com-loopback-tester',
    description: 'Script PowerShell tự động dò tìm danh sách tất cả cổng COM máy tính (bao gồm cổng Moxa UPort) và kiểm tra vòng lặp Loopback trên Pin 2 (Rx) và Pin 3 (Tx) của đầu cắm DB9.',
    category: 'utility',
    department: 'GENERAL',
    deviceModel: 'Cổng nối tiếp RS-232 / USB-Serial Converter',
    version: 'v1.0.0',
    releaseDate: '2026-10-22',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Quét nhanh danh sách cổng COM đang kích hoạt trên thiết bị.\n• Tự động gửi chuỗi test và so sánh chuỗi nhận về qua cổng nối tiếp.\n• Hỗ trợ cấu hình tốc độ baud tùy chọn: 9600, 19200, 115200 bps.',
    downloadUrl: '/downloads/Serial_COM_Loopback_Test.ps1',
    fileSizeBytes: 2652,
    isActive: true,
    isSampleData: false,
    storageLocation: 'local',
  },
  {
    id: 'tool-moxa-driver',
    name: 'Moxa UPort 1100 Series Certified USB-Serial Driver',
    slug: 'moxa-uport-driver',
    description: 'Bộ driver chuẩn ký số chứng chỉ WHQL của hãng Moxa cho cáp chuyển đổi USB-to-RS232/422/485 Moxa UPort 1110 / 1150 dùng trên toàn bộ máy xét nghiệm Phương Đông.',
    category: 'serial_driver',
    department: 'GENERAL',
    deviceModel: 'Moxa UPort 1110, UPort 1150',
    version: 'v1.12.0',
    releaseDate: '2026-06-10',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Driver chứng chỉ số 64-bit WHQL chuẩn cho Windows 10/11.\n• Khắc phục triệt để lỗi màn hình xanh IRQL trên cổng USB 3.2.\n• Tự động khóa tốc độ baud chuẩn cho thiết bị y tế (9600 8-N-1).',
    downloadUrl: '#pending-upload',
    sha256Checksum: undefined,
    fileSizeBytes: undefined,
    isActive: false,
    isSampleData: true,
    storageLocation: 'github',
  },

  // ==========================================
  // BIORAD (Ngành Hàng Sinh Hóa - Miễn Dịch & Truyền Máu)
  // ==========================================
  {
    id: 'tool-biorad-lis',
    name: 'Bio-Rad EVOLIS & D-100 LIS Middleware Connector',
    slug: 'biorad-lis-connector',
    description: 'Phần mềm trung gian kết nối máy phân tích miễn dịch tự động Bio-Rad Evolis và máy đo sắc ký lỏng HbA1c D-100 vào hệ thống LIS bệnh viện theo chuẩn ASTM 1381/1394.',
    category: 'lis_bridge',
    department: 'BIORAD',
    deviceModel: 'Bio-Rad EVOLIS, EVOLIS TWIN PLUS, D-100 HPLC',
    version: 'v2.4.1',
    releaseDate: '2026-08-15',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Xử lý timeout ký tự khung truyền trên cổng COM4 RS-232 cũ.\n• Bổ sung watchdog tự động khôi phục kết nối khi mất tín hiệu cáp.\n• Xác thực mã băm checksum cho gói tin kết quả nhiều phân đoạn.',
    downloadUrl: '#pending-upload',
    sha256Checksum: undefined,
    fileSizeBytes: undefined,
    isActive: false,
    isSampleData: true,
    storageLocation: 'github',
  },
  {
    id: 'ghost-biorad-evolis',
    name: 'Bản Ghost Hệ Điều Hành Máy Bio-Rad EVOLIS / D-100 (Dự Kiến)',
    slug: 'ghost-biorad-evolis',
    description: 'Hình ảnh sao lưu nguyên bản hệ thống (Ghost OS Image .tib/.gho) đã cài sẵn phần mềm điều khiển Evolis / D-100 và cấu hình chuẩn môi trường máy trạm.',
    category: 'ghost_image',
    department: 'BIORAD',
    deviceModel: 'Bio-Rad EVOLIS, D-100 HPLC Workstation',
    version: 'v1.0-Pending',
    releaseDate: '2026-10-25',
    supportedOS: ['Windows 10', 'Windows 7/8 (Legacy)'],
    releaseNotes: '• Vị trí chuẩn bị sẵn cho bản Ghost kỹ thuật do Kỹ sư Ngành hàng Bio-Rad cung cấp.\n• Sau khi cung cấp file, hệ thống sẽ tự động cập nhật dung lượng và mã SHA-256.',
    downloadUrl: '#pending-upload',
    fileSizeBytes: 0,
    isActive: false,
    isSampleData: false,
    storageLocation: 'pending_upload',
    ghostNote: 'Chuẩn boot Legacy/MBR & UEFI, tích hợp sẵn driver máy in và card truyền thông COM.',
  },

  // ==========================================
  // HES (Ngành Hàng Huyết Học & Đông Máu)
  // ==========================================
  {
    id: 'tool-hes-nk-connector',
    name: 'Nihon Kohden Celltac MEK Series LIS & HL7 Connector',
    slug: 'nihon-kohden-mek-connector',
    description: 'Phần mềm giao tiếp kết nối máy xét nghiệm huyết học Nihon Kohden MEK-6500 / MEK-7300 / MEK-9100 / MEK-9200, hỗ trợ xuất kết quả 5 thành phần bạch cầu và biểu đồ tán xạ qua mạng LAN TCP/IP hoặc Serial.',
    category: 'lis_bridge',
    department: 'HES',
    deviceModel: 'Nihon Kohden MEK-6500, MEK-7300, MEK-9100',
    version: 'v1.8.4',
    releaseDate: '2026-07-20',
    supportedOS: ['Windows 10', 'Windows 11'],
    releaseNotes: '• Hỗ trợ đầy đủ dữ liệu biểu đồ phân bố kích thước tế bào máu (Scattergram).\n• Tự động kết nối lại khi socket LAN bị ngắt kết nối.',
    downloadUrl: '#pending-upload',
    sha256Checksum: undefined,
    fileSizeBytes: undefined,
    isActive: false,
    isSampleData: true,
    storageLocation: 'github',
  },
  {
    id: 'ghost-hes-mek9100',
    name: 'Bản Ghost Hệ Điều Hành Máy Huyết Học Nihon Kohden MEK-9100 (Dự Kiến)',
    slug: 'ghost-hes-mek9100',
    description: 'Bản sao lưu ổ cứng tiêu chuẩn cho máy trạm xét nghiệm huyết học MEK-9100 kèm phần mềm chuyên dụng và cấu hình card mạng kép.',
    category: 'ghost_image',
    department: 'HES',
    deviceModel: 'Celltac G MEK-9100 Workstation',
    version: 'v1.0-Pending',
    releaseDate: '2026-10-25',
    supportedOS: ['Windows 10'],
    releaseNotes: '• Mục chờ tiếp nhận bản Ghost hệ điều hành máy huyết học MEK-9100 từ Kỹ sư phụ trách ngành HES.\n• Sẽ tải lên lưu trữ an toàn kèm mã kiểm tra hash.',
    downloadUrl: '#pending-upload',
    fileSizeBytes: 0,
    isActive: false,
    isSampleData: false,
    storageLocation: 'pending_upload',
    ghostNote: 'Dung lượng ổ 128GB/256GB SSD, tối ưu hóa dịch vụ chạy ngầm của Windows.',
  },

  // ==========================================
  // IC (Ngành Hàng Thận Nhân Tạo & Hồi Sức Tích Cực)
  // ==========================================
  {
    id: 'tool-ic-baxter-suite',
    name: 'Baxter AK 96 & Prismaflex Diagnostic Service Toolkit',
    slug: 'baxter-service-toolkit',
    description: 'Bộ công cụ chẩn đoán và cân chỉnh thông số bơm máu, cảm biến áp lực và màng lọc siêu lọc UF cho máy chạy thận nhân tạo Baxter AK 96 và hệ thống lọc máu liên tục Prismaflex.',
    category: 'diagnostic',
    department: 'IC',
    deviceModel: 'Baxter AK 96, AK 98, Prismaflex CRRT',
    version: 'v3.2.0',
    releaseDate: '2026-05-18',
    supportedOS: ['Windows 10', 'Windows 11'],
    releaseNotes: '• Bổ sung bảng tính toán sai số cân điện tử 4 thang đo của máy Prismaflex.\n• Nhật ký hiệu chuẩn màng lọc và van phân phối chất khử trùng.',
    downloadUrl: 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FIC%2FBAXTER',
    fileSizeBytes: 15728640, // ~15 MB
    isActive: true,
    isSampleData: false,
    storageLocation: 'sharepoint',
  },
  {
    id: 'ghost-ic-baxter',
    name: 'Bản Ghost Máy Tính Chuyên Dụng Thận Nhân Tạo Baxter (Dự Kiến)',
    slug: 'ghost-ic-baxter',
    description: 'Hình ảnh sao lưu nguyên bản hệ thống phục vụ thay thế ổ cứng máy tính điều khiển trung tâm hệ thống lọc máu Baxter.',
    category: 'ghost_image',
    department: 'IC',
    deviceModel: 'Baxter Dialysis Control Unit',
    version: 'v1.0-Pending',
    releaseDate: '2026-10-25',
    supportedOS: ['Windows 10', 'Windows 7/8 (Legacy)'],
    releaseNotes: '• Vị trí chờ tiếp nhận bản Ghost từ Kỹ sư chuyên trách ngành Thận & Hồi sức tích cực.',
    downloadUrl: '#pending-upload',
    fileSizeBytes: 0,
    isActive: false,
    isSampleData: false,
    storageLocation: 'pending_upload',
    ghostNote: 'Cài sẵn bộ driver điều khiển giao tiếp bo mạch chủ công nghiệp.',
  },

  // ==========================================
  // CAI (Ngành Hàng Sinh Hóa, Nước Tiểu & Tự Động Hóa)
  // ==========================================
  {
    id: 'tool-cai-furuno-urilyzer',
    name: 'Analyticon Urilyzer & Furuno CA-270 LIS Communication Tool',
    slug: 'urilyzer-furuno-lis-tool',
    description: 'Phần mềm trích xuất dữ liệu xét nghiệm nước tiểu Analyticon Urilyzer 100/500 Pro và sinh hóa tự động Furuno CA-270/400 sang định dạng tiêu chuẩn ASTM / HL7.',
    category: 'lis_bridge',
    department: 'CAI',
    deviceModel: 'Analyticon Urilyzer 100/500 Pro, Furuno CA-270/400',
    version: 'v2.1.0',
    releaseDate: '2026-04-12',
    supportedOS: ['Windows 10', 'Windows 11'],
    releaseNotes: '• Tích hợp bộ giải mã cặn nước tiểu và cờ cảnh báo bất thường.\n• Cấu hình linh hoạt tốc độ baud 9600 / 19200.',
    downloadUrl: 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FCAI%2FService%2FLIS%20protocol',
    fileSizeBytes: 12582912, // ~12 MB
    isActive: true,
    isSampleData: false,
    storageLocation: 'sharepoint',
  },

  // ==========================================
  // QIA & MM (Ngành Hàng Sinh Học Phân Tử & PCR)
  // ==========================================
  {
    id: 'tool-qia-rotorgene',
    name: 'Qiagen Rotor-Gene Q & Q-Rex Software Utility Pack',
    slug: 'qia-rotorgene-utility',
    description: 'Bộ tiện ích phân tích kết quả huỳnh quang PCR và kiểm chuẩn quang học cho máy Real-Time PCR ly tâm Qiagen Rotor-Gene Q.',
    category: 'diagnostic',
    department: 'QIA',
    deviceModel: 'Qiagen Rotor-Gene Q 2plex / 5plex / 6plex',
    version: 'v2.3.5',
    releaseDate: '2025-11-10',
    supportedOS: ['Windows 10', 'Windows 11'],
    releaseNotes: '• Công cụ kiểm tra độ đồng đều nhiệt độ buồng quay centrifugal.\n• Tiện ích xuất dữ liệu định lượng Ct sang định dạng Excel/CSV.',
    downloadUrl: 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC%2FQIA%2FRotor%20Gene%20Q',
    fileSizeBytes: 33554432, // ~32 MB
    isActive: true,
    isSampleData: false,
    storageLocation: 'sharepoint',
  },
];
