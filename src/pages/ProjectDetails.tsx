
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageLayout from '../components/layout/PageLayout';
import ProjectViewer3D from '../components/project/ProjectViewer3D';
import ProjectFileUpload from '../components/project/ProjectFileUpload';
import ProjectFilesList from '../components/project/ProjectFilesList';
import ProjectStatusChange from '../components/project/ProjectStatusChange';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category?: string;
  image?: string;
  location?: string;
  description?: string;
  created_at: string;
  status?: string;
  progress?: number;
  model3d_url?: string;
}

interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file_url: string;
  uploaded_at: string;
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
      fetchProjectFiles();
    }
  }, [projectId]);

  const fetchProjectDetails = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      setProject(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب بيانات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد بيانات المشروع"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFiles = async () => {
    if (!projectId) return;
    
    try {
      setLoadingFiles(true);
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching project files:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب ملفات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد ملفات المشروع"
      });
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleDownloadFile = (file: ProjectFile) => {
    // في بيئة حقيقية، سنقوم بتنزيل الملف باستخدام الرابط
    window.open(file.file_url, '_blank');
    toast({
      title: "جاري التنزيل",
      description: `جاري تنزيل الملف: ${file.name}`
    });
  };

  const handleDeleteFile = async (file: ProjectFile) => {
    try {
      // حذف الملف من قاعدة البيانات
      const { error } = await supabase
        .from('project_files')
        .delete()
        .eq('id', file.id);

      if (error) throw error;
      
      // استخراج اسم الملف من الرابط
      const filePath = file.file_url.split('/').pop();
      if (filePath) {
        // حذف الملف من التخزين
        const { error: storageError } = await supabase.storage
          .from('projects')
          .remove([`project_files/${projectId}/${filePath}`]);
          
        if (storageError) console.error("Error deleting file from storage:", storageError);
      }

      setFiles(files.filter(f => f.id !== file.id));
      toast({
        title: "تم حذف الملف",
        description: `تم حذف الملف: ${file.name}`
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "خطأ في حذف الملف",
        description: "حدث خطأ أثناء محاولة حذف الملف"
      });
    }
  };

  const handleStatusChanged = () => {
    fetchProjectDetails();
  };

  const getStatusColor = (status?: string) => {
    switch(status) {
      case 'جديد': return 'bg-blue-500';
      case 'قيد التنفيذ': return 'bg-yellow-500';
      case 'مكتمل': return 'bg-green-500';
      case 'متوقف': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <PageLayout title="تفاصيل المشروع">
        <div className="text-center py-10">جارٍ تحميل بيانات المشروع...</div>
      </PageLayout>
    );
  }

  if (!project) {
    return (
      <PageLayout title="تفاصيل المشروع">
        <div className="text-center py-10 flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold text-gray-700">لم يتم العثور على المشروع</h2>
          <p className="text-gray-500">لا يمكن العثور على المشروع المطلوب</p>
          <Link to="/project-management">
            <Button>
              <ArrowRight className="ml-2" size={16} />
              العودة إلى إدارة المشاريع
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`مشروع: ${project.name}`}>
      <div className="mb-6">
        <Link to="/project-management" className="text-construction-primary hover:underline flex items-center">
          <ArrowRight className="ml-2" size={16} />
          العودة إلى إدارة المشاريع
        </Link>
      </div>

      {/* Project Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden border border-gray-200 h-[250px]">
            <img 
              src={project.image || '/placeholder.svg'} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-construction-primary">{project.name}</h1>
            <span className={`text-white px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
              {project.status || 'جديد'}
            </span>
          </div>
          
          {(project.progress !== undefined && project.progress > 0) && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">نسبة الإنجاز</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-4">
            {project.category && (
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                <span className="font-bold ml-1">الفئة:</span> {project.category}
              </div>
            )}
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              <span className="font-bold ml-1">الموقع:</span> {project.location}
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              <span className="font-bold ml-1">تاريخ الإنشاء:</span> {new Date(project.created_at).toLocaleDateString('ar-EG')}
            </div>
          </div>
          <p className="text-gray-700">{project.description}</p>
        </div>
      </div>

      {/* Project Content Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">تفاصيل المشروع</TabsTrigger>
          <TabsTrigger value="files">ملفات المشروع</TabsTrigger>
          <TabsTrigger value="3d">عرض ثلاثي الأبعاد</TabsTrigger>
          <TabsTrigger value="status">حالة المشروع</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل المشروع</CardTitle>
              <CardDescription>كافة المعلومات والتفاصيل المتعلقة بالمشروع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4">معلومات المشروع</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">اسم المشروع</h4>
                      <p>{project.name}</p>
                    </div>
                    {project.category && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">الفئة</h4>
                        <p>{project.category}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">الموقع</h4>
                      <p>{project.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">الحالة</h4>
                      <p className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(project.status)}`}></span>
                        {project.status || 'جديد'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">تاريخ الإنشاء</h4>
                      <p>{new Date(project.created_at).toLocaleDateString('ar-EG')}</p>
                    </div>
                    {(project.progress !== undefined) && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">نسبة الإنجاز</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 w-32" />
                          <span>{project.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">الوصف</h3>
                  <p className="text-gray-700">{project.description || 'لا يوجد وصف متوفر'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>ملفات المشروع</CardTitle>
              <CardDescription>يمكنك تحميل وإدارة ملفات المشروع من هنا</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProjectFileUpload 
                projectId={project.id} 
                onFileUploaded={fetchProjectFiles} 
              />
              <div>
                <h3 className="text-lg font-medium mb-4">الملفات المرفوعة</h3>
                {loadingFiles ? (
                  <div className="text-center py-8">جاري تحميل الملفات...</div>
                ) : (
                  <ProjectFilesList 
                    files={files} 
                    onDownload={handleDownloadFile} 
                    onDelete={handleDeleteFile} 
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3d">
          <Card>
            <CardHeader>
              <CardTitle>العرض ثلاثي الأبعاد</CardTitle>
              <CardDescription>استعرض المشروع بتقنية ثلاثية الأبعاد</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectViewer3D embedUrl={project.model3d_url || ''} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>تحديث حالة المشروع</CardTitle>
              <CardDescription>قم بتحديث حالة المشروع ونسبة الإنجاز</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectStatusChange 
                projectId={project.id}
                currentStatus={project.status || 'جديد'}
                currentProgress={project.progress || 0}
                onStatusChanged={handleStatusChanged}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProjectDetails;
