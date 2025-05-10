
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Upload, FileType, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProjectFileUploadProps {
  projectId: string;
  onFileUploaded?: () => void;
}

const ProjectFileUpload: React.FC<ProjectFileUploadProps> = ({ projectId, onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bucketExists, setBucketExists] = useState<boolean | null>(null);
  const { toast } = useToast();

  // التحقق من وجود خزنة التخزين عند تحميل المكون
  useEffect(() => {
    checkBucketExists();
  }, []);

  const checkBucketExists = async () => {
    try {
      console.log("Checking if storage bucket 'projects' exists...");
      const { data, error } = await supabase.storage.getBucket('projects');
      
      if (error) {
        console.log("Storage bucket 'projects' doesn't exist:", error.message);
        setBucketExists(false);
      } else {
        console.log("Storage bucket 'projects' exists:", data);
        setBucketExists(true);
      }
    } catch (err) {
      console.error("Error checking bucket existence:", err);
      setBucketExists(false);
    }
  };

  const createBucket = async () => {
    try {
      setError(null);
      console.log("Creating storage bucket 'projects'...");
      
      const { data, error } = await supabase.storage.createBucket('projects', {
        public: true,
        fileSizeLimit: 10485760 // 10 ميجابايت
      });
      
      if (error) {
        console.error("Failed to create bucket:", error);
        throw error;
      }
      
      console.log("Storage bucket created successfully:", data);
      setBucketExists(true);
      return true;
    } catch (err: any) {
      console.error("Error creating storage bucket:", err);
      setError(`فشل إنشاء خزنة التخزين: ${err.message || err}`);
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
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
    setError(null);
    let successCount = 0;
    let failCount = 0;

    try {
      // التأكد من وجود خزنة التخزين أو إنشائها
      if (!bucketExists) {
        const created = await createBucket();
        if (!created) {
          throw new Error('فشل إنشاء خزنة التخزين');
        }
      }
      
      // تحميل الملفات وإضافتها إلى قاعدة البيانات
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
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
          const { data } = supabase.storage
            .from('projects')
            .getPublicUrl(filePath);
            
          console.log("File URL data:", data);
          
          if (!data.publicUrl) {
            console.error("Error getting file URL: Public URL is undefined");
            throw new Error("فشل في الحصول على رابط الملف");
          }
          
          // إنشاء سجل في قاعدة البيانات للملف
          const { data: dbData, error: dbError } = await supabase
            .from('project_files')
            .insert({
              project_id: projectId,
              name: file.name,
              file_url: data.publicUrl,
              size: file.size,
              type: file.type,
            });
  
          if (dbError) {
            console.error("Database insert error:", dbError);
            throw dbError;
          }
          
          successCount++;
        } catch (fileError: any) {
          console.error(`Error uploading file ${file.name}:`, fileError);
          failCount++;
        }
      }
      
      // إظهار رسالة النجاح إذا تم تحميل ملف واحد على الأقل
      if (successCount > 0) {
        toast({
          title: "تم تحميل الملفات بنجاح",
          description: `تم تحميل ${successCount} من أصل ${files.length} ملفات للمشروع`,
        });
        
        if (onFileUploaded) {
          onFileUploaded();
        }
      }
      
      // إذا فشل تحميل بعض الملفات، عرض رسالة تحذير
      if (failCount > 0) {
        setError(`فشل تحميل ${failCount} من أصل ${files.length} ملفات`);
      }
      
      // إعادة تعيين حقل الملف
      setFiles(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err: any) {
      console.error("Error in upload process:", err);
      setError(err.message || "حدث خطأ أثناء محاولة تحميل الملفات");
      toast({
        title: "خطأ في تحميل الملفات",
        description: err.message || "حدث خطأ أثناء محاولة تحميل الملفات",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
            <p className="text-sm font-medium text-gray-600">
              تم اختيار {files.length} {files.length === 1 ? 'ملف' : 'ملفات'}
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mt-2">
              {Array.from(files).map((file, index) => (
                <li key={index} className="flex items-center text-right">
                  <FileType size={16} className="ml-2 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs text-gray-500 mr-2">
                    ({formatFileSize(file.size)})
                  </span>
                </li>
              )).slice(0, 5)}
              {files.length > 5 && (
                <li className="text-xs text-gray-500 italic">
                  و{files.length - 5} ملفات أخرى...
                </li>
              )}
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
