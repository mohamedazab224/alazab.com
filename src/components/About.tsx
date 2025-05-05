
import React from 'react';
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-construction-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Image */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-72 h-72 lg:w-80 lg:h-80 bg-construction-primary rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2574&auto=format&fit=crop" 
              alt="شركة العزب للمقاولات" 
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-construction-accent rounded-lg"></div>
          </div>
          
          {/* About Content */}
          <div>
            <div className="inline-block bg-construction-accent/20 text-construction-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
              من نحن
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              شركة العزب للمقاولات <br />
              <span className="text-construction-accent">تاريخ من التميز والإبداع</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              تأسست شركة العزب للمقاولات منذ أكثر من 20 عاماً لتصبح واحدة من أهم الشركات الرائدة في مجال المقاولات والبناء في المملكة العربية السعودية. تخصصنا في تقديم خدمات متكاملة في مجال الإنشاء والتعمير بأعلى معايير الجودة والالتزام بالمواعيد.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نعمل بشغف لتحويل أفكار عملائنا إلى واقع ملموس، مع التركيز على الاستدامة والابتكار في جميع مشاريعنا. فريقنا المكون من مهندسين وخبراء متخصصين يعملون معاً لتقديم أفضل الحلول الهندسية والإنشائية.
            </p>
            
            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-construction-accent rounded-full"></div>
                <span className="font-medium">الجودة العالية</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-construction-accent rounded-full"></div>
                <span className="font-medium">الالتزام بالمواعيد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-construction-accent rounded-full"></div>
                <span className="font-medium">الابتكار المستمر</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-construction-accent rounded-full"></div>
                <span className="font-medium">فريق محترف</span>
              </div>
            </div>
            
            <Button className="bg-construction-primary hover:bg-construction-dark text-white">
              تعرف علينا أكثر
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
