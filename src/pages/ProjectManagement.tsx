
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Clock, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PageLayout from '../components/layout/PageLayout';
import ProjectForm from '../components/project/ProjectForm';
import ProjectList from '../components/project/ProjectList';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  upcoming: number;
}

const ProjectManagement: React.FC = () => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectStats, setProjectStats] = useState<ProjectStats>({
    total: 0,
    active: 0,
    completed: 0,
    upcoming: 0
  });
  const { toast } = useToast();
  
  // إحضار إحصائيات المشاريع
  useEffect(() => {
    const fetchProjectStats = async () => {
      try {
        const { data: projects } = await supabase
          .from('projects')
          .select('id, status, progress');
          
        if (projects) {
          const stats: ProjectStats = {
            total: projects.length,
            active: projects.filter(p => p.status === 'قيد التنفيذ').length,
            completed: projects.filter(p => p.status === 'مكتمل').length,
            upcoming: projects.filter(p => p.status === 'جديد' || !p.status).length
          };
          
          setProjectStats(stats);
        }
      } catch (error) {
        console.error("Error fetching project stats:", error);
      }
    };
    
    fetchProjectStats();
  }, []);
  
  // إدارة نجاح إضافة مشروع جديد
  const handleProjectAdded = () => {
    setIsAddingProject(false);
    toast({
      title: "تم إضافة المشروع بنجاح",
      description: "تمت إضافة المشروع الجديد وهو متاح الآن في قائمة المشاريع",
      duration: 5000,
    });
  };
  
  return (
    <PageLayout title="إدارة المشاريع">
      {/* لوحة معلومات المشاريع */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white border-l-4 border-l-construction-primary">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي المشاريع</p>
              <h4 className="text-2xl font-bold text-construction-primary">{projectStats.total}</h4>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <PieChart size={24} className="text-construction-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-yellow-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">قيد التنفيذ</p>
              <h4 className="text-2xl font-bold text-yellow-600">{projectStats.active}</h4>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مشاريع مكتملة</p>
              <h4 className="text-2xl font-bold text-green-600">{projectStats.completed}</h4>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-blue-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مشاريع جديدة</p>
              <h4 className="text-2xl font-bold text-blue-600">{projectStats.upcoming}</h4>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-construction-primary">المشاريع الحالية</h2>
          <p className="text-gray-500">إدارة وتتبع جميع مشاريع الشركة</p>
        </div>
        <div className="flex gap-3">
          <Sheet open={isAddingProject} onOpenChange={setIsAddingProject}>
            <SheetTrigger asChild>
              <Button className="bg-construction-primary hover:bg-construction-dark">
                <Plus className="ml-2" size={18} />
                إضافة مشروع جديد
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[540px] overflow-y-auto">
              <SheetHeader className="text-right">
                <SheetTitle className="text-construction-primary text-2xl">إضافة مشروع جديد</SheetTitle>
                <SheetDescription>
                  أدخل بيانات المشروع الجديد وانقر على حفظ عند الانتهاء
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <ProjectForm onSuccess={handleProjectAdded} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* شريط البحث والفلترة */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" size={18} />
            <Input 
              placeholder="البحث عن مشروع..." 
              className="pl-4 pr-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            تصفية
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0">
          <ProjectList searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProjectManagement;
