import { KnowledgeDocument } from './types';

const SHAREPOINT_BASE = 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC';

/**
 * Danh mục thư mục tài liệu kỹ thuật theo ngành hàng tại kho SharePoint Phương Đông Medical.
 * Kỹ sư đăng nhập bằng tài khoản Microsoft 365 Phương Đông (@phuongdong.com.vn) để mở toàn văn.
 */
export const SAMPLE_DOCUMENTS_DATA: KnowledgeDocument[] = [
  // ==========================================
  // 1. BIORAD (Sinh Hóa - Miễn Dịch & Truyền Máu)
  // ==========================================
  {
    id: 'doc-bio-001',
    title: 'Bio-Rad EVOLIS & EVOLIS Twin Plus — Tài Liệu Service & Kết Nối LIS',
    manufacturer: 'Bio-Rad',
    department: 'BIORAD',
    deviceModel: 'EVOLIS / EVOLIS Twin Plus',
    docType: 'service_manual',
    keywords: ['Bio-Rad', 'EVOLIS', 'ELISA', 'LIS protocol', 'ASTM 1381', 'ASTM 1394'],
    documentUrl: `${SHAREPOINT_BASE}%2FBIORAD%2FLIS%20protocol`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/BIORAD/LIS protocol',
    summary: 'Tài liệu hướng dẫn kỹ thuật, bảo trì và kết nối LIS cho hệ thống miễn dịch vi đĩa ELISA tự động 4 đĩa Bio-Rad EVOLIS.',
    uploadedAt: '2024-12-09',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-bio-002',
    title: 'Bio-Rad D-100 & D-10 — Tài Liệu Kỹ Thuật & Giao Thức LIS',
    manufacturer: 'Bio-Rad',
    department: 'BIORAD',
    deviceModel: 'D-100 / D-10 HPLC',
    docType: 'interface_spec',
    keywords: ['Bio-Rad', 'D-100', 'D-10', 'HPLC', 'HbA1c', 'ASTM', 'LIS'],
    documentUrl: `${SHAREPOINT_BASE}%2FBIORAD`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/BIORAD',
    summary: 'Tài liệu kỹ thuật máy đo sắc ký lỏng hiệu năng cao HPLC xét nghiệm HbA1c và biến thể huyết sắc tố Bio-Rad D-100 / D-10.',
    uploadedAt: '2024-10-15',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-bio-003',
    title: 'Bio-Rad IH-500 & Saxo — Hệ Thống Định Nhóm Máu Gelcard',
    manufacturer: 'Bio-Rad',
    department: 'BIORAD',
    deviceModel: 'IH-500 / Saxo / IH-Com',
    docType: 'service_manual',
    keywords: ['Bio-Rad', 'IH-500', 'Saxo', 'Gelcard', 'Nhóm máu', 'IH-Com'],
    documentUrl: `${SHAREPOINT_BASE}%2FBIORAD%2FIH500`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/BIORAD/IH500',
    summary: 'Tài liệu hướng dẫn vận hành, bảo trì và phần mềm quản lý IH-Com cho hệ thống định nhóm máu tự động IH-500.',
    uploadedAt: '2024-11-20',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-bio-004',
    title: 'Bio-Rad PR4100 & PW40 — Đầu Đọc & Máy Rửa Vi Đĩa ELISA',
    manufacturer: 'Bio-Rad',
    department: 'BIORAD',
    deviceModel: 'PR4100 / PW40',
    docType: 'service_manual',
    keywords: ['Bio-Rad', 'PR4100', 'PW40', 'Đầu đọc ELISA', 'Máy rửa vi đĩa'],
    documentUrl: `${SHAREPOINT_BASE}%2FBIORAD%2FLIS%20protocol`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/BIORAD/LIS protocol',
    summary: 'Tài liệu kỹ thuật và giao thức kết nối đầu đọc hấp thụ quang vi đĩa Bio-Rad PR4100 và máy rửa 96 giếng PW40.',
    uploadedAt: '2024-09-05',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 2. HES (Huyết Học & Đông Máu)
  // ==========================================
  {
    id: 'doc-hes-001',
    title: 'Nihon Kohden Celltac MEK-9100 / MEK-9200 — LIS Protocol HL7 & Service Manual',
    manufacturer: 'Nihon Kohden',
    department: 'HES',
    deviceModel: 'Celltac G MEK-9100 / MEK-9200',
    docType: 'interface_spec',
    keywords: ['Nihon Kohden', 'MEK-9100', 'MEK-9200', 'HL7', 'Huyết học 5 thành phần', 'LAN TCP/IP'],
    documentUrl: `${SHAREPOINT_BASE}%2FHES%2FSERVICE%20MATERIALS%2FLIS%20protocol%2FNihon%20Kohden`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/HES/SERVICE MATERIALS/LIS protocol/Nihon Kohden',
    summary: 'Đặc tả giao thức truyền thông HL7 qua mạng LAN TCP/IP và tài liệu kỹ thuật máy xét nghiệm huyết học tự động Nihon Kohden MEK-9100.',
    uploadedAt: '2024-11-18',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-hes-002',
    title: 'Nihon Kohden Celltac MEK-6500 / MEK-7300 / MEK-8222 — ASTM Protocol & Service',
    manufacturer: 'Nihon Kohden',
    department: 'HES',
    deviceModel: 'Celltac α MEK-6500 / MEK-7300 / MEK-8222',
    docType: 'interface_spec',
    keywords: ['Nihon Kohden', 'MEK-6500', 'MEK-7300', 'MEK-8222', 'ASTM', 'Serial RS-232'],
    documentUrl: `${SHAREPOINT_BASE}%2FHES%2FSERVICE%20MATERIALS%2FLIS%20protocol%2FNihon%20Kohden`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/HES/SERVICE MATERIALS/LIS protocol/Nihon Kohden',
    summary: 'Tài liệu hướng dẫn giao tiếp LIS theo chuẩn ASTM và tài liệu bảo trì dòng máy xét nghiệm huyết học Nihon Kohden Celltac alpha.',
    uploadedAt: '2024-10-12',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 3. IC (Hồi Sức Cấp Cứu & Thận Nhân Tạo)
  // ==========================================
  {
    id: 'doc-ic-001',
    title: 'Baxter AK 96 & AK 98 — Máy Thận Nhân Tạo Service Documents',
    manufacturer: 'Baxter',
    department: 'IC',
    deviceModel: 'AK 96 / AK 98',
    docType: 'service_manual',
    keywords: ['Baxter', 'Gambro', 'AK 96', 'AK 98', 'Thận nhân tạo', 'Hemodialysis'],
    documentUrl: `${SHAREPOINT_BASE}%2FIC%2FBAXTER%2FA-AK96%20Service%20Documents`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/IC/BAXTER/A-AK96 Service Documents',
    summary: 'Bộ tài liệu hướng dẫn kỹ thuật, sơ đồ thủy lực, bảng mã lỗi và quy trình bảo dưỡng định kỳ máy thận nhân tạo Baxter AK 96 / AK 98.',
    uploadedAt: '2024-08-30',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-ic-002',
    title: 'Baxter Prismaflex & Prismax — Hệ Thống Lọc Máu Liên Tục (CRRT)',
    manufacturer: 'Baxter',
    department: 'IC',
    deviceModel: 'Prismaflex / Prismax / TherMax',
    docType: 'service_manual',
    keywords: ['Baxter', 'Prismaflex', 'Prismax', 'CRRT', 'Lọc máu liên tục', 'ICU'],
    documentUrl: `${SHAREPOINT_BASE}%2FIC%2FBAXTER%2FC-Prismaflex`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/IC/BAXTER/C-Prismaflex',
    summary: 'Tài liệu dịch vụ kỹ thuật hệ thống lọc máu liên tục và thay huyết tương Baxter Prismaflex / Prismax tại khoa Hồi sức tích cực.',
    uploadedAt: '2024-09-14',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 4. CAI (Sinh Hóa & Nước Tiểu)
  // ==========================================
  {
    id: 'doc-cai-001',
    title: 'Analyticon Urilyzer 100 / 500 Pro — LIS Protocol & Service Manual',
    manufacturer: 'Analyticon',
    department: 'CAI',
    deviceModel: 'Urilyzer 100 Pro / 500 Pro',
    docType: 'interface_spec',
    keywords: ['Analyticon', 'Urilyzer', 'Nước tiểu', 'ASTM', 'LIS'],
    documentUrl: `${SHAREPOINT_BASE}%2FCAI%2FService%2FLIS%20protocol%2FAnalyticon`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/CAI/Service/LIS protocol/Analyticon',
    summary: 'Tài liệu kỹ thuật và đặc tả kết nối LIS cho máy phân tích nước tiểu bán tự động và tự động Analyticon Urilyzer.',
    uploadedAt: '2024-07-22',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-cai-002',
    title: 'Furuno CA-270 / CA-400 — Máy Xét Nghiệm Sinh Hóa Tự Động',
    manufacturer: 'Furuno',
    department: 'CAI',
    deviceModel: 'Furuno CA-270 / CA-400',
    docType: 'service_manual',
    keywords: ['Furuno', 'CA-270', 'CA-400', 'Sinh hóa tự động', 'LIS protocol'],
    documentUrl: `${SHAREPOINT_BASE}%2FCAI%2FService%2FLIS%20protocol%2FFuruno`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/CAI/Service/LIS protocol/Furuno',
    summary: 'Tài liệu hướng dẫn bảo trì kỹ thuật và kết nối hệ thống thông tin phòng xét nghiệm cho máy sinh hóa Furuno CA-270 / CA-400.',
    uploadedAt: '2024-08-05',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 5. QIA (Sinh Học Phân Tử - Qiagen)
  // ==========================================
  {
    id: 'doc-qia-001',
    title: 'Qiagen Rotor-Gene Q — Real-Time PCR Service & Connectivity',
    manufacturer: 'Qiagen',
    department: 'QIA',
    deviceModel: 'Rotor-Gene Q 5/6 Plex',
    docType: 'service_manual',
    keywords: ['Qiagen', 'Rotor-Gene Q', 'Real-time PCR', 'Rotary', 'Phần mềm Q-Rex'],
    documentUrl: `${SHAREPOINT_BASE}%2FQIA%2FRotor%20Gene%20Q`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/QIA/Rotor Gene Q',
    summary: 'Tài liệu hướng dẫn hiệu chuẩn quang học, bảo trì cơ điện và kết nối phần mềm cho máy Real-time PCR dạng quay Qiagen Rotor-Gene Q.',
    uploadedAt: '2024-09-28',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-qia-002',
    title: 'Qiagen QIAcube Connect & EZ2 Connect — Máy Tách Chiết Tự Động',
    manufacturer: 'Qiagen',
    department: 'QIA',
    deviceModel: 'QIAcube Connect / EZ2 Connect',
    docType: 'service_manual',
    keywords: ['Qiagen', 'QIAcube', 'EZ2 Connect', 'Tách chiết DNA RNA'],
    documentUrl: `${SHAREPOINT_BASE}%2FQIA%2FQiacube%20Connect`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/QIA/Qiacube Connect',
    summary: 'Tài liệu bảo dưỡng và chẩn đoán kỹ thuật máy tách chiết acid nucleic tự động Qiagen QIAcube Connect và EZ2 Connect.',
    uploadedAt: '2024-10-02',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 6. MM (Sinh Học Phân Tử PCR & Vi Sinh)
  // ==========================================
  {
    id: 'doc-mm-001',
    title: 'Bio-Rad CFX96 Touch & CFX Opus — Real-Time PCR Systems',
    manufacturer: 'Bio-Rad',
    department: 'MM',
    deviceModel: 'CFX96 Touch / CFX Opus',
    docType: 'service_manual',
    keywords: ['Bio-Rad', 'CFX96', 'CFX Opus', 'Real-Time PCR', 'CFX Maestro'],
    documentUrl: `${SHAREPOINT_BASE}%2FMM%2FCFX96`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/MM/CFX96',
    summary: 'Tài liệu hướng dẫn kỹ thuật, căn chỉnh khối nhiệt (thermal cycler) và phần mềm CFX Maestro cho hệ thống Real-time PCR Bio-Rad.',
    uploadedAt: '2024-06-18',
    language: 'en',
    isSampleData: false,
  },
  {
    id: 'doc-mm-002',
    title: 'Hamilton Microlab STAR / Starlet — Robot Hút Mẫu Tự Động',
    manufacturer: 'Hamilton',
    department: 'MM',
    deviceModel: 'Microlab STAR / Starlet',
    docType: 'service_manual',
    keywords: ['Hamilton', 'Microlab STAR', 'Starlet', 'Liquid Handling', 'Robot hút mẫu'],
    documentUrl: `${SHAREPOINT_BASE}%2FMM%2FStarlet`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/MM/Starlet',
    summary: 'Tài liệu bảo trì và căn chỉnh hệ thống cánh tay robot hút mẫu chất lỏng tự động Hamilton Microlab Starlet.',
    uploadedAt: '2024-07-11',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 7. BB (Ngân Hàng Máu - Terumo BCT)
  // ==========================================
  {
    id: 'doc-bb-001',
    title: 'Terumo BCT Trima Accel & Mirasol — Máy Gạn Tách Tiểu Cầu',
    manufacturer: 'Terumo BCT',
    department: 'BB',
    deviceModel: 'Trima Accel / Mirasol PRT',
    docType: 'service_manual',
    keywords: ['Terumo BCT', 'Trima Accel', 'Mirasol', 'Gạn tách tiểu cầu', 'Ngân hàng máu'],
    documentUrl: `${SHAREPOINT_BASE}%2FBB%2FBB-TerumoBCT`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/BB/BB-TerumoBCT',
    summary: 'Tài liệu hướng dẫn kỹ thuật hệ thống gạn tách thành phần máu tự động Terumo BCT Trima Accel và thiết bị bất hoạt mầm bệnh Mirasol.',
    uploadedAt: '2024-08-19',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 8. IMD (Chẩn Đoán Hình Ảnh - Carestream)
  // ==========================================
  {
    id: 'doc-imd-001',
    title: 'Carestream DryView Laser Imager (5700 / 5950 / 6950) — Máy In Phim Y Tế',
    manufacturer: 'Carestream',
    department: 'IMD',
    deviceModel: 'DryView 5700 / 5950 / 6950',
    docType: 'service_manual',
    keywords: ['Carestream', 'DryView', 'DICOM Print', 'Máy in phim laser'],
    documentUrl: `${SHAREPOINT_BASE}%2FIMD%2FCarestream`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/IMD/Carestream',
    summary: 'Tài liệu dịch vụ kỹ thuật, cấu hình DICOM Print và bảo dưỡng đầu quang laser máy in phim y tế khô Carestream DryView.',
    uploadedAt: '2024-09-08',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 9. MATC (Hồi Sức Cấp Cứu - Medtronic)
  // ==========================================
  {
    id: 'doc-matc-001',
    title: 'Medtronic Puritan Bennett 840 / 980 — Máy Thở Điều Trị Tích Cực ICU',
    manufacturer: 'Medtronic',
    department: 'MATC',
    deviceModel: 'Puritan Bennett 840 / 980',
    docType: 'service_manual',
    keywords: ['Medtronic', 'Puritan Bennett', 'PB840', 'PB980', 'Máy thở ICU'],
    documentUrl: `${SHAREPOINT_BASE}%2FMATC%2FMedtronic`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/MATC/Medtronic',
    summary: 'Tài liệu kỹ thuật, sơ đồ khối khí nén, quy trình kiểm tra EST/SST và bảo trì máy thở điều trị tích cực Puritan Bennett.',
    uploadedAt: '2024-07-29',
    language: 'en',
    isSampleData: false,
  },

  // ==========================================
  // 10. IT (Công Nghệ Thông Tin & Mạng LIS)
  // ==========================================
  {
    id: 'doc-it-001',
    title: 'Tài Liệu Cấu Hình Mạng & Sổ Tay IT Phòng Xét Nghiệm (IT.xlsx)',
    manufacturer: 'Phuong Dong General',
    department: 'IT',
    deviceModel: 'Hạ tầng mạng & Máy chủ LIS',
    docType: 'procedure_policy',
    keywords: ['IT', 'Mạng phòng Lab', 'Cổng COM', 'IP máy xét nghiệm', 'IT.xlsx'],
    documentUrl: `${SHAREPOINT_BASE}%2FIT`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/IT',
    summary: 'Sổ tay kỹ thuật IT phòng xét nghiệm, hướng dẫn quy hoạch dải mạng LAN, bảo vệ chống virus và danh mục phần mềm kết nối LIS nội bộ.',
    uploadedAt: '2026-02-10',
    language: 'vi',
    isSampleData: false,
  },

  // ==========================================
  // 11. GENERAL (Quy Trình & Vấn Đề Chung)
  // ==========================================
  {
    id: 'doc-gen-001',
    title: 'Quy Trình Đặt Linh Kiện Phụ Tùng Thay Thế (Part Order)',
    manufacturer: 'Phuong Dong General',
    department: 'GENERAL',
    deviceModel: 'Tất cả thiết bị',
    docType: 'procedure_policy',
    keywords: ['Quy trình', 'Part order', 'Linh kiện thay thế', 'Biểu mẫu phê duyệt'],
    documentUrl: `${SHAREPOINT_BASE}%2FC%C3%A1c%20v%E1%BA%A5n%20%C4%91%E1%BB%81%20chung`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/Các vấn đề chung/Part order_Quy trình đặt hàng phụ kiện_ Rev04_T02.2026.xlsx',
    summary: 'Biểu mẫu chuẩn và quy trình phê duyệt đặt linh kiện phụ tùng thay thế phục vụ sửa chữa, bảo dưỡng thiết bị y tế tại các bệnh viện khu vực Miền Trung và Miền Nam.',
    uploadedAt: '2026-02-20',
    language: 'vi',
    isSampleData: false,
  },
  {
    id: 'doc-gen-002',
    title: 'Gói Dịch Vụ Bảo Hành & Bảo Dưỡng Thiết Bị Y Tế',
    manufacturer: 'Phuong Dong General',
    department: 'GENERAL',
    deviceModel: 'Tất cả thiết bị',
    docType: 'procedure_policy',
    keywords: ['Bảo hành', 'Bảo dưỡng định kỳ', 'Tiêu chuẩn kỹ thuật'],
    documentUrl: `${SHAREPOINT_BASE}%2FC%C3%A1c%20v%E1%BA%A5n%20%C4%91%E1%BB%81%20chung`,
    sharepointRelativePath: '/Shared Documents/CCC/TSC/Các vấn đề chung/Gói dịch vụ bảo hành - bảo dưỡng_không giá linh kiện.xlsx',
    summary: 'Quy chuẩn danh mục các hạng mục kiểm tra, vệ sinh, hiệu chuẩn máy định kỳ theo tiêu chuẩn hãng sản xuất cho đội ngũ kỹ sư hiện trường.',
    uploadedAt: '2026-02-15',
    language: 'vi',
    isSampleData: false,
  },
];
