
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MaintenanceRequestDetails, AttachmentDetails } from '@/types/maintenance';

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'قيد الانتظار';
    case 'in progress':
    case 'in-progress':
      return 'قيد التنفيذ';
    case 'completed':
      return 'مكتمل';
    case 'cancelled':
      return 'ملغي';
    default:
      return status || 'غير معروف';
  }
};

const MaintenanceTracking: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialRequestNumber = location.state?.requestNumber || searchParams.get('requestNumber') || '';
  
  const [requestNumber, setRequestNumber] = useState<string>(initialRequestNumber);
  const [inputRequestNumber, setInputRequestNumber] = useState<string>(initialRequestNumber);
  const [requestDetails, setRequestDetails] = useState<MaintenanceRequestDetails | null>(null);
  const [attachments, setAttachments] = useState<AttachmentDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (requestNumber) {
      fetchRequestDetails();
    }
  }, [requestNumber]);
  
  const fetchRequestDetails = async () => {
    setIsLoading(true);
    try {
      // جلب تفاصيل الطلب
      const { data: requestData, error: requestError } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('id', requestNumber)
        .single();
      
      if (requestError) {
        throw new Error('لم يتم العثور على الطلب');
      }
      
      // جلب اسم الفرع إذا كان هناك رقم فرع
      let branchName = "غير محدد";
      if (requestData.store_id) {
        const { data: storeData } = await supabase
          .from('stores')
          .select('name')
          .eq('id', requestData.store_id)
          .single();
          
        if (storeData) {
          branchName = storeData.name;
        }
      }
      
      // تحويل البيانات من قاعدة البيانات إلى نوع البيانات المطلوب
      const details: MaintenanceRequestDetails = {
        id: requestData.id,
        request_number: requestNumber,
        title: requestData.title,
        description: requestData.description,
        branch: branchName,
        service_type: requestData.service_type,
        priority: requestData.priority,
        status: requestData.status,
        scheduled_date: requestData.scheduled_date,
        estimated_cost: requestData.estimated_cost ? String(requestData.estimated_cost) : null,
        actual_cost: requestData.actual_cost ? String(requestData.actual_cost) : null,
        created_at: requestData.created_at,
        completion_date: requestData.completion_date
      };
      
      setRequestDetails(details);
      
      // جلب المرفقات إن وجدت
      const { data: attachmentsData, error: attachmentsError } = await supabase
        .from('attachments')
        .select('*')
        .eq('request_id', requestNumber);
      
      if (!attachmentsError && attachmentsData) {
        setAttachments(attachmentsData as AttachmentDetails[]);
      }
    } catch (error) {
      console.error('خطأ في جلب بيانات الطلب:', error);
      toast({
        title: "تعذر العثور على الطلب",
        description: "الرجاء التأكد من رقم الطلب والمحاولة مرة أخرى",
        variant: "destructive"
      });
      setRequestDetails(null);
      setAttachments([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (inputRequestNumber) {
      setRequestNumber(inputRequestNumber);
    } else {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الطلب",
        variant: "destructive"
      });
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'غير محدد';
    return new Date(dateString).toLocaleDateString('ar-SA');
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">متابعة طلب الصيانة</h1>
              <p className="text-gray-600 mt-2">تتبع حالة طلب الصيانة الخاص بك</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">البحث عن طلب</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="أدخل رقم الطلب"
                    value={inputRequestNumber}
                    onChange={(e) => setInputRequestNumber(e.target.value)}
                    className="flex-1"
                    dir="rtl"
                  />
                  <Button 
                    onClick={handleSearch} 
                    className="bg-construction-primary text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'جاري البحث...' : 'بحث'}
                  </Button>
                </div>
                <div className="mt-4">
                  <Link to="/maintenance-list">
                    <Button variant="outline" className="text-construction-primary">
                      عرض جميع الطلبات
                    </Button>
                  </Link>
                </div>
              </div>
              
              {isLoading && (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-construction-primary"></div>
                </div>
              )}
              
              {!isLoading && requestDetails && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">رقم الطلب</p>
                      <p className="font-bold">{requestDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الإنشاء</p>
                      <p>{formatDate(requestDetails.created_at)}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(requestDetails.status)}`}>
                        {getStatusText(requestDetails.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-2">{requestDetails.title}</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{requestDetails.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">تفاصيل الطلب</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-500">الفرع:</span>
                          <span>{requestDetails.branch}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">نوع الخدمة:</span>
                          <span>{requestDetails.service_type}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">الأولوية:</span>
                          <span>{requestDetails.priority}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">معلومات الجدولة</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-500">التاريخ المطلوب:</span>
                          <span>{formatDate(requestDetails.scheduled_date)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">التكلفة التقديرية:</span>
                          <span>{requestDetails.estimated_cost ? `${requestDetails.estimated_cost} ريال` : 'غير محدد'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">تاريخ الإكمال:</span>
                          <span>{formatDate(requestDetails.completion_date)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {attachments.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">المرفقات ({attachments.length})</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {attachments.map((attachment) => (
                            <a
                              key={attachment.id}
                              href={attachment.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-50 p-3 rounded-md flex items-center gap-3 hover:bg-gray-100"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-construction-primary">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12.01" y2="16"></line>
                              </svg>
                              <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{attachment.description || 'مرفق'}</p>
                                <p className="text-xs text-gray-500">{formatDate(attachment.uploaded_at)}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {!isLoading && !requestDetails && requestNumber && (
                <div className="py-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">لم يتم العثور على الطلب</h3>
                  <p className="text-gray-600 mb-4">
                    لم نتمكن من العثور على طلب بالرقم <span className="font-semibold">{requestNumber}</span>
                  </p>
                  <p className="text-gray-500 text-sm">يرجى التأكد من رقم الطلب والمحاولة مرة أخرى</p>
                </div>
              )}
              
              {!isLoading && !requestDetails && !requestNumber && (
                <div className="py-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">ابحث عن طلبك</h3>
                  <p className="text-gray-600">أدخل رقم الطلب في الحقل أعلاه للبحث عنه</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MaintenanceTracking;
