
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { useProject } from '../hooks/useProject';
import ProjectHeader from '../components/project/ProjectHeader';
import ProjectDetailsTab from '../components/project/ProjectDetailsTab';
import ProjectFilesTab from '../components/project/ProjectFilesTab';
import Project3DModelTab from '../components/project/Project3DModelTab';
import ProjectStatusTab from '../components/project/ProjectStatusTab';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    project,
    loading,
    files,
    loadingFiles,
    fetchProjectDetails,
    fetchProjectFiles,
    handleDownloadFile,
    handleDeleteFile
  } = useProject(projectId);

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
      <ProjectHeader project={project} />

      {/* Project Content Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">تفاصيل المشروع</TabsTrigger>
          <TabsTrigger value="files">ملفات المشروع</TabsTrigger>
          <TabsTrigger value="3d">عرض ثلاثي الأبعاد</TabsTrigger>
          <TabsTrigger value="status">حالة المشروع</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <ProjectDetailsTab project={project} />
        </TabsContent>

        <TabsContent value="files">
          <ProjectFilesTab 
            projectId={project.id}
            files={files}
            loadingFiles={loadingFiles}
            onFileUploaded={fetchProjectFiles}
            onDownload={handleDownloadFile}
            onDelete={handleDeleteFile}
          />
        </TabsContent>

        <TabsContent value="3d">
          <Project3DModelTab model3dUrl={project.model3d_url} />
        </TabsContent>

        <TabsContent value="status">
          <ProjectStatusTab 
            projectId={project.id}
            currentStatus={project.status || 'جديد'}
            currentProgress={project.progress || 0}
            onStatusChanged={fetchProjectDetails}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProjectDetails;
