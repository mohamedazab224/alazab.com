
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
