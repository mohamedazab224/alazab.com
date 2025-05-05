
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface SubmissionStepProps {
  requestNumber: string;
}

const SubmissionStep: React.FC<SubmissionStepProps> = ({ requestNumber }) => {
  const navigate = useNavigate();
  
  return (
    <div className="py-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">تم إرسال طلب الصيانة بنجاح!</h2>
      
      <div className="mb-6 max-w-md mx-auto">
        <p className="text-gray-600 mb-4">
          لقد استلمنا طلب الصيانة الخاص بك وسنقوم بمراجعته في أقرب وقت ممكن.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">رقم الطلب الخاص بك:</p>
          <p className="text-xl font-bold text-construction-primary">{requestNumber}</p>
          <p className="text-sm text-gray-500 mt-2">يرجى الاحتفاظ بهذا الرقم للمتابعة</p>
        </div>
        
        <p className="text-sm text-gray-600">
          سيتم إرسال تفاصيل الطلب إلى البريد الإلكتروني المسجل لدينا.
          سيقوم فريقنا بالتواصل معكم قريباً.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="w-full sm:w-auto"
        >
          العودة إلى الصفحة الرئيسية
        </Button>
        
        <Button
          onClick={() => navigate('/maintenance-tracking', { state: { requestNumber } })}
          className="w-full sm:w-auto bg-construction-primary text-white"
        >
          متابعة حالة الطلب
        </Button>
      </div>
    </div>
  );
};

export default SubmissionStep;
