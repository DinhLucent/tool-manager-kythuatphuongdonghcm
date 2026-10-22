export type DocType = 
  | 'service_manual' 
  | 'interface_spec' 
  | 'troubleshooting_guide' 
  | 'wiring_diagram' 
  | 'user_guide'
  | 'checksheet'
  | 'procedure_policy';

export type Manufacturer = 
  | 'Bio-Rad'
  | 'Nihon Kohden'
  | 'Baxter'
  | 'Qiagen'
  | 'Analyticon'
  | 'Terumo BCT'
  | 'Fujifilm'
  | 'Medtronic'
  | 'Carestream'
  | 'Hamilton'
  | 'Seegene'
  | 'Moxa'
  | 'Phuong Dong General'
  | 'Roche' 
  | 'Sysmex' 
  | 'Mindray';

export type DepartmentCode = 
  | 'BIORAD' 
  | 'HES' 
  | 'IC' 
  | 'CAI' 
  | 'QIA' 
  | 'MM' 
  | 'BB' 
  | 'IMD' 
  | 'MATC'
  | 'IT' 
  | 'GENERAL';

export interface TechnicalNote {
  baudrate?: string;
  dataBits?: string;
  parity?: string;
  stopBits?: string;
  cablePinout?: string;
  ipDefault?: string;
  portDefault?: number;
  maintenanceCycle?: string;
  importantWarnings?: string[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  manufacturer: Manufacturer;
  department: DepartmentCode;
  deviceModel: string;
  docType: DocType;
  keywords: string[];
  documentUrl: string;
  fileSizeBytes?: number;
  summary: string;
  uploadedAt: string;
  language: 'vi' | 'en';
  isSampleData: boolean;
  sharepointRelativePath?: string;
  maintainer?: string;
  technicalNotes?: TechnicalNote;
  commonIssues?: string[];
}

export interface DocumentFilterState {
  searchQuery: string;
  selectedManufacturer: Manufacturer | 'all';
  selectedDocType: DocType | 'all';
  selectedDepartment: DepartmentCode | 'all';
}
