
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "./use-toast";

export interface Project {
  id: string;
  name: string;
  category?: string;
  image?: string;
  location?: string;
  description?: string;
  created_at: string;
  status?: string;
  progress?: number;
  model3d_url?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file_url: string;
  uploaded_at: string;
}

export const useProject = (projectId: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const { toast } = useToast();

  const fetchProjectDetails = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      setProject(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب بيانات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد بيانات المشروع"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFiles = async () => {
    if (!projectId) return;
    
    try {
      setLoadingFiles(true);
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching project files:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب ملفات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد ملفات المشروع"
      });
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleDownloadFile = (file: ProjectFile) => {
    // في بيئة حقيقية، سنقوم بتنزيل الملف باستخدام الرابط
    window.open(file.file_url, '_blank');
    toast({
      title: "جاري التنزيل",
      description: `جاري تنزيل الملف: ${file.name}`
    });
  };

  const handleDeleteFile = async (file: ProjectFile) => {
    try {
      // حذف الملف من قاعدة البيانات
      const { error } = await supabase
        .from('project_files')
        .delete()
        .eq('id', file.id);

      if (error) throw error;
      
      // استخراج اسم الملف من الرابط
      const filePath = file.file_url.split('/').pop();
      if (filePath) {
        // حذف الملف من التخزين
        const { error: storageError } = await supabase.storage
          .from('projects')
          .remove([`project_files/${projectId}/${filePath}`]);
          
        if (storageError) console.error("Error deleting file from storage:", storageError);
      }

      setFiles(files.filter(f => f.id !== file.id));
      toast({
        title: "تم حذف الملف",
        description: `تم حذف الملف: ${file.name}`
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "خطأ في حذف الملف",
        description: "حدث خطأ أثناء محاولة حذف الملف"
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
      fetchProjectFiles();
    }
  }, [projectId]);

  return {
    project,
    loading,
    files,
    loadingFiles,
    fetchProjectDetails,
    fetchProjectFiles,
    handleDownloadFile,
    handleDeleteFile
  };
};
