
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, FolderOpen, Users, TrendingUp, Calendar, Bell, CheckCircle, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: "طلبات الصيانة",
      value: "24",
      change: "+12%",
      icon: ClipboardList,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "المشاريع النشطة",
      value: "8",
      change: "+5%",
      icon: FolderOpen,
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "العملاء",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "معدل الإنجاز",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const recentRequests = [
    {
      id: "REQ-001",
      title: "صيانة نظام التكييف - الفرع الرئيسي",
      status: "جديد",
      priority: "عالية",
      time: "منذ ساعتين",
      statusColor: "bg-blue-100 text-blue-800",
      priorityColor: "bg-red-100 text-red-800"
    },
    {
      id: "REQ-002", 
      title: "إصلاح نظام الإنارة - فرع جدة",
      status: "قيد المراجعة",
      priority: "متوسطة",
      time: "منذ 4 ساعات",
      statusColor: "bg-yellow-100 text-yellow-800",
      priorityColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "REQ-003",
      title: "صيانة دورية للمصاعد - فرع الرياض",
      status: "قيد التنفيذ",
      priority: "منخفضة",
      time: "منذ 6 ساعات",
      statusColor: "bg-orange-100 text-orange-800",
      priorityColor: "bg-green-100 text-green-800"
    }
  ];

  const activeProjects = [
    {
      id: "PRJ-001",
      name: "مجمع العزب التجاري",
      progress: 75,
      status: "قيد التنفيذ",
      deadline: "15 مارس 2024",
      client: "شركة الأهلي للاستثمار"
    },
    {
      id: "PRJ-002",
      name: "برج المملكة السكني",
      progress: 45,
      status: "قيد التنفيذ", 
      deadline: "30 أبريل 2024",
      client: "مجموعة بن لادن"
    },
    {
      id: "PRJ-003",
      name: "مستشفى الملك فيصل",
      progress: 85,
      status: "مرحلة التشطيب",
      deadline: "10 فبراير 2024",
      client: "وزارة الصحة"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-construction-primary via-construction-secondary to-construction-primary p-8 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h1>
              <p className="text-lg opacity-90">نظرة شاملة على أداء شركة العزب للمقاولات</p>
              <p className="text-sm opacity-75 mt-2">آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | {new Date().toLocaleTimeString('ar-SA')}</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Calendar className="w-8 h-8 mb-2" />
                <p className="text-sm">اليوم</p>
                <p className="font-bold">{new Date().toLocaleDateString('ar-SA')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Maintenance Requests */}
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-construction-primary flex items-center">
                    <ClipboardList className="w-6 h-6 ml-2" />
                    طلبات الصيانة الأخيرة
                  </CardTitle>
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentRequests.map((request, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">{request.id}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${request.statusColor}`}>
                              {request.status}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${request.priorityColor}`}>
                              {request.priority}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{request.title}</h4>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 ml-1" />
                            {request.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Projects */}
          <div>
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-xl text-construction-primary flex items-center">
                  <FolderOpen className="w-6 h-6 ml-2" />
                  المشاريع النشطة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activeProjects.map((project, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">{project.id}</span>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">العميل: {project.client}</p>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>نسبة الإنجاز</span>
                          <span className="font-semibold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                          {project.status}
                        </span>
                        <span className="text-gray-500">
                          {project.deadline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-construction-primary to-construction-secondary rounded-t-lg">
            <CardTitle className="text-xl text-white">الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-xl text-center transition-colors group">
                <ClipboardList className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-blue-900">طلب صيانة جديد</p>
              </button>
              <button className="bg-emerald-50 hover:bg-emerald-100 p-4 rounded-xl text-center transition-colors group">
                <FolderOpen className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-emerald-900">إضافة مشروع</p>
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl text-center transition-colors group">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-purple-900">إدارة العملاء</p>
              </button>
              <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-xl text-center transition-colors group">
                <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-amber-900">التقارير</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
