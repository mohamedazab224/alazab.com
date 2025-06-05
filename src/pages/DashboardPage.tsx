
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, FolderOpen, Users, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: "طلبات الصيانة",
      value: "24",
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      title: "المشاريع النشطة",
      value: "8",
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "العملاء",
      value: "156",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "معدل الإنجاز",
      value: "94%",
      icon: TrendingUp,
      color: "bg-yellow-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">مرحباً بك في لوحة التحكم</h2>
          <p className="text-gray-600">نظرة عامة على أنشطة الشركة والمشاريع</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>طلبات الصيانة الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">طلب صيانة #{item}</p>
                      <p className="text-sm text-gray-500">منذ {item} ساعات</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      قيد المراجعة
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المشاريع النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">مشروع #{item}</p>
                      <p className="text-sm text-gray-500">التقدم: {70 + item * 5}%</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      نشط
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
