
import React from 'react';
import Header from "../Header";
import Footer from "../Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-16 md:pt-24">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="max-w-7xl mx-auto">
            {title && (
              <h1 className="text-3xl md:text-4xl font-bold text-center text-construction-primary mb-8 md:mb-12">
                {title}
              </h1>
            )}
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
