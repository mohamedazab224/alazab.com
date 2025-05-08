
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
          >
            {link.title}
          </Link>
        ))}
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
        
        {/* Sidebar Trigger Button (replacing consultation button) */}
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
        
        {/* Mobile Menu Button - Made More Prominent */}
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
