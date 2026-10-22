import { EquipmentItem, BookingRecord } from './types';

/**
 * Danh mục thiết bị đo kiểm và dụng cụ kỹ thuật tại kho Phương Đông (phục vụ kỹ sư Miền Trung & Miền Nam).
 */
export const INITIAL_EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'eq-001',
    assetCode: 'EQ-001',
    name: 'Bộ chuyển đổi USB-to-Serial Moxa UPort 1150',
    category: 'interface_converter',
    serialNumber: 'MOX-1150-8849',
    status: 'available',
    location: 'Kho Kỹ Thuật - Tủ thiết bị A',
    description: 'Bộ chuyển đổi USB sang RS-232/422/485 chống sét lan truyền 15kV ESD phục vụ kết nối máy xét nghiệm với PC.',
  },
  {
    id: 'eq-002',
    assetCode: 'EQ-002',
    name: 'Đồng hồ vạn năng số Fluke 179 True-RMS',
    category: 'measuring',
    serialNumber: 'FLK-179-20491',
    status: 'available',
    location: 'Kho Kỹ Thuật - Tủ thiết bị A',
    description: 'Đồng hồ đo điện thế True-RMS đo kiểm tra độ ổn định nguồn điện, tiếp địa phòng Lab và tín hiệu cảm biến máy xét nghiệm.',
  },
  {
    id: 'eq-003',
    assetCode: 'EQ-003',
    name: 'Bộ kính lọc quang học chuẩn kiểm tra bước sóng Ocean Optics',
    category: 'calibrator',
    serialNumber: 'OOC-CAL-7712',
    status: 'available',
    location: 'Kho Kỹ Thuật - Tủ an toàn B',
    description: 'Kính lọc quang phổ chuẩn (340nm, 405nm, 505nm, 546nm, 600nm) hiệu chuẩn độ hấp thụ quang (OD) bộ quang học máy xét nghiệm.',
  },
  {
    id: 'eq-004',
    assetCode: 'EQ-004',
    name: 'Bộ dụng cụ bấm cáp DB9 / DB25 / RJ45 chuyên dụng',
    category: 'toolkit',
    serialNumber: 'TLK-CRIMP-04',
    status: 'available',
    location: 'Kho Kỹ Thuật - Hộp dụng cụ số 2',
    description: 'Kìm bấm cos, đầu cắm DB9 đực/cái, đầu chuyển đổi giới tính (gender changer) và thiết bị kiểm tra thông mạch dây dẫn.',
  },
  {
    id: 'eq-005',
    assetCode: 'EQ-005',
    name: 'Bộ chuyển đổi Serial-to-Ethernet Moxa NPort 5150',
    category: 'interface_converter',
    serialNumber: 'MOX-5150-9921',
    status: 'available',
    location: 'Kho Kỹ Thuật - Tủ thiết bị A',
    description: 'Thiết bị chuyển đổi cổng nối tiếp sang giao diện mạng LAN Ethernet IP phục vụ kết nối máy xét nghiệm ở xa máy tính LIS.',
  },
];

export const INITIAL_BOOKING_RECORDS: BookingRecord[] = [];
