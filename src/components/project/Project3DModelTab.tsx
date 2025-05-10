
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectViewer3D from './ProjectViewer3D';
import { useToast } from "@/hooks/use-toast";

interface Project3DModelTabProps {
  model3dUrl: string | undefined;
}

const Project3DModelTab: React.FC<Project3DModelTabProps> = ({ model3dUrl }) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>العرض ثلاثي الأبعاد</CardTitle>
        <CardDescription>استعرض المشروع بتقنية ثلاثية الأبعاد</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectViewer3D embedUrl={model3dUrl || ''} />
        
        {/* عرض مختصر للرابط مع إمكانية نسخه إذا كان موجودًا */}
        {model3dUrl && (
          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">رابط النموذج ثلاثي الأبعاد:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(model3dUrl || '');
                  toast({
                    title: "تم النسخ",
                    description: "تم نسخ رابط النموذج ثلاثي الأبعاد"
                  });
                }}
              >
                نسخ الرابط
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {model3dUrl}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Project3DModelTab;
