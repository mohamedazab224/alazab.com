
import React from 'react';
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";

interface ProjectFile {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  uploaded_at: string;
}

interface ProjectFilesListProps {
  files: ProjectFile[];
  onDownload: (file: ProjectFile) => void;
  onDelete: (file: ProjectFile) => void;
}

const ProjectFilesList: React.FC<ProjectFilesListProps> = ({ 
  files, 
  onDownload, 
  onDelete 
}) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <p className="text-gray-500">لا توجد ملفات مرتبطة بهذا المشروع</p>
      </div>
    );
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-2">
      {files.map(file => (
        <div 
          key={file.id} 
          className="border border-gray-200 rounded-md p-4 flex items-center justify-between bg-white"
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <File size={24} className="text-construction-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{file.name}</h4>
              <div className="text-xs text-gray-500 flex gap-2 mt-1">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{formatDate(file.uploaded_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDownload(file)}
            >
              تنزيل
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onDelete(file)}
            >
              حذف
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectFilesList;
