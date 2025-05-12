// src/types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'جديد' | 'قيد التنفيذ' | 'مكتمل' | 'متوقف';
  start_date: string;
  end_date: string;
  created_at: string;
  progress: number;
  client_name: string; // أضف هذه الخاصية
  client_id?: string;
  budget?: number;
  model3d_url?: string;
  // يمكنك إضافة خصائص أخرى حسب الحاجة
}
