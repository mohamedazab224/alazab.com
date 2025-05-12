
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowLeft } from "lucide-react";

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
    location: "الرياض، المملكة العربية السعودية",
    year: "2023",
    client: "شركة الأمير للاستثمار العقاري",
    featured: true
  },
  {
    id: 2,
    title: "مجمع التميز التجاري",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    location: "جدة، المملكة العربية السعودية",
    year: "2022",
    client: "مجموعة التميز"
  },
  {
    id: 3,
    title: "فيلا الواحة الخضراء",
    category: "الفلل الخاصة",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    location: "الدمام، المملكة العربية السعودية",
    year: "2024",
    client: "عائلة السعيد"
  },
  {
    id: 4,
    title: "مجمع النخيل السكني",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=2605&auto=format&fit=crop",
    location: "الخبر، المملكة العربية السعودية",
    year: "2023",
    client: "شركة النخيل للعقارات",
    featured: true
  },
  {
    id: 5,
    title: "برج المستقبل",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1693314212095-3659d9ca30c9?q=80&w=2574&auto=format&fit=crop",
    location: "مكة، المملكة العربية السعودية",
    year: "2021",
    client: "هيئة تطوير مكة المكرمة"
  },
  {
    id: 6,
    title: "مجمع الأندلس",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    location: "المدينة المنورة، المملكة العربية السعودية",
    year: "2022",
    client: "شركة إعمار"
  }
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("جميع المشاريع");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "جميع المشاريع" || project.category === activeCategory;
    const matchesSearch = project.title.includes(searchTerm) || 
                          project.location.includes(searchTerm) || 
                          project.category.includes(searchTerm);
    return matchesCategory && (searchTerm === "" || matchesSearch);
  });
  
  // تأثيرات الظهور عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.project-card');
      
      elements.forEach((element, index) => {
        const position = element.getBoundingClientRect();
        
        // التحقق من وجود العنصر في نطاق العرض
        if (position.top < window.innerHeight - 100) {
          setTimeout(() => {
            element.classList.add('animated');
          }, index * 100); // تأخير تدريجي لكل بطاقة
        }
      });
    };
    
    // فحص أولي
    setTimeout(() => {
      handleScroll();
    }, 300);
    
    // إضافة مستمع للتمرير
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filteredProjects]);

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">مشاريعنا</h2>
        <p className="section-subtitle">تصفح أحدث وأهم مشاريعنا المنفذة</p>
        
        {/* مشاريع مميزة */}
        {!searchTerm && activeCategory === "جميع المشاريع" && (
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-8 text-construction-primary">مشاريع مميزة</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map(project => (
                  <div key={`featured-${project.id}`} className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
                      <div className="bg-construction-accent/80 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full absolute top-6 right-6">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded">سنة: {project.year}</span>
                        <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded">العميل: {project.client}</span>
                      </div>
                      <Link to={`/projects/${project.id}`} className="flex items-center gap-2 bg-white text-construction-primary font-bold py-2 px-4 rounded-md transition hover:bg-construction-accent hover:text-white self-start">
                        تفاصيل المشروع
                        <ArrowLeft size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* بحث وتصفية */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-64">
            <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث عن مشروع..." 
              className="w-full py-2 pr-10 pl-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-construction-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="جميع المشاريع" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-gray-100 p-1 flex flex-wrap justify-center">
              {projectCategories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="px-3 py-1 text-sm data-[state=active]:bg-construction-primary data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* عرض المشاريع */}
        <div className="mt-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="project-card group relative overflow-hidden rounded-lg shadow-md opacity-0 translate-y-8 transition-all duration-500"
                >
                  <Link to={`/projects/${project.id}`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-lg font-bold mb-1 group-hover:text-construction-accent transition-colors">{project.title}</h3>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin size={14} />
                        <p className="text-sm">{project.location}</p>
                      </div>
                      <div className="bg-construction-accent text-white text-xs py-1 px-2 rounded absolute top-4 left-4">
                        {project.category}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <div className="text-gray-500 mb-2">
                <Search size={40} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">لم يتم العثور على مشاريع مطابقة</p>
              </div>
              <p className="text-gray-400 text-sm">
                حاول استخدام كلمات بحث مختلفة أو تصفية أخرى
              </p>
            </div>
          )}
        </div>
        
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button className="bg-construction-primary hover:bg-construction-dark text-white">
                عرض جميع المشاريع
                <ArrowLeft className="mr-2" size={16} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
