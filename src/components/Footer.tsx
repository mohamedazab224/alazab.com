
import React from 'react';
import { Link } from 'react-router-dom';

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
              <a href="https://www.facebook.com/Alazab.co" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/alazabcontracting/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/+201062777333" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">الرئيسية</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">خدماتنا</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition">المشاريع</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/project-management" className="text-gray-300 hover:text-white transition">إدارة المشاريع</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">مقاولات عامة</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">تصميم معماري</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">صيانة وترميم</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">استشارات هندسية</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition">تشطيبات داخلية</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-300 mb-4">
              <strong>العنوان:</strong> مصر, طنطا
            </p>
            <p className="text-gray-300 mb-2">
              <strong>الهاتف:</strong> <a href="tel:+201062777333" className="hover:text-white">+201062777333</a>
            </p>
            <p className="text-gray-300 mb-4">
              <strong>البريد الإلكتروني:</strong> <a href="mailto:info@alazab.co" className="hover:text-white">info@alazab.co</a>
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/Alazab.co" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/alazabcontracting/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/+201062777333" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
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
