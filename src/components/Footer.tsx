
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
            <p className="text-sm text-gray-300 mb-4 italic">
              "Al-Azab" reflects our culture - the fertile river that irrigates all who pass by, 
              associated with plans, dreams, and visionary ambitions.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/alazab24" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/alazab.co/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/c/201004006620" target="_blank" rel="noopener noreferrer" className="text-white hover:text-construction-accent transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">المقر الرئيسي - القاهرة:</p>
                <p className="text-gray-300 text-sm">ش 500 متفرع من ش الجزائر، المعادي</p>
                <p className="text-gray-300 text-sm">+201004006620</p>
              </div>
              <div>
                <p className="font-semibold">فرع الدقهلية:</p>
                <p className="text-gray-300 text-sm">نبروه، ش المحطة</p>
                <p className="text-gray-300 text-sm">+201014536600</p>
              </div>
              <div>
                <p className="font-semibold">فرع جدة:</p>
                <p className="text-gray-300 text-sm">حي الصفا، بجوار مستشفى الجدعاني</p>
                <p className="text-gray-300 text-sm">+966547330897</p>
              </div>
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
                <a href="https://alazab-co.daftra.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">المتجر الإلكتروني</a>
              </li>
            </ul>
          </div>
          
          {/* Digital Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">منصاتنا الرقمية</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.facebook.com/alazab24" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">فيس بوك</a>
              </li>
              <li>
                <a href="https://www.instagram.com/alazab.co/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">انستجرام</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@al-azab_co" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">يوتيوب</a>
              </li>
              <li>
                <a href="https://wa.me/c/201004006620" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">واتساب</a>
              </li>
              <li>
                <a href="https://www.threads.com/@alazab.co" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">خيوط</a>
              </li>
            </ul>
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
