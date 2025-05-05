
import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "@/components/ui/use-toast";
import { MaintenanceStep, MaintenanceRequest } from '@/types/maintenance';
import { sendEmail } from '@/lib/emailjs';
import { supabase } from '@/integrations/supabase/client';

import StepIndicator from '@/components/maintenance/StepIndicator';
import BasicInfoStep from '@/components/maintenance/BasicInfoStep';
import DetailsStep from '@/components/maintenance/DetailsStep';
import AttachmentsStep from '@/components/maintenance/AttachmentsStep';
import ReviewStep from '@/components/maintenance/ReviewStep';
import SubmissionStep from '@/components/maintenance/SubmissionStep';

const MaintenancePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<MaintenanceStep>(MaintenanceStep.BASIC_INFO);
  const [formData, setFormData] = useState<MaintenanceRequest>({
    branch: '',
    serviceType: '',
    title: '',
    description: '',
    priority: '',
    requestedDate: '',
    estimatedCost: '',
    attachments: []
  });
  const [requestNumber, setRequestNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const updateAttachments = (files: File[]) => {
    setFormData({
      ...formData,
      attachments: files
    });
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // إنشاء رقم طلب فريد
      const uniqueId = Date.now().toString().slice(-6);
      const reqNumber = `MR-${uniqueId}`;
      setRequestNumber(reqNumber);

      // رفع المرفقات إلى Supabase Storage (إذا وجدت)
      const uploadPromises = formData.attachments.map(async (file) => {
        const fileName = `${reqNumber}-${file.name}`;
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
      const filePaths = uploadedFiles.filter(Boolean).map(file => file?.path);
      const fileUrls = uploadedFiles.filter(Boolean).map(file => file?.url);
      
      // حفظ المعلومات في قاعدة البيانات
      const { error: dbError } = await supabase
        .from('maintenance_requests')
        .insert({
          request_number: reqNumber,
          branch: formData.branch,
          service_type: formData.serviceType,
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          scheduled_date: formData.requestedDate,
          estimated_cost: formData.estimatedCost || null,
          status: 'pending',
          created_at: new Date()
        });
        
      if (dbError) {
        console.error('خطأ في حفظ بيانات الطلب:', dbError);
        throw new Error('حدث خطأ في حفظ البيانات');
      }
      
      // إضافة المرفقات إلى جدول المرفقات إذا وجدت
      if (filePaths.length > 0) {
        const attachmentsData = filePaths.map((path, index) => ({
          request_id: reqNumber,
          file_url: fileUrls[index],
          description: `مرفق للطلب رقم ${reqNumber}`,
          uploaded_at: new Date()
        }));
        
        const { error: attachError } = await supabase
          .from('attachments')
          .insert(attachmentsData);
          
        if (attachError) {
          console.error('خطأ في حفظ بيانات المرفقات:', attachError);
        }
      }
      
      // إرسال البريد الإلكتروني
      const emailParams = {
        request_number: reqNumber,
        branch: formData.branch,
        service_type: formData.serviceType,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        requested_date: new Date(formData.requestedDate).toLocaleDateString('ar-SA'),
        estimated_cost: formData.estimatedCost || 'غير محدد',
        attachments_count: formData.attachments.length
      };
      
      await sendEmail(emailParams);
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: `تم إنشاء طلب الصيانة برقم ${reqNumber}`,
        variant: "default",
      });
      
      // انتقال إلى خطوة التأكيد
      nextStep();
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

  const renderStep = () => {
    switch (currentStep) {
      case MaintenanceStep.BASIC_INFO:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case MaintenanceStep.REQUEST_DETAILS:
        return (
          <DetailsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case MaintenanceStep.ATTACHMENTS:
        return (
          <AttachmentsStep
            formData={formData}
            updateAttachments={updateAttachments}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case MaintenanceStep.REVIEW:
        return (
          <ReviewStep
            formData={formData}
            nextStep={isSubmitting ? () => {} : handleSubmit}
            prevStep={prevStep}
          />
        );
      case MaintenanceStep.SUBMISSION:
        return (
          <SubmissionStep requestNumber={requestNumber} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-construction-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">نظام طلبات الصيانة</h1>
              <p className="text-gray-600 mt-2">أدخل بيانات طلب الصيانة الخاص بك بالخطوات</p>
            </div>
            
            {currentStep !== MaintenanceStep.SUBMISSION && (
              <StepIndicator currentStep={currentStep} />
            )}
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              {renderStep()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MaintenancePage;
