
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ProjectFileUpload from './ProjectFileUpload';
import ProjectFilesList from './ProjectFilesList';

interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file_url: string;
  uploaded_at: string;
}

interface ProjectFilesTabProps {
  projectId: string;
  files: ProjectFile[];
  loadingFiles: boolean;
  onFileUploaded: () => void;
  onDownload: (file: ProjectFile) => void;
  onDelete: (file: ProjectFile) => void;
}

const ProjectFilesTab: React.FC<ProjectFilesTabProps> = ({ 
  projectId, 
  files, 
  loadingFiles,
  onFileUploaded,
  onDownload,
  onDelete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ملفات المشروع</CardTitle>
        <CardDescription>يمكنك تحميل وإدارة ملفات المشروع من هنا</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProjectFileUpload 
          projectId={projectId} 
          onFileUploaded={onFileUploaded} 
        />
        <div>
          <h3 className="text-lg font-medium mb-4">الملفات المرفوعة</h3>
          {loadingFiles ? (
            <div className="text-center py-8">جاري تحميل الملفات...</div>
          ) : (
            <ProjectFilesList 
              files={files} 
              onDownload={onDownload} 
              onDelete={onDelete} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFilesTab;
