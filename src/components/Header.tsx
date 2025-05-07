
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-construction-primary p-2" 
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
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
