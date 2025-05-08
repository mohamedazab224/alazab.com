
import React from 'react';

interface ProjectViewer3DProps {
  embedUrl: string;
}

const ProjectViewer3D: React.FC<ProjectViewer3DProps> = ({ embedUrl }) => {
  return (
    <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      {embedUrl ? (
        <div className="aspect-video w-full relative">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen={true}
            style={{ border: 0 }}
            title="عرض ثلاثي الأبعاد للمشروع"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="flex items-center justify-center aspect-video text-gray-500">
          لا يوجد عرض ثلاثي الأبعاد متاح لهذا المشروع
        </div>
      )}
    </div>
  );
};

export default ProjectViewer3D;
