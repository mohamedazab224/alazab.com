
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-construction-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">العزب للمقاولات</h3>
            <p className="text-gray-300 mb-4">
              شركة رائدة في مجال المقاولات والبناء نقدم خدمات متكاملة بأعلى معايير الجودة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">الرئيسية</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition">خدماتنا</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition">المشاريع</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition">من نحن</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition">اتصل بنا</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">مقاولات عامة</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">تصميم معماري</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">صيانة وترميم</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">استشارات هندسية</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">تشطيبات داخلية</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">النشرة البريدية</h3>
            <p className="text-gray-300 mb-4">
              اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="w-full bg-white/10 border-0 text-white placeholder:text-gray-300 px-3 py-2 rounded-l-md focus:outline-none"
              />
              <button className="bg-construction-accent text-white px-4 py-2 rounded-r-md hover:bg-construction-accent/90 transition">
                اشتراك
              </button>
            </div>
          </div>
        </div>
        
        <hr className="border-white/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} شركة العزب للمقاولات. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-white transition">سياسة الخصوصية</a>
            <a href="#" className="text-gray-300 hover:text-white transition">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
