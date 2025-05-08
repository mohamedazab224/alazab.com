
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
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
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description?: string;
  created_at: string;
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
            className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-200"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-construction-primary">{project.title}</h3>
                <span className="bg-construction-accent text-white text-xs py-1 px-2 rounded">
                  {project.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{project.location}</p>
              {project.description && (
                <p className="text-gray-700 text-sm line-clamp-2">{project.description}</p>
              )}
              <div className="flex justify-end gap-2 mt-4">
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
            {/* Project edit form will go here */}
            {editingProject && (
              <div>
                {/* This would be a full edit form, but for simplicity we just display project info */}
                <p>تعديل المشروع: {editingProject.title}</p>
                {/* You would implement a full form similar to ProjectForm but with editing logic */}
              </div>
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
              سيتم حذف المشروع "{projectToDelete?.title}" بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
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
