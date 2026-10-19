export type Language = 'az' | 'en' | 'ru';

export type ServiceKey = 'audit' | 'tax' | 'accounting' | 'law' | 'valuation';

export interface ServiceDetail {
  key: ServiceKey;
  title: string;
  shortDesc: string;
  scope: string[];
  deliverables: string[];
  badge?: string;
}

export interface DiagnosticMetrics {
  overallScore: number;
  liquidity: number;
  profitability: number;
  leverage: number;
  riskLevel: 'Aşağı' | 'Orta' | 'Yüksək' | 'Low' | 'Moderate' | 'High' | 'Низкий' | 'Умеренный' | 'Высокий';
  riskScore: number;
  compliance: number;
  summary: string;
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: ServiceKey;
  message: string;
  consent: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}
