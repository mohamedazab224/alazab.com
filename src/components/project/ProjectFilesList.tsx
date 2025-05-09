
import React from 'react';
import { Button } from "@/components/ui/button";
import { File, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file_url: string;
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

  // تحديد نوع الملف لإظهار المحتوى المناسب
  const getFileType = (file: ProjectFile) => {
    const lowerType = file.type.toLowerCase();
    if (lowerType.includes('image')) return 'image';
    if (lowerType.includes('pdf')) return 'pdf';
    if (lowerType.includes('video')) return 'video';
    if (lowerType.includes('audio')) return 'audio';
    return 'other';
  };

  // عرض معاينة محتوى الملف داخل التطبيق
  const renderFilePreview = (file: ProjectFile) => {
    const fileType = getFileType(file);
    
    switch (fileType) {
      case 'image':
        return (
          <img 
            src={file.file_url} 
            alt={file.name} 
            className="max-w-full max-h-[600px] object-contain"
          />
        );
      case 'pdf':
        return (
          <iframe 
            src={file.file_url} 
            className="w-full h-[600px]" 
            title={file.name}
          />
        );
      case 'video':
        return (
          <video 
            src={file.file_url} 
            controls 
            className="w-full max-h-[600px]"
          />
        );
      case 'audio':
        return (
          <audio 
            src={file.file_url} 
            controls 
            className="w-full"
          />
        );
      default:
        return (
          <div className="text-center py-8">
            <File size={64} className="mx-auto mb-4 text-gray-400" />
            <p>لا يمكن عرض محتوى هذا الملف مباشرة</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-4"
              onClick={() => window.open(file.file_url, '_blank')}
            >
              <ExternalLink size={16} className="mr-2" />
              فتح في نافذة جديدة
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      {files.map(file => (
        <div 
          key={file.id} 
          className="border border-gray-200 rounded-md p-4 flex items-center justify-between bg-white"
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md ml-3">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  عرض
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{file.name}</DialogTitle>
                  <DialogDescription className="flex justify-between items-center">
                    <span>{formatFileSize(file.size)} • {formatDate(file.uploaded_at)}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(file.file_url, '_blank')}
                    >
                      فتح في نافذة جديدة
                    </Button>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 overflow-auto">
                  {renderFilePreview(file)}
                </div>
              </DialogContent>
            </Dialog>
            
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
