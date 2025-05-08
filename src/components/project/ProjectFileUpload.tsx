
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Upload, File } from "lucide-react";

interface ProjectFileUploadProps {
  projectId: number;
  onFileUploaded?: () => void;
}

const ProjectFileUpload: React.FC<ProjectFileUploadProps> = ({ projectId, onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast({
        title: "لم يتم اختيار أي ملف",
        description: "يرجى اختيار ملف واحد على الأقل للتحميل",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // This is a placeholder for the actual file upload logic
      // In a real implementation, you would upload to Supabase storage
      // and save the file references in a project_files table
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating upload delay

      toast({
        title: "تم تحميل الملفات بنجاح",
        description: `تم تحميل ${files.length} ملفات للمشروع`
      });

      if (onFileUploaded) {
        onFileUploaded();
      }
      
      // Reset the file input
      setFiles(null);
      
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "خطأ في تحميل الملفات",
        description: "حدث خطأ أثناء محاولة تحميل الملفات",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
        <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm font-medium mb-2">اختر ملفات للتحميل أو اسحبها وأفلتها هنا</p>
        <p className="text-xs text-gray-500 mb-4">يمكنك تحميل أي نوع من الملفات بحجم أقصى 10 ميجابايت</p>
        <Input
          type="file"
          className="hidden"
          id="file-upload"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={uploading}
          className="mb-2"
        >
          اختر ملفات
        </Button>
        {files && files.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            تم اختيار {files.length} {files.length === 1 ? 'ملف' : 'ملفات'}
          </p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleUpload} 
          disabled={!files || files.length === 0 || uploading}
          className="bg-construction-primary hover:bg-construction-dark"
        >
          {uploading ? 'جارٍ التحميل...' : 'تحميل الملفات'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectFileUpload;
