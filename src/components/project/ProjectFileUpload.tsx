
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Upload } from "lucide-react";

interface ProjectFileUploadProps {
  projectId: string;
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
      // تحميل الملفات وإضافتها إلى قاعدة البيانات
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `project_files/${projectId}/${fileName}`;
        
        // التحقق من وجود خزنة التخزين قبل التحميل
        const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('projects');
        if (bucketError) {
          // إنشاء الخزنة إذا لم تكن موجودة
          await supabase.storage.createBucket('projects', {
            public: true,
            fileSizeLimit: 10485760 // 10 ميجابايت
          });
        }
        
        // تحميل الملف إلى Supabase Storage
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);
        
        if (uploadError) throw uploadError;
        
        // الحصول على رابط الملف
        const { data: urlData } = await supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
        
        const fileUrl = urlData?.publicUrl || '';
        
        // إنشاء سجل في قاعدة البيانات للملف
        const { error: dbError } = await supabase
          .from('project_files')
          .insert({
            project_id: projectId,
            name: file.name,
            file_url: fileUrl,
            size: file.size,
            type: file.type
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "تم تحميل الملفات بنجاح",
        description: `تم تحميل ${files.length} ملفات للمشروع`
      });

      if (onFileUploaded) {
        onFileUploaded();
      }
      
      // إعادة تعيين حقل الملف
      setFiles(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        title: "خطأ في تحميل الملفات",
        description: error.message || "حدث خطأ أثناء محاولة تحميل الملفات",
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
