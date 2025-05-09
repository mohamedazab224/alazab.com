
import React, { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CreateStorageBucket: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateBucket = async () => {
    try {
      setCreating(true);
      // إنشاء خزنة تخزين جديدة للمشاريع
      const { data, error } = await supabase
        .storage
        .createBucket('projects', {
          public: true,
          fileSizeLimit: 10485760, // 10 ميجابايت
        });
      
      if (error) throw error;
      
      toast({
        title: "تم إنشاء خزنة التخزين بنجاح",
        description: "يمكنك الآن تحميل الملفات للمشاريع"
      });
    } catch (error: any) {
      console.error("Error creating storage bucket:", error);
      
      // التحقق مما إذا كان الخطأ بسبب وجود الخزنة بالفعل
      if (error.message && error.message.includes('already exists')) {
        toast({
          title: "خزنة التخزين موجودة بالفعل",
          description: "يمكنك استخدامها لتحميل الملفات"
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطأ في إنشاء خزنة التخزين",
          description: "حدث خطأ أثناء محاولة إنشاء خزنة التخزين"
        });
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <Button 
      onClick={handleCreateBucket}
      disabled={creating}
    >
      {creating ? 'جارٍ الإنشاء...' : 'إنشاء خزنة تخزين للمشروعات'}
    </Button>
  );
};

export default CreateStorageBucket;
