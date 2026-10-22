import { DepartmentCode } from '@/features/knowledge/types';

export type ToolCategory = 
  | 'lis_bridge' 
  | 'serial_driver' 
  | 'diagnostic' 
  | 'utility'
  | 'ghost_image'
  | 'software_installer';

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
  department: DepartmentCode; // Phân loại theo Ngành Hàng
  deviceModel?: string;        // Thiết bị áp dụng
  version: string;
  releaseDate: string;
  supportedOS: SupportedOS[];
  releaseNotes: string;
  downloadUrl: string;
  sha256Checksum?: string;
  fileSizeBytes?: number;
  isActive: boolean;
  isSampleData: boolean;
  storageLocation?: 'local' | 'sharepoint' | 'github' | 'pending_upload';
  sharepointUrl?: string;      // Đường dẫn SharePoint nguồn
  ghostNote?: string;          // Ghi chú cho bản Ghost (chuẩn boot UEFI/Legacy, dung lượng ổ, phần mềm cài sẵn)
}

export interface ToolFilterState {
  searchQuery: string;
  selectedCategory: ToolCategory | 'all';
  selectedDepartment: DepartmentCode | 'all';
  selectedOS: SupportedOS | 'all';
}
