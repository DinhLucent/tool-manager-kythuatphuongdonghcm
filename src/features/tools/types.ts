export type ToolCategory = 
  | 'lis_bridge' 
  | 'serial_driver' 
  | 'diagnostic' 
  | 'utility';

export type SupportedOS = 
  | 'Windows 10' 
  | 'Windows 11' 
  | 'Windows Server 2019+' 
  | 'Windows 7/8 (Legacy)'
  | 'Linux x64' 
  | 'macOS';

export interface ToolRelease {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  version: string;
  releaseDate: string;
  supportedOS: SupportedOS[];
  releaseNotes: string;
  downloadUrl: string;
  sha256Checksum?: string;
  fileSizeBytes?: number;
  isActive: boolean;
  isSampleData: boolean;
}

export interface ToolFilterState {
  searchQuery: string;
  selectedCategory: ToolCategory | 'all';
  selectedOS: SupportedOS | 'all';
}
