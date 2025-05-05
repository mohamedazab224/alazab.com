
export interface MaintenanceRequest {
  // المعلومات الأساسية - الخطوة 1
  branch: string;
  serviceType: string;
  title: string;
  
  // تفاصيل الطلب - الخطوة 2
  description: string;
  priority: string;
  requestedDate: string;
  estimatedCost?: string;
  
  // المرفقات - الخطوة 3
  attachments: File[];
}

export enum Priority {
  LOW = "منخفضة",
  MEDIUM = "متوسطة",
  HIGH = "عالية",
  URGENT = "عاجلة"
}

export enum MaintenanceStep {
  BASIC_INFO = 1,
  REQUEST_DETAILS = 2,
  ATTACHMENTS = 3,
  REVIEW = 4,
  SUBMISSION = 5
}

export interface MaintenanceRequestDetails {
  id: string;
  request_number?: string;
  title: string;
  description: string;
  branch?: string;
  service_type: string;
  priority: string;
  status: string;
  scheduled_date: string;
  estimated_cost: string | null;
  actual_cost: string | null;
  created_at: string;
  completion_date: string | null;
}

export interface AttachmentDetails {
  id: string;
  file_url: string;
  description: string | null;
  uploaded_at: string;
}

// Database interface for maintenance_requests table
export interface MaintenanceRequestDB {
  id?: string;
  title: string;
  service_type: string;
  description: string;
  priority: string;
  scheduled_date: string;
  estimated_cost: number | null;  // Changed from string to number
  actual_cost?: number | null;    // Changed from string to number
  status: string;
  created_at?: string;
  updated_at?: string;
  store_id?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  assigned_to?: string | null;
  completion_date?: string | null;
  is_deleted?: boolean;
}

// Database interface for attachments table
export interface AttachmentDB {
  id?: string;
  request_id: string;
  file_url: string;
  description: string | null;
  uploaded_at: string;
  uploaded_by?: string | null;
  is_deleted?: boolean;
}
