
import React from 'react';

interface ProjectViewer3DProps {
  embedUrl: string;
}

const ProjectViewer3D: React.FC<ProjectViewer3DProps> = ({ embedUrl }) => {
  return (
    <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-[500px] md:h-[600px]"
          allowFullScreen={true}
          style={{ border: 0 }}
          title="عرض ثلاثي الأبعاد للمشروع"
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-[500px] md:h-[600px] text-gray-500">
          لا يوجد عرض ثلاثي الأبعاد متاح لهذا المشروع
        </div>
      )}
    </div>
  );
};

export default ProjectViewer3D;
