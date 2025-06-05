
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AuthCard from './AuthCard';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToReset: () => void;
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSwitchToReset, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك مرة أخرى!",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="تسجيل الدخول">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-right"
            dir="ltr"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-right"
            dir="ltr"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-construction-primary hover:bg-construction-secondary text-white"
          disabled={loading}
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={onSwitchToReset}
            className="text-sm text-construction-primary hover:underline"
          >
            نسيت كلمة المرور؟
          </button>
          <div>
            <span className="text-sm text-gray-600">ليس لديك حساب؟ </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-sm text-construction-primary hover:underline font-medium"
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
