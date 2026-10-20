import { ToolRelease } from './types';

/**
 * Verified release metadata repository for internal engineering tools.
 * Note: Records are clearly marked with `isSampleData: true` until connected to the production CDN/GitHub Releases API.
 */
export const SAMPLE_TOOLS_DATA: ToolRelease[] = [
  {
    id: 'tool-001',
    name: 'PhuongDong LIS Bridge — Roche Cobas Edition',
    slug: 'lis-bridge-cobas',
    description: 'Bi-directional middleware bridge connecting Roche Cobas c311/c501/e411 analysers to hospital laboratory information systems via ASTM 1394-91 / 1381 serial protocol.',
    category: 'lis_bridge',
    version: 'v2.4.1',
    releaseDate: '2026-08-15',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Resolved framing character timeout on legacy COM4 RS-232 ports.\n• Added automatic reconnect watchdog.\n• Enhanced checksum validation for multi-segment record packets.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/v2.4.1/PD-LISBridge-Cobas-v2.4.1-Setup.exe',
    sha256Checksum: '8f43b355d9be698f16bc451b66df4f71a0695a28f8f2b380bf9d9129e924bc91',
    fileSizeBytes: 48234496, // ~46 MB
    isActive: true,
    isSampleData: true,
  },
  {
    id: 'tool-002',
    name: 'Moxa UPort 1100 Series Certified USB-Serial Driver',
    slug: 'moxa-uport-driver',
    description: 'Standardized and digitally certified drivers for Moxa UPort 1110/1150 RS-232/422/485 to USB converter dongles used on all field installations.',
    category: 'serial_driver',
    version: 'v1.12.0',
    releaseDate: '2026-06-10',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Certified for 64-bit Windows kernel integrity.\n• Fixed blue-screen IRQL issue on USB 3.2 Gen 2 ports.\n• Added auto-baudrate lock for 9600 8-N-1 instruments.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/drivers/Moxa-UPort-v1.12.0-WHQL.zip',
    sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSizeBytes: 18454937, // ~17.6 MB
    isActive: true,
    isSampleData: true,
  },
  {
    id: 'tool-003',
    name: 'Medical ASTM 1394 & HL7 v2 Packet Inspector',
    slug: 'packet-inspector',
    description: 'Diagnostic loopback and packet validation utility to sniff raw byte streams, verify checksums, and simulate laboratory host handshake responses.',
    category: 'diagnostic',
    version: 'v3.1.0',
    releaseDate: '2026-09-02',
    supportedOS: ['Windows 10', 'Windows 11', 'Linux x64', 'macOS'],
    releaseNotes: '• Native MLLP framing support for TCP/IP laboratory networks.\n• Real-time hex vs ASCII split view.\n• Export session captures to sanitised JSON logs.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/v3.1.0/ASTM-HL7-Inspector-v3.1.0.zip',
    sha256Checksum: '7c98a58a9e223d5b03f0b2f694f4a3bc6f01a3539bc1d528b9a2123d8c11e389',
    fileSizeBytes: 31457280, // ~30 MB
    isActive: true,
    isSampleData: true,
  },
  {
    id: 'tool-004',
    name: 'Mindray BC Series Hematology LIS Connector',
    slug: 'mindray-bc-connector',
    description: 'Specialized interface driver for Mindray BC-5000 / BC-5380 / BC-6800 hematology analysers, supporting HL7 result extraction and flag mapping.',
    category: 'lis_bridge',
    version: 'v1.8.4',
    releaseDate: '2026-07-20',
    supportedOS: ['Windows 10', 'Windows 11'],
    releaseNotes: '• Full support for 5-part differential scattergram telemetry.\n• Auto-recovery on LAN socket disconnect.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/v1.8.4/Mindray-BC-Connector-Setup.exe',
    sha256Checksum: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    fileSizeBytes: 26214400, // ~25 MB
    isActive: true,
    isSampleData: true,
  },
  {
    id: 'tool-005',
    name: 'Sysmex XN Series Serial-to-Ethernet Daemon',
    slug: 'sysmex-xn-daemon',
    description: 'Background service bridging Sysmex XN-350 / XN-550 automated hematology units to central LIS via virtual COM port emulation over LAN.',
    category: 'lis_bridge',
    version: 'v2.0.2',
    releaseDate: '2026-05-30',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows Server 2019+'],
    releaseNotes: '• Improved buffer handling for emergency stat orders.\n• Configurable baud rates up to 115200 bps.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/v2.0.2/Sysmex-XN-Daemon-v2.0.2.msi',
    sha256Checksum: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    fileSizeBytes: 15728640, // ~15 MB
    isActive: true,
    isSampleData: true,
  },
  {
    id: 'tool-006',
    name: 'Serial Port Loopback & Baudrate Tester',
    slug: 'serial-loopback-tester',
    description: 'Lightweight portable utility to verify pin 2 (RX) and pin 3 (TX) loopback, CTS/RTS hardware handshaking, and ground continuity on DB9/DB25 cables.',
    category: 'utility',
    version: 'v1.0.5',
    releaseDate: '2026-03-12',
    supportedOS: ['Windows 10', 'Windows 11', 'Windows 7/8 (Legacy)'],
    releaseNotes: '• Single-executable binary (zero runtime dependencies).\n• Signal line status LEDs indicator in UI.',
    downloadUrl: 'https://github.com/phuongdong-med/lis-tools/releases/download/v1.0.5/SerialLoopbackTester.exe',
    sha256Checksum: '9f8e7d6c5b4a3210fedcba9876543210fedcba9876543210fedcba9876543210',
    fileSizeBytes: 3670016, // ~3.5 MB
    isActive: true,
    isSampleData: true,
  },
];
