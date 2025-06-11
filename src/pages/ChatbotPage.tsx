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
      text: 'مرحباً! أنا عزبوت (AzaBot) مساعدك الذكي في شركة العزب للمقاولات. كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
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

    // محاكاة رد وهمي
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'شكرًا، سيتم الرد عليك قريبًا.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  if (showIframe) {
    return (
      <PageLayout title="AzaBot الذكي">
        <div className="w-full h-[700px]">
          <iframe
            id="JotFormIFrame-0194abdee59871f7b73e2eae35ed720e8ce0"
            title="AzaBot • AI Agent"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://agent.jotform.com/0194abdee59871f7b73e2eae35ed720e8ce0?embedMode=iframe&background=1&shadow=1"
            frameBorder="0"
            style={{ width: "100%", height: "100%", border: "none" }}
            scrolling="no"
          />
        </div>
        <div className="text-center mt-4">
          <Button variant="outline" onClick={() => setShowIframe(false)}>
            العودة للمحادثة
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="مساعد العزب الذكي">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-4 space-y-4">
          <div className="h-[400px] overflow-y-auto border rounded p-2 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`rounded p-2 max-w-sm ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="اكتب رسالتك..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            </Button>
          </div>

          <div className="text-center">
            <Button variant="secondary" onClick={() => setShowIframe(true)}>
              تحدث مع عزبوت المتقدم
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ChatbotPage;
