
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaintenanceRequest, MaintenanceRequestDB, AttachmentDB } from '@/types/maintenance';
import { sendEmail } from '@/lib/emailjs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

export const useQuickFormSubmit = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (formData: MaintenanceRequest, resetForm: () => void) => {
    if (!formData.branch || !formData.serviceType || !formData.title || !formData.description) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);

      const uniqueId = Date.now().toString().slice(-6);
      const reqNumber = `QMR-${uniqueId}`;
      
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('id')
        .eq('name', formData.branch)
        .maybeSingle();

      let storeId = null;
      if (!storeError && storeData) {
        storeId = storeData.id;
      }

      const estimatedCost = formData.estimatedCost
        ? parseFloat(formData.estimatedCost)
        : null;
      
      const requestData: MaintenanceRequestDB = {
        title: formData.title,
        service_type: formData.serviceType,
        description: formData.description,
        priority: formData.priority,
        scheduled_date: formData.requestedDate,
        estimated_cost: estimatedCost,
        status: 'pending',
        store_id: storeId,
        created_at: new Date().toISOString(),
        created_by: 'anonymous'
      };
        
      const { data: insertedRequest, error: dbError } = await supabase
        .from('maintenance_requests')
        .insert(requestData)
        .select();
        
      if (dbError) {
        console.error('خطأ في حفظ بيانات الطلب:', dbError);
        throw new Error('فشل في حفظ الطلب');
      }
      
      const requestId = insertedRequest && insertedRequest[0] ? insertedRequest[0].id : reqNumber;
      
      if (formData.attachments.length > 0) {
        const uploadPromises = formData.attachments.map(async (file) => {
          const fileName = `${requestId}-${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('maintenance-attachments')
            .upload(fileName, file);
          
          if (error) {
            console.error('خطأ في رفع المرفق:', error);
            return null;
          }
          
          const fileUrl = supabase.storage
            .from('maintenance-attachments')
            .getPublicUrl(data?.path || '').data.publicUrl;
          
          return { path: data?.path, url: fileUrl };
        });
        
        const uploadedFiles = await Promise.all(uploadPromises);
        const validFiles = uploadedFiles.filter(Boolean);
        
        if (validFiles.length > 0) {
          const attachmentsData: AttachmentDB[] = validFiles.map((file) => ({
            request_id: requestId,
            file_url: file?.url || '',
            description: `مرفق للطلب ${formData.title}`,
            uploaded_at: new Date().toISOString()
          }));
          
          const { error: attachError } = await supabase
            .from('attachments')
            .insert(attachmentsData);
            
          if (attachError) {
            console.error('خطأ في حفظ بيانات المرفقات:', attachError);
          }
        }
      }
      
      const emailParams = {
        request_number: requestId,
        branch: formData.branch,
        service_type: formData.serviceType,
        title: formData.title,
        description: formData.description,
        priority: formData.priority === 'low' ? 'منخفضة' : 
                  formData.priority === 'medium' ? 'متوسطة' : 
                  formData.priority === 'high' ? 'عالية' : 'حرجة',
        requested_date: new Date(formData.requestedDate).toLocaleDateString('ar-SA'),
        estimated_cost: formData.estimatedCost || 'غير محدد',
        attachments_count: formData.attachments.length
      };
      
      try {
        await sendEmail(emailParams);
      } catch (emailError) {
        console.error('خطأ في إرسال البريد الإلكتروني:', emailError);
      }
      
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: `تم إنشاء طلب الصيانة برقم ${requestId}`,
        variant: "default",
      });
      
      resetForm();
      navigate(`/maintenance-tracking?requestNumber=${requestId}`);
      
    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال طلبك. الرجاء المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitForm };
};
