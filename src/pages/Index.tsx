
import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  // Simple scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-view, .slide-up-view');
      
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add('animated');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* زر طلب صيانة */}
        <div className="container mx-auto px-4 py-8 text-center">
          <Button 
            className="bg-construction-accent hover:bg-construction-accent/90 text-white py-3 px-6 rounded-md text-lg"
            asChild
          >
            <Link to="/maintenance-request">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              تقديم طلب صيانة
            </Link>
          </Button>
        </div>
        
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
