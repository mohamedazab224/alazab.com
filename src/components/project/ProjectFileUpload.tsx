
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
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `project_files/${projectId}/${fileName}`;
        
        console.log(`Uploading file ${i+1}/${files.length}: ${filePath}`);
        
        // تحميل الملف إلى Supabase Storage
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);
        
        if (uploadError) {
          console.error("File upload error:", uploadError);
          throw uploadError;
        }
        
// الحصول على رابط الملف
const { publicUrl } = supabase.storage
  .from('projects')
  .getPublicUrl(filePath);

if (!publicUrl) {
  console.error("Error getting file URL: Public URL is undefined");
  throw new Error("فشل في الحصول على رابط الملف");
}

const fileUrl = publicUrl;

// إنشاء سجل في قاعدة البيانات للملف
const { data: dbData, error: dbError } = await supabase
  .from('project_files')
  .insert({
    project_id: projectId,
    name: file.name,
    file_url: fileUrl,
    size: file.size,
    type: file.type,
  });

if (dbError) {
  console.error("Database insert error:", dbError);
  throw dbError;
}

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
