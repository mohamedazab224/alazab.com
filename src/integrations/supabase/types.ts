export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          assigned_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          description: string | null
          file_url: string
          id: string
          is_deleted: boolean | null
          request_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          description?: string | null
          file_url: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          description?: string | null
          file_url?: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_id: string
          id: number
          interests: string[] | null
          is_returning: boolean | null
          reward_preferences: Json | null
        }
        Insert: {
          client_id: string
          id?: number
          interests?: string[] | null
          is_returning?: boolean | null
          reward_preferences?: Json | null
        }
        Update: {
          client_id?: string
          id?: number
          interests?: string[] | null
          is_returning?: boolean | null
          reward_preferences?: Json | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          request_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      device_tokens: {
        Row: {
          created_at: string | null
          id: string
          token: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          token: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          token?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: never
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      history: {
        Row: {
          action: string | null
          details: string | null
          id: string
          request_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          details?: string | null
          id?: string
          request_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          details?: string | null
          id?: string
          request_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          discount: number | null
          grand_total: number | null
          id: string
          issued_by: string | null
          request_id: string | null
          tax: number | null
          total_cost: number | null
        }
        Insert: {
          created_at?: string | null
          discount?: number | null
          grand_total?: number | null
          id?: string
          issued_by?: string | null
          request_id?: string | null
          tax?: number | null
          total_cost?: number | null
        }
        Update: {
          created_at?: string | null
          discount?: number | null
          grand_total?: number | null
          id?: string
          issued_by?: string | null
          request_id?: string | null
          tax?: number | null
          total_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          attachments: string[] | null
          change_log: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          daftera_invoice_id: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_deleted: boolean | null
          primary_service_id: string | null
          priority: string | null
          requester_email: string | null
          requester_name: string | null
          requester_phone: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          daftera_invoice_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          daftera_invoice_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_requests_archive: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_deleted: boolean | null
          primary_service_id: string | null
          priority: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_archive_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_primary_service_id_fkey"
            columns: ["primary_service_id"]
            isOneToOne: false
            referencedRelation: "maintenance_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_archive_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_services: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          estimated_time: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_works: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_deleted: boolean | null
          notes: string | null
          price: number | null
          quantity: number | null
          request_date: string | null
          request_id: string | null
          start_date: string | null
          status: string | null
          technician_id: string | null
          title: string
          total: number | null
          updated_at: string | null
          work_type: string | null
          year: number | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title?: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_works_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_works_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      malls: {
        Row: {
          id: number
          location: string | null
          name: string
          type: string | null
        }
        Insert: {
          id: number
          location?: string | null
          name: string
          type?: string | null
        }
        Update: {
          id?: number
          location?: string | null
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          related_id: string | null
          related_type: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          created_by: string | null
          department_id: string | null
          email: string
          id: string
          is_deleted: boolean | null
          name: string
          position: string | null
          reports_to: string | null
          role: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          email: string
          id?: string
          is_deleted?: boolean | null
          name: string
          position?: string | null
          reports_to?: string | null
          role: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          email?: string
          id?: string
          is_deleted?: boolean | null
          name?: string
          position?: string | null
          reports_to?: string | null
          role?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      progress_updates: {
        Row: {
          id: string
          item_id: string
          item_type: string
          note: string | null
          progress: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          item_id: string
          item_type: string
          note?: string | null
          progress?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: string
          note?: string | null
          progress?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          file_url: string
          id: string
          name: string
          project_id: string
          size: number
          type: string
          uploaded_at: string
        }
        Insert: {
          file_url: string
          id?: string
          name: string
          project_id: string
          size: number
          type: string
          uploaded_at?: string
        }
        Update: {
          file_url?: string
          id?: string
          name?: string
          project_id?: string
          size?: number
          type?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          area: string | null
          assigned_to: string | null
          budget: number | null
          category: string | null
          client_name: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          engineer_name: string | null
          id: string
          image: string | null
          location: string | null
          model3d_url: string | null
          name: string
          notes: string | null
          order_number: string | null
          progress: number | null
          project_number: string | null
          start_date: string | null
          status: string | null
          tags: string | null
          work_type: string | null
        }
        Insert: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          id?: string
          image?: string | null
          location?: string | null
          model3d_url?: string | null
          name: string
          notes?: string | null
          order_number?: string | null
          progress?: number | null
          project_number?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          work_type?: string | null
        }
        Update: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          id?: string
          image?: string | null
          location?: string | null
          model3d_url?: string | null
          name?: string
          notes?: string | null
          order_number?: string | null
          progress?: number | null
          project_number?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          work_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          request_id: string | null
          stars: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          stars?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          stars?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          code: string | null
          coordinates: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id: string
          is_active?: boolean | null
          level: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      request_status_log: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          is_deleted: boolean | null
          note: string | null
          request_id: string | null
          status: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_status_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          content: string
          created_at: string | null
          download_url: string | null
          expires_at: string | null
          id: number
          order_id: string
          reward_type: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          id?: number
          order_id: string
          reward_type: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          id?: number
          order_id?: string
          reward_type?: string
          title?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      store_facades_gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_deleted: boolean | null
          phase: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_deleted?: boolean | null
          phase?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_deleted?: boolean | null
          phase?: string | null
        }
        Relationships: []
      }
      stores: {
        Row: {
          area: number | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_deleted: boolean | null
          location: string | null
          map_url: string | null
          name: string
          opening_date: string | null
          phone: string | null
          region_id: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name?: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      workflow_steps: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          notes: string | null
          request_id: string | null
          started_at: string | null
          status: string | null
          step_name: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: string | null
          step_name?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: string | null
          step_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_profile: {
        Args:
          | { user_id: number; profile_data: Json }
          | { user_id: string; name: string; email: string }
        Returns: undefined
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      status_enum:
        | "active"
        | "inactive"
        | "new"
        | "in_progress"
        | "completed"
        | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      status_enum: [
        "active",
        "inactive",
        "new",
        "in_progress",
        "completed",
        "pending",
      ],
    },
  },
} as const
