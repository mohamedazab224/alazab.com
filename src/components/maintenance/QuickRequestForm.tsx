
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { MaintenanceRequest, MaintenanceRequestDB, AttachmentDB, BranchData, ServiceTypeData } from '@/types/maintenance';
import { sendEmail } from '@/lib/emailjs';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const QuickRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeData[]>([]);
  const [formData, setFormData] = useState<MaintenanceRequest>({
    branch: '',
    serviceType: '',
    title: '',
    description: '',
    priority: 'medium',
    requestedDate: new Date().toISOString().split('T')[0],
    estimatedCost: '',
    attachments: []
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // جلب بيانات الفروع
        const { data: storesData, error: storesError } = await supabase
          .from('stores')
          .select('id, name')
          .eq('is_deleted', false);
        
        if (storesError) throw storesError;
        
        // جلب أنواع خدمات الصيانة
        const { data: servicesData, error: servicesError } = await supabase
          .from('maintenance_services')
          .select('id, name, description')
          .eq('is_active', true)
          .eq('is_deleted', false);
        
        if (servicesError) throw servicesError;
        
        setBranches(storesData || []);
        setServiceTypes(servicesData || []);

        console.log('تم تحميل البيانات بنجاح:', { 
          branches: storesData?.length, 
          services: servicesData?.length 
        });
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "سيتم استخدام البيانات الافتراضية",
          variant: "destructive",
        });
        // في حالة حدوث خطأ، استخدام البيانات الافتراضية
        setBranches([
          { id: "1", name: "الرياض" },
          { id: "2", name: "جدة" },
          { id: "3", name: "مكة" },
          { id: "4", name: "المدينة" },
          { id: "5", name: "الدمام" },
          { id: "6", name: "الخبر" }
        ]);
        
        setServiceTypes([
          { id: "1", name: "صيانة عامة" },
          { id: "2", name: "صيانة كهربائية" },
          { id: "3", name: "صيانة سباكة" },
          { id: "4", name: "صيانة تكييف" },
          { id: "5", name: "صيانة أجهزة" },
          { id: "6", name: "أخرى" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: filesArray
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

      // إنشاء رقم طلب فريد
      const uniqueId = Date.now().toString().slice(-6);
      const reqNumber = `QMR-${uniqueId}`;
      
      // بحث عن معرّف الفرع المحدد
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('id')
        .eq('name', formData.branch)
        .maybeSingle();

      let storeId = null;
      if (!storeError && storeData) {
        storeId = storeData.id;
      }

      // تحويل estimatedCost من نص إلى رقم إذا كان موجوداً
      const estimatedCost = formData.estimatedCost
        ? parseFloat(formData.estimatedCost)
        : null;
      
      // حفظ المعلومات في قاعدة البيانات
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
      
      // رفع المرفقات إلى Supabase Storage (إذا وجدت)
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
          
          // إنشاء URL للملف المرفوع
          const fileUrl = supabase.storage
            .from('maintenance-attachments')
            .getPublicUrl(data?.path || '').data.publicUrl;
          
          return { path: data?.path, url: fileUrl };
        });
        
        const uploadedFiles = await Promise.all(uploadPromises);
        const validFiles = uploadedFiles.filter(Boolean);
        
        // إضافة المرفقات إلى جدول المرفقات إذا وجدت
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
      
      // إرسال البريد الإلكتروني
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
      
      // إعادة تعيين النموذج
      setFormData({
        branch: '',
        serviceType: '',
        title: '',
        description: '',
        priority: 'medium',
        requestedDate: new Date().toISOString().split('T')[0],
        estimatedCost: '',
        attachments: []
      });
      
      // انتقال إلى صفحة متابعة الطلب
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-construction-primary" />
        <span className="mr-2">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="branch">اختر الفرع *</Label>
          <Select
            value={formData.branch}
            onValueChange={(value) => handleSelectChange('branch', value)}
            required
          >
            <SelectTrigger id="branch">
              <SelectValue placeholder="اختر الفرع" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">نوع الخدمة *</Label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) => handleSelectChange('serviceType', value)}
            required
          >
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="اختر نوع الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service.id} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">عنوان الطلب *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="أدخل عنوان الطلب"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">وصف المشكلة *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="اشرح المشكلة بالتفصيل..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">الأولوية</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleSelectChange('priority', value)}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="اختر الأولوية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">منخفضة</SelectItem>
              <SelectItem value="medium">متوسطة</SelectItem>
              <SelectItem value="high">عالية</SelectItem>
              <SelectItem value="critical">حرجة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requestedDate">التاريخ المطلوب</Label>
          <Input
            id="requestedDate"
            name="requestedDate"
            type="date"
            value={formData.requestedDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedCost">التكلفة المتوقعة (ريال)</Label>
          <Input
            id="estimatedCost"
            name="estimatedCost"
            type="number"
            value={formData.estimatedCost}
            onChange={handleChange}
            placeholder="اختياري"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">إرفاق ملفات</Label>
        <Input
          id="attachment"
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*,application/pdf,.doc,.docx"
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          يمكنك إرفاق صور أو مستندات متعلقة بالطلب (الحد الأقصى: 5 ملفات)
        </p>
        {formData.attachments.length > 0 && (
          <div className="text-sm text-green-600">
            تم اختيار {formData.attachments.length} ملف(ات)
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-construction-primary hover:bg-construction-primary/90"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            "إرسال الطلب السريع"
          )}
        </Button>
      </div>
    </form>
  );
};

export default QuickRequestForm;
