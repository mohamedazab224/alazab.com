
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectViewer3DProps {
  embedUrl: string;
}

const ProjectViewer3D: React.FC<ProjectViewer3DProps> = ({ embedUrl }) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      {embedUrl ? (
        <div className="w-full">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen={true}
              style={{ border: 0 }}
              title="عرض ثلاثي الأبعاد للمشروع"
              loading="lazy"
            ></iframe>
          </AspectRatio>
          
          {/* نخفي عرض الرابط لأنه طويل جدًا ويسبب مشاكل في العرض */}
          {/* <p className="mt-2 text-xs text-gray-500 truncate">
            رابط النموذج: {embedUrl}
          </p> */}
        </div>
      ) : (
        <div className="flex items-center justify-center aspect-video text-gray-500">
          <div className="text-center p-8">
            <div className="mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium">لا يوجد عرض ثلاثي الأبعاد متاح لهذا المشروع</p>
            <p className="text-sm text-gray-400 mt-2">يمكنك إضافة رابط العرض ثلاثي الأبعاد من خلال تعديل بيانات المشروع</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectViewer3D;
