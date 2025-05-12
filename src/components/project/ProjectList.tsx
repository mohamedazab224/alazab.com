
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, FileUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import ProjectForm from './ProjectForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
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

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log("Fetched projects:", data);
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب المشاريع",
        description: "حدث خطأ أثناء محاولة استرداد بيانات المشاريع",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditingOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      toast({
        title: "تم حذف المشروع",
        description: "تم حذف المشروع بنجاح",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        variant: "destructive",
        title: "خطأ في حذف المشروع",
        description: "حدث خطأ أثناء محاولة حذف المشروع",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const confirmDelete = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadgeColor = (status?: string) => {
    switch(status) {
      case 'جديد': return 'bg-blue-500';
      case 'قيد التنفيذ': return 'bg-yellow-500';
      case 'مكتمل': return 'bg-green-500';
      case 'متوقف': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleEditSuccess = () => {
    setIsEditingOpen(false);
    fetchProjects();
  };

  if (loading) {
    return <div className="text-center py-10">جارٍ تحميل المشاريع...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        لا توجد مشاريع حالياً. أضف مشروعاً جديداً باستخدام الزر أعلاه.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image || '/placeholder.svg'} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-construction-primary">{project.name}</h3>
                <span className={`text-white text-xs py-1 px-2 rounded ${getStatusBadgeColor(project.status)}`}>
                  {project.status || 'جديد'}
                </span>
              </div>
              {project.category && (
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium ml-1">الفئة:</span> {project.category}
                </div>
              )}
              <p className="text-gray-600 text-sm mb-2">{project.location}</p>
              {project.description && (
                <p className="text-gray-700 text-sm line-clamp-2 mb-2">{project.description}</p>
              )}
              
              {(project.progress !== undefined && project.progress > 0) && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>نسبة الإنجاز</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-4">
                <Link to={`/projects/${project.id}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Eye size={16} className="ml-1" /> عرض
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(project)}
                >
                  <Edit size={16} className="ml-1" /> تعديل
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => confirmDelete(project)}
                >
                  <Trash size={16} className="ml-1" /> حذف
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sheet for editing project */}
      <Sheet open={isEditingOpen} onOpenChange={setIsEditingOpen}>
        <SheetContent side="left" className="w-full sm:w-[540px] overflow-y-auto">
          <SheetHeader className="text-right">
            <SheetTitle className="text-construction-primary text-2xl">تعديل المشروع</SheetTitle>
            <SheetDescription>
              قم بتعديل بيانات المشروع وانقر على حفظ عند الانتهاء
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingProject && (
              <ProjectForm 
                initialData={editingProject} 
                isEditing={true} 
                onSuccess={handleEditSuccess}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من رغبتك في حذف هذا المشروع؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المشروع "{projectToDelete?.name}" بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectList;
