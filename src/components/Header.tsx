
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'مشاريعنا', href: '/projects' },
    { name: 'من نحن', href: '/about' },
    { name: 'الشات بوت', href: '/chatbot' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-construction-primary rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-construction-primary">شركة العزب</h1>
              <p className="text-sm text-gray-600">للمقاولات العامة</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors hover:text-construction-primary ${
                  isActive(item.href) 
                    ? 'text-construction-primary border-b-2 border-construction-primary pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/maintenance-request">
              <Button className="bg-construction-primary hover:bg-construction-dark text-white">
                طلب صيانة
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white">
                تسجيل الدخول
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-construction-primary ${
                      isActive(item.href) 
                        ? 'text-construction-primary' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" />}
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t pt-6 space-y-3">
                  <Link to="/maintenance-request" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-construction-primary hover:bg-construction-dark text-white">
                      طلب صيانة
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white">
                      تسجيل الدخول
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
