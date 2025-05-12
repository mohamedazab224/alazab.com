
import React, { useState, useEffect } from 'react';
import PageLayout from "../components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { MapPin, Search, Filter, ArrowLeft, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  category?: string;
  image?: string;
  location?: string;
  description?: string;
  created_at: string;
  client_name?: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // إحضار المشاريع من قاعدة البيانات
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching projects:', error);
          return;
        }
        
        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // استخلاص الفئات المتاحة من المشاريع
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach(project => {
      if (project.category) {
        uniqueCategories.add(project.category);
      }
    });
    return ['all', ...Array.from(uniqueCategories)];
  }, [projects]);
  
  // تصفية المشاريع حسب مصطلح البحث والفئة المحددة
  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client_name?.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <PageLayout title="مشاريعنا">
      <div className="mb-8 text-center">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          استعرض أحدث المشاريع التي نفذتها شركة العزب للمقاولات في مختلف المجالات بأعلى معايير الجودة والاحترافية
        </p>
      </div>
      
      {/* أدوات البحث والتصفية */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" size={18} />
            <Input 
              placeholder="ابحث عن مشروع..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.filter(c => c !== 'all').map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 mr-auto">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? "bg-construction-primary" : ""}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? "bg-construction-primary" : ""}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* عرض المشاريع */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-construction-primary"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المشاريع...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
        }>
          {filteredProjects.map((project) => (
            viewMode === 'grid' ? (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="project-card group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src={project.image || '/placeholder.svg'} 
                    alt={project.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-construction-accent transition-colors">{project.name}</h3>
                    <div className="flex items-center gap-1 mb-2 text-gray-200">
                      <MapPin size={16} />
                      <p className="text-sm">{project.location}</p>
                    </div>
                    {project.category && (
                      <div className="bg-construction-accent text-white text-xs py-1 px-3 rounded-full absolute top-4 left-4">
                        {project.category}
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="self-start bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white hover:text-construction-primary transition-colors mt-2"
                    >
                      عرض التفاصيل
                      <ArrowLeft className="mr-1" size={14} />
                    </Button>
                  </div>
                </div>
              </Link>
            ) : (
              <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={project.image || '/placeholder.svg'} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 md:w-3/4 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-construction-primary">{project.name}</h3>
                      {project.category && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mt-1 md:mt-0">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin size={16} />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-4">{project.description}</p>
                    <Link to={`/projects/${project.id}`} className="mt-auto">
                      <Button size="sm" className="bg-construction-primary hover:bg-construction-dark">
                        عرض التفاصيل
                        <ArrowLeft className="mr-1" size={14} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">لم يتم العثور على مشاريع</h3>
          <p className="text-gray-500">
            لم يتم العثور على مشاريع تطابق معايير البحث الخاصة بك. يرجى تعديل البحث أو تصفية المعايير.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            عرض جميع المشاريع
          </Button>
        </div>
      )}
      
      {/* التنقل بين الصفحات */}
      {filteredProjects.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              <ArrowRight size={16} />
            </Button>
            <Button variant="outline" className="bg-construction-primary text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" size="icon">
              <ArrowLeft size={16} />
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h3 className="text-xl font-bold text-construction-primary mb-3">هل لديك مشروع تود تنفيذه؟</h3>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          نحن في شركة العزب للمقاولات نقدم خدمات متكاملة في مجال المقاولات والبناء بأعلى معايير الجودة والدقة
        </p>
        <Link to="/contact">
          <Button className="bg-construction-primary hover:bg-construction-dark">تواصل معنا الآن</Button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default ProjectsPage;
