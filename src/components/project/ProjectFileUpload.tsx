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

  const createBucketIfNotExists = async () => {
    try {
      // التحقق من وجود خزنة التخزين
      const { data, error } = await supabase.storage.getBucket('projects');
      
      if (error) {
        console.log('Creating storage bucket since it does not exist');
        // إنشاء الخزنة إذا لم تكن موجودة
        const { data: newBucket, error: createError } = await supabase.storage
          .createBucket('projects', {
            public: true,
            fileSizeLimit: 10485760 // 10 ميجابايت
          });
          
        if (createError) {
          throw createError;
        }
        
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking/creating bucket:', error);
      return false;
    }
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
      // إنشاء خزنة التخزين إذا لم تكن موجودة
      const bucketCreated = await createBucketIfNotExists();
      
      if (!bucketCreated) {
        throw new Error('فشل إنشاء خزنة التخزين');
      }
      
      // تحميل الملفات وإضافتها إلى قاعدة البيانات
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `project_files/${projectId}/${fileName}`;
        
        // تحميل الملف إلى Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // الحصول على رابط الملف
        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);

        if (!publicUrl) {
          throw new Error("فشل في الحصول على رابط الملف");
        }

        // إنشاء سجل في قاعدة البيانات للملف
        const { error: dbError } = await supabase
          .from('project_files')
          .insert({
            project_id: projectId,
            name: file.name,
            file_url: publicUrl,
            size: file.size,
            type: file.type,
          });

        if (dbError) {
          throw dbError;
        }
      });

      // انتظار اكتمال جميع عمليات التحميل
      await Promise.all(uploadPromises);

      toast({
        title: "تم تحميل الملفات بنجاح",
        description: `تم تحميل ${files.length} ملفات للمشروع`,
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
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">الملفات المختارة:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {Array.from(files).map((file, index) => (
                <li key={index}>
                  {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleUpload} 
          disabled={!files || files.length === 0 || uploading}
          className="bg-construction-primary hover:bg-construction-dark"
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جارٍ التحميل...
            </>
          ) : 'تحميل الملفات'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectFileUpload;
