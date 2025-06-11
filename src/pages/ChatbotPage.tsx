
import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا AzaBot مساعدك الذكي في شركة العزب للمقاولات. كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // محاكاة استجابة الشات بوت
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('صيانة') || input.includes('maintenance')) {
      return 'يمكنك تقديم طلب صيانة من خلال النموذج المخصص في موقعنا. نحن نقدم خدمات صيانة شاملة للمباني والمنشآت. هل تحتاج مساعدة في ملء النموذج؟';
    }
    
    if (input.includes('مشروع') || input.includes('project')) {
      return 'شركة العزب تنفذ مشاريع متنوعة في المقاولات العامة والبناء. يمكنك الاطلاع على معرض مشاريعنا أو التواصل معنا لمناقشة مشروعك الجديد.';
    }
    
    if (input.includes('خدمات') || input.includes('services')) {
      return 'نقدم خدمات شاملة تشمل: المقاولات العامة، أعمال البناء والتشييد، أعمال الكهرباء والسباكة، التشطيبات، وخدمات الصيانة. أي خدمة تهتم بمعرفة المزيد عنها؟';
    }
    
    if (input.includes('تواصل') || input.includes('contact')) {
      return 'يمكنك التواصل معنا عبر: الهاتف، البريد الإلكتروني، أو زيارة مكاتبنا. تجد جميع معلومات التواصل في صفحة "اتصل بنا" على الموقع.';
    }
    
    if (input.includes('مرحبا') || input.includes('السلام') || input.includes('hello')) {
      return 'أهلاً وسهلاً بك! أنا هنا لمساعدتك في أي استفسار حول خدمات شركة العزب للمقاولات. ما الذي تود معرفته؟';
    }
    
    return 'شكراً لك على تواصلك معنا. فريق خدمة العملاء سيتواصل معك قريباً للإجابة على استفسارك بالتفصيل. في غضون ذلك، يمكنك تصفح موقعنا لمعرفة المزيد عن خدماتنا.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <PageLayout title="دردشة مع AzaBot">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[600px] flex flex-col">
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-construction-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-construction-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('ar-SA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-construction-accent flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-construction-primary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-construction-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">جاري الكتابة...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-construction-primary hover:bg-construction-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            AzaBot هو مساعد ذكي لخدمة العملاء. للاستفسارات المعقدة، يرجى التواصل مع فريق خدمة العملاء مباشرة.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatbotPage;
