
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
import PageLayout from '../components/layout/PageLayout';
import ProjectViewer3D from '../components/project/ProjectViewer3D';
import ProjectFileUpload from '../components/project/ProjectFileUpload';
import ProjectFilesList from '../components/project/ProjectFilesList';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description?: string;
  created_at: string;
  model3d_url?: string;
}

interface ProjectFile {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  uploaded_at: string;
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const { toast } = useToast();

  // For demonstration purposes only
  const demoFiles: ProjectFile[] = [
    {
      id: 1,
      name: 'خطة_المشروع.pdf',
      size: 2500000,
      type: 'application/pdf',
      url: '#',
      uploaded_at: '2023-05-15T10:30:00'
    },
    {
      id: 2,
      name: 'رسومات_هندسية.dwg',
      size: 8750000,
      type: 'application/acad',
      url: '#',
      uploaded_at: '2023-05-16T14:20:00'
    },
    {
      id: 3,
      name: 'التقرير_الشهري.docx',
      size: 1200000,
      type: 'application/msword',
      url: '#',
      uploaded_at: '2023-06-01T09:15:00'
    },
  ];

  useEffect(() => {
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
        // In a real implementation, you would fetch files from a project_files table
        setFiles(demoFiles);
        
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

    fetchProjectDetails();
  }, [projectId, toast]);

  const handleDownloadFile = (file: ProjectFile) => {
    toast({
      title: "جاري التنزيل",
      description: `جاري تنزيل الملف: ${file.name}`
    });
  };

  const handleDeleteFile = (file: ProjectFile) => {
    setFiles(files.filter(f => f.id !== file.id));
    toast({
      title: "تم حذف الملف",
      description: `تم حذف الملف: ${file.name}`
    });
  };

  const handleFileUploaded = () => {
    // In a real implementation, you would fetch the updated files list
    const newFile: ProjectFile = {
      id: files.length + 1,
      name: `ملف_جديد_${files.length + 1}.pdf`,
      size: 1500000,
      type: 'application/pdf',
      url: '#',
      uploaded_at: new Date().toISOString()
    };
    setFiles([...files, newFile]);
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

  // For demo purposes, we'll use a sample 3D model URL if none exists
  const model3dUrl = project.model3d_url || "https://3d.magicplan.app/#embed/?key=OTFhN2IzZDJlYzA5MjZjMTdhZWUwMTFkYWY3ZGUxYTM3MTVmYWNkMmUzNmFhMjhlYTRmMDFjMWYyZjMxODJhOQN2seYQI5jHZXOfu%2Bo%2BOP3bamgnXoK2JsQaKPNW1w4oFZwnqUoHDzv2RwW3fHZBsg%3D%3D";

  return (
    <PageLayout title={`مشروع: ${project.title}`}>
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
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-construction-primary mb-2">{project.title}</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              <span className="font-bold ml-1">الموقع:</span> {project.location}
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              <span className="font-bold ml-1">التصنيف:</span> {project.category}
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
                      <p>{project.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">الموقع</h4>
                      <p>{project.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">التصنيف</h4>
                      <p>{project.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">تاريخ الإنشاء</h4>
                      <p>{new Date(project.created_at).toLocaleDateString('ar-EG')}</p>
                    </div>
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
              <ProjectFileUpload projectId={project.id} onFileUploaded={handleFileUploaded} />
              <div>
                <h3 className="text-lg font-medium mb-4">الملفات المرفوعة</h3>
                <ProjectFilesList 
                  files={files} 
                  onDownload={handleDownloadFile} 
                  onDelete={handleDeleteFile} 
                />
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
              <ProjectViewer3D embedUrl={model3dUrl} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProjectDetails;
