
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

    // TODO: هنا يجب دمج عزبوت المخصص بدلاً من الردود الوهمية
    <iframe id="JotFormIFrame-0194abdee59871f7b73e2eae35ed720e8ce0" title="AzaBot • AI Agent"
  onload="window.parent.scrollTo(0,0)" allowtransparency="true"
  allow="geolocation; microphone; camera; fullscreen"
  src="https://agent.jotform.com/0194abdee59871f7b73e2eae35ed720e8ce0?embedMode=iframe&background=1&shadow=1"
  frameborder="0" style="
    min-width:100%;
    max-width:100%;
    height:688px;
    border:none;
    width:100%;
  " scrolling="no">
</iframe>
<script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
<script>
  window.jotformEmbedHandler("iframe[id='JotFormIFrame-0194abdee59871f7b73e2eae35ed720e8ce0']",
    "https://www.alazab.com")
    
        {/* Info */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            عزبوت هو مساعد ذكي مدرب خصيصاً لشركة العزب للمقاولات. للاستفسارات المعقدة، يرجى التواصل مع فريق خدمة العملاء مباشرة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
