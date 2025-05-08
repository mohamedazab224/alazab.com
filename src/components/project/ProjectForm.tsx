
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// تعريف نموذج الإدخال باستخدام Zod
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "يجب أن يكون عنوان المشروع بطول حرفين على الأقل",
  }),
  category: z.string({
    required_error: "يرجى اختيار فئة المشروع",
  }),
  location: z.string().min(2, {
    message: "يرجى إدخال موقع المشروع",
  }),
  image: z.string().url({
    message: "يرجى إدخال رابط صورة صالح"
  }),
  description: z.string().min(10, {
    message: "يجب أن يكون الوصف بطول 10 أحرف على الأقل",
  }).optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  onSuccess?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      category: "",
      location: "",
      image: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "تم إضافة المشروع بنجاح",
        description: "تمت إضافة المشروع الجديد إلى قاعدة البيانات",
      });

      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        variant: "destructive",
        title: "خطأ في إضافة المشروع",
        description: "حدث خطأ أثناء محاولة إضافة المشروع. يرجى المحاولة مرة أخرى.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان المشروع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل عنوان المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>فئة المشروع</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة المشروع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="المباني السكنية">المباني السكنية</SelectItem>
                  <SelectItem value="المباني التجارية">المباني التجارية</SelectItem>
                  <SelectItem value="الفلل الخاصة">الفلل الخاصة</SelectItem>
                  <SelectItem value="المجمعات السكنية">المجمعات السكنية</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>موقع المشروع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل موقع المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط صورة المشروع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل رابط صورة المشروع" {...field} />
              </FormControl>
              <FormDescription>
                أدخل رابط URL لصورة المشروع (يمكنك استخدام خدمات استضافة الصور مثل Imgur أو Cloudinary)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المشروع</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="أدخل وصفاً مختصراً للمشروع" 
                  className="resize-none" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onSuccess && onSuccess()}
          >
            إلغاء
          </Button>
          <Button 
            type="submit" 
            className="bg-construction-primary hover:bg-construction-dark"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "جارٍ الحفظ..." : "حفظ المشروع"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
