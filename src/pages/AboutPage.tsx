
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-construction-primary mb-12">من نحن</h1>
            <About />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
