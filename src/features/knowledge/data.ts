import { KnowledgeDocument } from './types';

/**
 * Standardized medical laboratory instrument document catalogue.
 * Note: Labelled with `isSampleData: true` representing indexed documents stored in Google Drive 5TB or internal CDN.
 */
export const SAMPLE_DOCUMENTS_DATA: KnowledgeDocument[] = [
  {
    id: 'doc-001',
    title: 'Roche Cobas 6000 / c501 Interface Specification (ASTM 1381/1394)',
    manufacturer: 'Roche',
    deviceModel: 'Cobas 6000 (c501, e601)',
    docType: 'interface_spec',
    keywords: ['ASTM 1394', 'ASTM 1381', 'Serial RS-232', 'Baudrate 9600', 'Framing', 'Cobas c501'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-cobas-spec',
    fileSizeBytes: 4299161, // ~4.1 MB
    summary: 'Complete ASTM bi-directional communications protocol specification for Cobas 6000 series, including header format, result record layout, and hardware handshaking lines.',
    uploadedAt: '2026-04-12',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-002',
    title: 'Sysmex XN-Series (XN-350 / XN-550) Service & Maintenance Manual',
    manufacturer: 'Sysmex',
    deviceModel: 'XN-350 / XN-550',
    docType: 'service_manual',
    keywords: ['Hydraulic schematics', 'Aspiration pump', 'Pinch valve', 'Laser optical unit', 'Error codes'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-sysmex-manual',
    fileSizeBytes: 15728640, // ~15 MB
    summary: 'Comprehensive service manual containing hydraulic flowcharts, sensor calibration procedures, optical flow cell alignment, and motherboard test points.',
    uploadedAt: '2026-05-18',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-003',
    title: 'Beckman Coulter Access 2 Immunoassay Host Interface & LIS Manual',
    manufacturer: 'Beckman Coulter',
    deviceModel: 'Access 2',
    docType: 'interface_spec',
    keywords: ['ASTM protocol', 'UniCel', 'Reagent barcoding', 'Worklist query', 'DB9 Pinout'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-beckman-access2',
    fileSizeBytes: 6291456, // ~6 MB
    summary: 'Host communication protocol guide for UniCel Access 2 immunoassay systems. Details query-response messaging, flag definitions, and sample tube barcode handling.',
    uploadedAt: '2026-06-22',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-004',
    title: 'Mindray BC-5380 5-Part Auto Hematology Service Runbook & Wiring',
    manufacturer: 'Mindray',
    deviceModel: 'BC-5380',
    docType: 'wiring_diagram',
    keywords: ['Wiring harness', 'Power supply module', 'RS-232 COM port', 'Pneumatic unit', 'WBC bath'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-mindray-bc5380',
    fileSizeBytes: 8912896, // ~8.5 MB
    summary: 'Wiring schematics, PCB jumper configurations, motor driver diagrams, and grounding specifications for Mindray BC-5380 field technicians.',
    uploadedAt: '2026-07-10',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-005',
    title: 'Mindray BS-200 / BS-240 Clinical Chemistry Field Troubleshooting Guide',
    manufacturer: 'Mindray',
    deviceModel: 'BS-200 / BS-240',
    docType: 'troubleshooting_guide',
    keywords: ['Photometer drift', 'Cuvette washing', 'Syringe leak', 'Lamp replacement', 'Calibration curve'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-mindray-bs200',
    fileSizeBytes: 5242880, // ~5 MB
    summary: 'Field reference for troubleshooting optical absorbance anomalies, water blank failures, halogen lamp degradation, and temperature control alarms.',
    uploadedAt: '2026-08-01',
    language: 'vi',
    isSampleData: true,
  },
  {
    id: 'doc-006',
    title: 'Abbott Architect c4000 HL7 & ASTM Host Interface Specification',
    manufacturer: 'Abbott',
    deviceModel: 'Architect c4000',
    docType: 'interface_spec',
    keywords: ['HL7 v2.3.1', 'MLLP', 'Ethernet port 2101', 'ASTM 1394', 'Result verification'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-abbott-c4000',
    fileSizeBytes: 7340032, // ~7 MB
    summary: 'Detailed HL7 message segmentation (MSH, PID, OBR, OBX) and ASTM mapping for Abbott Architect clinical chemistry analyzers.',
    uploadedAt: '2026-08-25',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-007',
    title: 'Moxa UPort 1110/1150 RS-232/422/485 Hardware & Pinout Manual',
    manufacturer: 'Moxa',
    deviceModel: 'UPort 1150',
    docType: 'wiring_diagram',
    keywords: ['DB9 male', 'Pin 2 RXD', 'Pin 3 TXD', 'Pin 5 GND', 'DIP switch settings', 'RS485 2-wire'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-moxa-uport',
    fileSizeBytes: 2097152, // ~2 MB
    summary: 'Pinout diagram and DIP switch settings for configuring Moxa UPort converters for RS-232, 4-wire RS-422, or 2-wire RS-485 laboratory instruments.',
    uploadedAt: '2026-09-05',
    language: 'en',
    isSampleData: true,
  },
  {
    id: 'doc-008',
    title: 'ASTM E1381 & E1394 Standard Implementation Guide for Field Engineers',
    manufacturer: 'General Standard',
    deviceModel: 'Standard ASTM 1381/1394',
    docType: 'interface_spec',
    keywords: ['ENQ/ACK handshake', 'Check sum modulo 256', 'ETX/ETB', 'Frame numbers', 'State transitions'],
    documentUrl: 'https://drive.google.com/drive/folders/sample-phuongdong-astm-standard',
    fileSizeBytes: 3145728, // ~3 MB
    summary: 'Essential field engineer primer on the ASTM data link and message layer: timing constraints, checksum calculation, and common handshake trap scenarios.',
    uploadedAt: '2026-09-14',
    language: 'vi',
    isSampleData: true,
  },
];
