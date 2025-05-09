
import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CreateStorageBucket: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [bucketExists, setBucketExists] = useState(false);
  const { toast } = useToast();

  // التحقق من وجود خزنة التخزين عند تحميل المكون
  useEffect(() => {
    checkBucketExists();
  }, []);

  const checkBucketExists = async () => {
    try {
      const { data, error } = await supabase.storage.getBucket('projects');
      if (data && !error) {
        setBucketExists(true);
      }
    } catch (error) {
      console.error("Error checking bucket existence:", error);
    }
  };

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
      
      if (error) {
        // التحقق مما إذا كان الخطأ بسبب وجود الخزنة بالفعل
        if (error.message && error.message.includes('already exists')) {
          toast({
            title: "خزنة التخزين موجودة بالفعل",
            description: "يمكنك استخدامها لتحميل الملفات"
          });
          setBucketExists(true);
        } else {
          throw error;
        }
      } else {
        toast({
          title: "تم إنشاء خزنة التخزين بنجاح",
          description: "يمكنك الآن تحميل الملفات للمشاريع"
        });
        setBucketExists(true);
      }
    } catch (error: any) {
      console.error("Error creating storage bucket:", error);
      
      toast({
        variant: "destructive",
        title: "خطأ في إنشاء خزنة التخزين",
        description: "حدث خطأ أثناء محاولة إنشاء خزنة التخزين"
      });
    } finally {
      setCreating(false);
    }
  };

  if (bucketExists) {
    return null; // لا تعرض الزر إذا كانت الخزنة موجودة
  }

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
