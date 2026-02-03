
import { Product, Voucher } from './types';

export const CONFIG = {
  STORE_NAME: "NEONSTORE",
  MIN_RATING: 4.0,
  BANK: { 
    ID: "MB", 
    NO: "0333666999", 
    NAME: "NGUYEN VAN A", 
    TPL: "compact2" 
  },
  SOCIAL: {
    facebook: "https://facebook.com/neonstore",
    instagram: "https://instagram.com/neonstore",
    youtube: "https://youtube.com/@neonstore",
    tiktok: "https://tiktok.com/@neonstore",
  },
  MUSIC: {
    intro: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    outro: "https://assets.mixkit.co/music/preview/mixkit-feeling-happy-5.mp3"
  }
};

export const DB_PRODUCTS: Product[] = [
  { id: 101, name: "AI Automation Master N8N", cat: "Courses", subCat: "AI & Tech", price: 199000, originalPrice: 399000, usd: 9.99, comm: 90000, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", color: "from-emerald-600 to-green-900", hot: true, isNew: true, rating: 4.9, sold: 2580, stock: 999, desc: "Khóa học tự động hóa toàn bộ quy trình kinh doanh với N8N và AI." },
  { id: 102, name: "ChatGPT Masterclass 2026", cat: "Courses", subCat: "AI & Tech", price: 299000, originalPrice: 599000, usd: 14.99, comm: 120000, img: "https://images.unsplash.com/photo-1684469274290-55928e67a079?w=800&q=80", color: "from-teal-500 to-cyan-800", hot: true, isNew: true, rating: 4.95, sold: 5200, stock: 999, desc: "Làm chủ các Prompt nâng cao và xây dựng Chatbot riêng cho doanh nghiệp." },
  { id: 103, name: "No-Code AI Agents Guide", cat: "Courses", subCat: "AI & Tech", price: 299000, originalPrice: 499000, usd: 14.99, comm: 120000, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", color: "from-blue-600 to-slate-900", hot: true, isNew: false, rating: 4.8, sold: 1890, stock: 999, desc: "Xây dựng đội ngũ nhân viên ảo (AI Agents) thực hiện công việc thay bạn." },
  { id: 201, name: "Notion Ultimate Workspace", cat: "Templates", subCat: "Notion", price: 99000, originalPrice: 199000, usd: 4.99, comm: 40000, img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80", color: "from-gray-700 to-gray-900", hot: true, isNew: true, rating: 4.9, sold: 5600, stock: 999, desc: "Hệ thống quản lý công việc và cuộc sống toàn diện trên Notion." },
  { id: 1, name: "Thần Hổ Neon 8K", cat: "Neon Art", subCat: "Animals", price: 19000, originalPrice: 49000, usd: 0.99, comm: 5000, img: "https://images.unsplash.com/photo-1629812456605-4a044aa1ea63?w=800&q=80", color: "from-blue-500 to-purple-600", hot: false, isNew: false, rating: 4.8, sold: 3200, stock: 999, desc: "Hình nền nghệ thuật Neon hổ dũng mãnh độ phân giải 8K cực nét." },
  { id: 301, name: "AI Money Blueprint 2026", cat: "Ebooks", subCat: "AI", price: 49000, originalPrice: 99000, usd: 2.49, comm: 20000, img: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80", color: "from-emerald-500 to-teal-700", hot: true, isNew: true, rating: 4.7, sold: 8900, stock: 999, desc: "Cẩm nang các mô hình kinh doanh kiếm tiền thụ động với AI." },
];

export const VOUCHERS: Record<string, Voucher> = {
  "WELCOME10": { discount: 10, type: "percent", minOrder: 0, desc: "Giảm 10% cho đơn hàng đầu tiên" },
  "NEON100K": { discount: 100000, type: "fixed", minOrder: 500000, desc: "Giảm ngay 100.000đ" },
};

export const LANGUAGES: any = {
  vi: { 
    name: "Tiếng Việt", 
    flag: "🇻🇳", 
    translations: { 
      search: "Tìm sản phẩm AI...", 
      cart: "Giỏ hàng", 
      checkout: "Thanh toán ngay", 
      addToCart: "Thêm vào giỏ", 
      sold: "Đã bán", 
      allProducts: "Tất cả sản phẩm", 
      login: "Đăng nhập", 
      register: "Đăng ký",
      total: "Tổng cộng",
      cartEmpty: "Chưa có sản phẩm nào",
      thankYou: "THANH TOÁN THÀNH CÔNG!",
      orderSuccessDesc: "Cảm ơn bạn! Link tải sản phẩm đã được gửi vào Email của bạn.",
      backToShop: "Quay lại mua tiếp",
      accessProducts: "Tải sản phẩm ngay",
      rateUs: "ĐÁNH GIÁ TRẢI NGHIỆM",
      amount: "Số tiền",
      content: "Nội dung",
      confirmPaid: "TÔI ĐÃ CHUYỂN KHOẢN",
      askAnything: "Hỏi NEON bất cứ điều gì..."
    } 
  },
  en: { 
    name: "English", 
    flag: "🇺🇸", 
    translations: { 
      search: "Search AI products...", 
      cart: "Cart", 
      checkout: "Checkout Now", 
      addToCart: "Add to Cart", 
      sold: "Sold", 
      allProducts: "All Products", 
      login: "Login", 
      register: "Register",
      total: "Total",
      cartEmpty: "Cart is empty",
      thankYou: "PAYMENT SUCCESSFUL!",
      orderSuccessDesc: "Thank you! The product link has been sent to your email.",
      backToShop: "Continue Shopping",
      accessProducts: "Download Now",
      rateUs: "RATE YOUR EXPERIENCE",
      amount: "Amount",
      content: "Content",
      confirmPaid: "I HAVE PAID",
      askAnything: "Ask NEON anything..."
    } 
  },
};

export const CURRENCIES: any = {
  VND: { symbol: "₫", rate: 1 },
  USD: { symbol: "$", rate: 0.00004 }
};

export const LIVE_CHANNELS = []; // Placeholder to avoid errors
