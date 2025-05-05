
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const projectCategories = [
  "جميع المشاريع",
  "المباني السكنية",
  "المباني التجارية",
  "الفلل الخاصة",
  "المجمعات السكنية"
];

const projects = [
  {
    id: 1,
    title: "برج الأمير السكني",
    category: "المباني السكنية",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
    location: "الرياض، المملكة العربية السعودية"
  },
  {
    id: 2,
    title: "مجمع التميز التجاري",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    location: "جدة، المملكة العربية السعودية"
  },
  {
    id: 3,
    title: "فيلا الواحة الخضراء",
    category: "الفلل الخاصة",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    location: "الدمام، المملكة العربية السعودية"
  },
  {
    id: 4,
    title: "مجمع النخيل السكني",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=2605&auto=format&fit=crop",
    location: "الخبر، المملكة العربية السعودية"
  },
  {
    id: 5,
    title: "برج المستقبل",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1693314212095-3659d9ca30c9?q=80&w=2574&auto=format&fit=crop",
    location: "مكة، المملكة العربية السعودية"
  },
  {
    id: 6,
    title: "مجمع الأندلس",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    location: "المدينة المنورة، المملكة العربية السعودية"
  }
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("جميع المشاريع");

  const filteredProjects = activeCategory === "جميع المشاريع" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">مشاريعنا</h2>
        <p className="section-subtitle">تصفح أحدث وأهم مشاريعنا المنفذة</p>
        
        <Tabs defaultValue="جميع المشاريع" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 p-1">
              {projectCategories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 data-[state=active]:bg-construction-primary data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {projectCategories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.location}</p>
                      <div className="bg-construction-accent text-white text-xs py-1 px-2 rounded absolute top-4 left-4">
                        {project.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12">
          <Button className="bg-construction-primary hover:bg-construction-dark text-white">
            جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
