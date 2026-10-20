export type DocType = 
  | 'service_manual' 
  | 'interface_spec' 
  | 'troubleshooting_guide' 
  | 'wiring_diagram' 
  | 'user_guide';

export type Manufacturer = 
  | 'Roche' 
  | 'Sysmex' 
  | 'Beckman Coulter' 
  | 'Mindray' 
  | 'Abbott' 
  | 'Moxa'
  | 'General Standard';

export interface KnowledgeDocument {
  id: string;
  title: string;
  manufacturer: Manufacturer;
  deviceModel: string;
  docType: DocType;
  keywords: string[];
  documentUrl: string;
  fileSizeBytes?: number;
  summary: string;
  uploadedAt: string;
  language: 'vi' | 'en';
  isSampleData: boolean;
}

export interface DocumentFilterState {
  searchQuery: string;
  selectedManufacturer: Manufacturer | 'all';
  selectedDocType: DocType | 'all';
}
