
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaintenanceRequestSummary } from '@/types/maintenance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface MaintenanceRequestsListProps {
  requests: MaintenanceRequestSummary[];
  isLoading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
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

const formatDate = (dateString: string) => {
  if (!dateString) return 'غير محدد';
  return new Date(dateString).toLocaleDateString('ar-SA');
};

const MaintenanceRequestsList: React.FC<MaintenanceRequestsListProps> = ({ requests, isLoading }) => {
  const navigate = useNavigate();

  const viewRequestDetails = (requestId: string) => {
    navigate(`/maintenance-tracking?requestNumber=${requestId}`);
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-construction-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">جاري تحميل الطلبات...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="py-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M7 8h10"></path>
          <path d="M7 12h10"></path>
          <path d="M7 16h10"></path>
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">لا توجد طلبات صيانة</h3>
        <p className="text-gray-600">لم يتم العثور على أي طلبات صيانة</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">العنوان</TableHead>
            <TableHead className="text-right">نوع الخدمة</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">الأولوية</TableHead>
            <TableHead className="text-right">تاريخ الإنشاء</TableHead>
            <TableHead className="text-right">تاريخ الجدولة</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.title}</TableCell>
              <TableCell>{request.service_type}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </span>
              </TableCell>
              <TableCell>{request.priority}</TableCell>
              <TableCell>{formatDate(request.created_at)}</TableCell>
              <TableCell>{formatDate(request.scheduled_date)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => viewRequestDetails(request.id)}
                  className="text-construction-primary hover:text-white hover:bg-construction-primary"
                >
                  عرض
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceRequestsList;
