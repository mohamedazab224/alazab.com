
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from '../components/layout/PageLayout';
import ProjectForm from '../components/project/ProjectForm';
import ProjectList from '../components/project/ProjectList';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ProjectManagement: React.FC = () => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const { toast } = useToast();
  
  return (
    <PageLayout title="إدارة المشاريع">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-construction-primary">المشاريع الحديثة</h2>
        <div className="flex gap-3">
          <Sheet open={isAddingProject} onOpenChange={setIsAddingProject}>
            <SheetTrigger asChild>
              <Button className="bg-construction-primary hover:bg-construction-dark">
                <Plus className="ml-2" size={18} />
                إضافة مشروع جديد
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[540px] overflow-y-auto">
              <SheetHeader className="text-right">
                <SheetTitle className="text-construction-primary text-2xl">إضافة مشروع جديد</SheetTitle>
                <SheetDescription>
                  أدخل بيانات المشروع الجديد وانقر على حفظ عند الانتهاء
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <ProjectForm onSuccess={() => setIsAddingProject(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <ProjectList />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProjectManagement;
