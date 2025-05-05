
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface SubmissionStepProps {
  requestNumber: string;
}

const SubmissionStep: React.FC<SubmissionStepProps> = ({ requestNumber }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-6 max-w-md mx-auto">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">تم إرسال طلبك بنجاح!</h2>
      
      <p className="text-gray-600">
        تم استلام طلب الصيانة الخاص بك وسيتم مراجعته في أقرب وقت.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-500">رقم الطلب</p>
        <p className="text-xl font-bold">{requestNumber}</p>
      </div>
      
      <p className="text-sm text-gray-500">
        يمكنك متابعة حالة طلبك من خلال رقم الطلب. سيتم التواصل معك قريباً.
      </p>
      
      <div className="flex flex-col space-y-3">
        <Button
          onClick={() => navigate('/')}
          className="bg-construction-primary text-white"
        >
          العودة للرئيسية
        </Button>
        
        <Button
          onClick={() => navigate('/maintenance-request')}
          variant="outline"
        >
          طلب صيانة جديد
        </Button>
      </div>
    </div>
  );
};

export default SubmissionStep;
