
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
  // Check if we are in client-side environment
  const isClient = typeof window !== 'undefined';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="md:px-6">
        <CardTitle className="text-xl md:text-2xl">ملفات المشروع</CardTitle>
        <CardDescription className="text-sm md:text-base">يمكنك تحميل وإدارة ملفات المشروع من هنا</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 overflow-x-auto md:px-6">
        {isClient && !loadingFiles && (
          <div className="w-full">
            <ProjectFileUpload 
              projectId={projectId} 
              onFileUploaded={onFileUploaded} 
            />
          </div>
        )}
        <div className="w-full">
          <h3 className="text-lg font-medium mb-3 md:mb-4">الملفات المرفوعة</h3>
          {loadingFiles ? (
            <div className="text-center py-6 md:py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-construction-primary"></div>
              <p className="mt-2">جاري تحميل الملفات...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <ProjectFilesList 
                files={files} 
                onDownload={onDownload} 
                onDelete={onDelete} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFilesTab;
