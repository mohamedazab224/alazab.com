
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, PanelLeft } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

  const navigationLinks = [
    { title: "الرئيسية", path: "/" },
    { title: "خدماتنا", path: "/services" },
    { title: "المشاريع", path: "/projects" },
    { title: "من نحن", path: "/about" },
    { title: "اتصل بنا", path: "/contact" },
    { title: "طلب صيانة", path: "/maintenance-request" },
    { title: "متابعة الطلبات", path: "/maintenance-tracking" },
    { title: "قائمة طلبات الصيانة", path: "/maintenance-list" },
    { title: "إدارة المشاريع", path: "/project-management" },
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
            onClick={() => setSidebarOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t">
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://www.facebook.com/Alazab.co" target="_blank" rel="noopener noreferrer" className="text-construction-primary hover:text-construction-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/alazabcontracting/" target="_blank" rel="noopener noreferrer" className="text-construction-primary hover:text-construction-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://wa.me/+201062777333" target="_blank" rel="noopener noreferrer" className="text-construction-primary hover:text-construction-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
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
        
        {/* Sidebar Trigger Button */}
        <div className="hidden md:block">
          <Button 
            variant="outline"
            size="icon"
            className="border-2 border-construction-accent"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="فتح القائمة الجانبية"
          >
            <PanelLeft size={24} className="text-construction-accent" />
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="md:hidden border-2 border-construction-accent"
                aria-label="فتح القائمة"
              >
                <Menu size={24} className="text-construction-accent" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
              <SidebarContent />
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="md:hidden border-2 border-construction-accent"
                aria-label="فتح القائمة"
              >
                <Menu size={24} className="text-construction-accent" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Sidebar for desktop */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[350px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
