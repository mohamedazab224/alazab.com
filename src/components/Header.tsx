
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationLinks = [
    { title: "الرئيسية", path: "/" },
    { title: "خدماتنا", path: "/services" },
    { title: "المشاريع", path: "/projects" },
    { title: "من نحن", path: "/about" },
    { title: "اتصل بنا", path: "/contact" },
    { title: "طلب صيانة", path: "/maintenance-request" },
    { title: "متابعة الطلبات", path: "/maintenance-tracking" },
    { title: "قائمة طلبات الصيانة", path: "/maintenance-list" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col gap-4 p-4 h-full bg-white">
      <div className="text-2xl font-bold text-construction-primary mb-6 border-b pb-4">
        العزب <span className="text-construction-accent">للمقاولات</span>
      </div>
      <div className="flex flex-col gap-2">
        {navigationLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className="text-construction-primary font-medium hover:text-construction-accent transition p-3 border-b"
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <Button className="w-full bg-construction-accent hover:bg-construction-accent/90 text-white">
          احصل على استشارة
        </Button>
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-construction-primary">
            العزب <span className="text-construction-accent">للمقاولات</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-construction-primary font-medium hover:text-construction-accent transition">
            الرئيسية
          </Link>
          <Link to="/services" className="text-construction-primary font-medium hover:text-construction-accent transition">
            خدماتنا
          </Link>
          <Link to="/projects" className="text-construction-primary font-medium hover:text-construction-accent transition">
            المشاريع
          </Link>
          <Link to="/about" className="text-construction-primary font-medium hover:text-construction-accent transition">
            من نحن
          </Link>
          <Link to="/contact" className="text-construction-primary font-medium hover:text-construction-accent transition">
            اتصل بنا
          </Link>
        </nav>
        
        <Button className="hidden md:block bg-construction-accent hover:bg-construction-accent/90 text-white">
          احصل على استشارة
        </Button>
        
        {/* Sidebar Trigger Button */}
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <button className="md:hidden text-construction-primary p-2">
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
              <SidebarContent />
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="md:hidden text-construction-primary p-2"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Mobile Menu (Legacy) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/" className="text-construction-primary font-medium hover:text-construction-accent transition py-2 border-b">
              الرئيسية
            </Link>
            <Link to="/services" className="text-construction-primary font-medium hover:text-construction-accent transition py-2 border-b">
              خدماتنا
            </Link>
            <Link to="/projects" className="text-construction-primary font-medium hover:text-construction-accent transition py-2 border-b">
              المشاريع
            </Link>
            <Link to="/about" className="text-construction-primary font-medium hover:text-construction-accent transition py-2 border-b">
              من نحن
            </Link>
            <Link to="/contact" className="text-construction-primary font-medium hover:text-construction-accent transition py-2">
              اتصل بنا
            </Link>
            <Button className="bg-construction-accent hover:bg-construction-accent/90 text-white w-full mt-2">
              احصل على استشارة
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
