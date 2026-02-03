
export interface Product {
  id: number;
  name: string;
  cat: string;
  subCat: string;
  price: number;
  originalPrice: number;
  usd: number;
  comm: number;
  img: string;
  color: string;
  hot: boolean;
  isNew: boolean;
  rating: number;
  sold: number;
  stock: number;
  desc: string;
}

export type LangKey = 'vi' | 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'pt' | 'ru';
export type CurrencyKey = 'VND' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW';

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  isHuman: boolean;
  timestamp: number;
}

export interface Voucher {
  discount: number;
  type: 'percent' | 'fixed';
  minOrder: number;
  desc: string;
}
