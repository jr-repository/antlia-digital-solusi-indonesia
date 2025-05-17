
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

// Types
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  excerpt?: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface PricingPlan {
  id: string;
  price: string;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  implementation: string;
  case_study?: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  socials: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

export interface FooterInfo {
  id: string;
  company_info: {
    description: string;
    socialLinks: {
      instagram: string;
      linkedin: string;
    }
  };
  quick_links: {
    id: string;
    name: string;
    url: string;
  }[];
  products: {
    id: string;
    name: string;
    url: string;
  }[];
  contact_info: {
    address: string;
    phone: string;
    officeHours: {
      weekday: string;
      saturday: string;
      support: string;
    };
  };
}

type SupabaseContextType = {
  articles: Article[];
  services: Service[];
  pricing: PricingPlan[];
  clients: Client[];
  testimonials: Testimonial[];
  team: TeamMember[];
  footerInfo: FooterInfo | null;
  loading: {
    articles: boolean;
    services: boolean;
    pricing: boolean;
    clients: boolean;
    testimonials: boolean;
    team: boolean;
    footerInfo: boolean;
  };
  refreshArticles: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshPricing: () => Promise<void>;
  refreshClients: () => Promise<void>;
  refreshTestimonials: () => Promise<void>;
  refreshTeam: () => Promise<void>;
  refreshFooterInfo: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null);

  // Loading states
  const [loading, setLoading] = useState({
    articles: true,
    services: true,
    pricing: true,
    clients: true,
    testimonials: true,
    team: true,
    footerInfo: true,
  });

  // Initialize data from Supabase
  useEffect(() => {
    refreshAll();
  }, []);

  // Refresh functions
  const refreshArticles = async () => {
    try {
      setLoading(prev => ({ ...prev, articles: true }));
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setArticles(data as Article[]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(prev => ({ ...prev, articles: false }));
    }
  };

  const refreshServices = async () => {
    try {
      setLoading(prev => ({ ...prev, services: true }));
      const { data, error } = await supabase
        .from('services')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setServices(data as Service[]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  };

  const refreshPricing = async () => {
    try {
      setLoading(prev => ({ ...prev, pricing: true }));
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPricing(data as PricingPlan[]);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(prev => ({ ...prev, pricing: false }));
    }
  };

  const refreshClients = async () => {
    try {
      setLoading(prev => ({ ...prev, clients: true }));
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the JSON data into the required format
        const formattedClients = data.map(client => ({
          id: client.id,
          name: client.name,
          logo: client.logo,
          industry: client.industry,
          location: client.location,
          implementation: client.implementation,
          case_study: client.case_study ? client.case_study as unknown as {
            title: string;
            description: string;
            challenge: string;
            solution: string;
            result: string;
            image: string;
          } : undefined
        }));
        
        setClients(formattedClients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(prev => ({ ...prev, clients: false }));
    }
  };

  const refreshTestimonials = async () => {
    try {
      setLoading(prev => ({ ...prev, testimonials: true }));
      const { data, error } = await supabase
        .from('testimonials')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setTestimonials(data as Testimonial[]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(prev => ({ ...prev, testimonials: false }));
    }
  };

  const refreshTeam = async () => {
    try {
      setLoading(prev => ({ ...prev, team: true }));
      const { data, error } = await supabase
        .from('team_members')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the JSON data into the required format
        const formattedTeam = data.map(member => ({
          id: member.id,
          name: member.name,
          position: member.position,
          bio: member.bio,
          photo: member.photo,
          socials: member.socials as unknown as {
            linkedin: string;
            twitter: string;
            instagram: string;
          }
        }));
        
        setTeam(formattedTeam);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(prev => ({ ...prev, team: false }));
    }
  };

  const refreshFooterInfo = async () => {
    try {
      setLoading(prev => ({ ...prev, footerInfo: true }));
      const { data, error } = await supabase
        .from('footer_info')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for "no rows returned" which is fine for optional data
        throw error;
      }
      
      if (data) {
        // Transform the JSON data into the required format
        const formattedFooterInfo = {
          id: data.id,
          company_info: data.company_info as unknown as {
            description: string;
            socialLinks: {
              instagram: string;
              linkedin: string;
            }
          },
          quick_links: data.quick_links as unknown as {
            id: string;
            name: string;
            url: string;
          }[],
          products: data.products as unknown as {
            id: string;
            name: string;
            url: string;
          }[],
          contact_info: data.contact_info as unknown as {
            address: string;
            phone: string;
            officeHours: {
              weekday: string;
              saturday: string;
              support: string;
            }
          }
        };
        
        setFooterInfo(formattedFooterInfo);
      }
    } catch (error) {
      console.error('Error fetching footer info:', error);
    } finally {
      setLoading(prev => ({ ...prev, footerInfo: false }));
    }
  };

  const refreshAll = async () => {
    try {
      await Promise.all([
        refreshArticles(),
        refreshServices(),
        refreshPricing(),
        refreshClients(),
        refreshTestimonials(),
        refreshTeam(),
        refreshFooterInfo()
      ]);
    } catch (error) {
      console.error('Error refreshing all data:', error);
      toast.error('Terjadi kesalahan saat memuat data');
    }
  };

  const value = {
    articles,
    services,
    pricing,
    clients,
    testimonials,
    team,
    footerInfo,
    loading,
    refreshArticles,
    refreshServices,
    refreshPricing,
    refreshClients,
    refreshTestimonials,
    refreshTeam,
    refreshFooterInfo,
    refreshAll,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
