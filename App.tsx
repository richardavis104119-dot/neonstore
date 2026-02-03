import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShoppingCart, X, Zap, Check, Globe, User, Copy, Upload, Clock, 
  MessageCircle, Send, Search, Camera, Star, TrendingUp, Heart, ChevronRight,
  Play, Pause, Volume2, VolumeX, Shield, Award, Truck, ArrowUp, Moon, Sun,
  Mail, Lock, Eye, EyeOff, CheckCircle, Package, Gift, HelpCircle,
  Video, Users, Radio, SlidersHorizontal, Flame, Sparkles, BookOpen, RotateCcw,
  Facebook, Instagram, Youtube, Music2, MessageSquare, Tv, Infinity, Download,
  ShoppingBag, CreditCard, Phone, Headphones, Wifi, WifiOff, ChevronDown,
  AlertTriangle, RefreshCw, Activity, Server, Bot, Settings, ExternalLink
} from 'lucide-react';

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  🛒 NEONSTORE - ULTIMATE E-COMMERCE PLATFORM                                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ============================================================================
// 🔧 CẤU HÌNH CHÍNH
// ============================================================================
const CONFIG = {
  STORE_NAME: "NEONSTORE",
  STORE_SLOGAN: "Digital Products & Courses Platform",
  BANK: { ID: "MB", NO: "0333666999", NAME: "NGUYEN VAN A", TPL: "compact2" },
  SOCIAL: {
    facebook: "https://facebook.com/neonstore",
    instagram: "https://instagram.com/neonstore",
    youtube: "https://youtube.com/@neonstore",
    tiktok: "https://tiktok.com/@neonstore",
    zalo: "https://zalo.me/0999999999",
    discord: "https://discord.gg/neonstore"
  },
  HOTLINE: "1900 1234",
  EMAIL: "support@neonstore.vn",
  MIN_RATING: 4.0,
};

// ============================================================================
// ☁️ CLOUDFLARE CONFIG
// ============================================================================
const CLOUDFLARE_CONFIG = {
  TURNSTILE_SITE_KEY: "0x4AAAAAAAxxxxxYOUR_KEY_HERE",
  ANALYTICS_TOKEN: "your-analytics-token",
  SECURITY: { UNDER_ATTACK_MODE: false, BOT_FIGHT_MODE: true, BROWSER_INTEGRITY_CHECK: true },
  DASHBOARD_URL: "https://dash.cloudflare.com",
};

// ============================================================================
// 🛍️ DANH SÁCH SẢN PHẨM
// ============================================================================
interface Product {
  id: number; name: string; cat: string; subCat: string; price: number; originalPrice: number;
  usd: number; comm: number; img: string; color: string; hot: boolean; isNew: boolean;
  rating: number; sold: number; stock: number; desc: string; keywords?: string[];
}

const PRODUCTS: Product[] = [
  { id: 101, name: "AI Automation Master N8N", cat: "Courses", subCat: "AI & Tech", price: 199000, originalPrice: 399000, usd: 9.99, comm: 990000, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", color: "from-emerald-600 to-green-900", hot: true, isNew: true, rating: 4.9, sold: 2580, stock: 999, desc: "Khóa học tự động hóa với N8N và AI", keywords: ["n8n", "automation", "ai"] },
  { id: 102, name: "ChatGPT Masterclass 2026", cat: "Courses", subCat: "AI & Tech", price: 299000, originalPrice: 599000, usd: 14.99, comm: 1500000, img: "https://images.unsplash.com/photo-1684469274290-55928e67a079?w=800&q=80", color: "from-teal-500 to-cyan-800", hot: true, isNew: true, rating: 4.95, sold: 5200, stock: 999, desc: "Thành thạo ChatGPT từ A-Z", keywords: ["chatgpt", "openai", "ai"] },
  { id: 103, name: "No-Code AI Agents Guide", cat: "Courses", subCat: "AI & Tech", price: 299000, originalPrice: 499000, usd: 14.99, comm: 1500000, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", color: "from-blue-600 to-slate-900", hot: true, isNew: false, rating: 4.8, sold: 1890, stock: 999, desc: "Xây dựng AI Agents không cần code", keywords: ["ai agents", "no-code"] },
  { id: 104, name: "Python for Data Science", cat: "Courses", subCat: "AI & Tech", price: 349000, originalPrice: 699000, usd: 16.99, comm: 1800000, img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", color: "from-yellow-500 to-green-600", hot: true, isNew: true, rating: 4.85, sold: 3400, stock: 999, desc: "Python cho khoa học dữ liệu", keywords: ["python", "data science"] },
  { id: 105, name: "Influencer Marketing Agency", cat: "Courses", subCat: "Marketing", price: 0, originalPrice: 299000, usd: 0, comm: 0, img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", color: "from-pink-600 to-rose-900", hot: true, isNew: false, rating: 4.7, sold: 8900, stock: 999, desc: "Xây dựng agency influencer marketing - MIỄN PHÍ", keywords: ["influencer", "marketing"] },
  { id: 106, name: "Ultimate Sales Blueprint", cat: "Courses", subCat: "Marketing", price: 399000, originalPrice: 799000, usd: 19.99, comm: 2000000, img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", color: "from-red-600 to-red-950", hot: true, isNew: false, rating: 4.9, sold: 4200, stock: 999, desc: "Chiến lược sales chuyên nghiệp", keywords: ["sales", "bán hàng"] },
  { id: 107, name: "Facebook Ads Mastery 2026", cat: "Courses", subCat: "Marketing", price: 449000, originalPrice: 899000, usd: 21.99, comm: 2200000, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80", color: "from-blue-600 to-blue-900", hot: true, isNew: true, rating: 4.88, sold: 2100, stock: 999, desc: "Quảng cáo Facebook từ A-Z", keywords: ["facebook", "ads"] },
  { id: 108, name: "TikTok Shop Strategy", cat: "Courses", subCat: "Marketing", price: 349000, originalPrice: 599000, usd: 16.99, comm: 1700000, img: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80", color: "from-gray-900 to-black", hot: true, isNew: true, rating: 4.92, sold: 3800, stock: 999, desc: "Bán hàng trên TikTok Shop", keywords: ["tiktok", "shop"] },
  { id: 1, name: "Thần Hổ Neon 8K", cat: "Neon Art", subCat: "Animals", price: 19000, originalPrice: 49000, usd: 0.99, comm: 490000, img: "https://images.unsplash.com/photo-1629812456605-4a044aa1ea63?w=800&q=80", color: "from-blue-500 to-purple-600", hot: false, isNew: false, rating: 4.8, sold: 3200, stock: 999, desc: "Hình nền hổ Neon 8K", keywords: ["neon", "tiger"] },
  { id: 2, name: "Rồng Thần Neon 8K", cat: "Neon Art", subCat: "Animals", price: 19000, originalPrice: 49000, usd: 0.99, comm: 490000, img: "https://images.unsplash.com/photo-1599691651586-778811800171?w=800&q=80", color: "from-cyan-400 to-blue-600", hot: true, isNew: false, rating: 4.85, sold: 4100, stock: 999, desc: "Hình nền rồng Neon 8K", keywords: ["neon", "dragon"] },
  { id: 201, name: "Notion Ultimate Workspace", cat: "Templates", subCat: "Notion", price: 99000, originalPrice: 199000, usd: 4.99, comm: 400000, img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80", color: "from-gray-700 to-gray-900", hot: true, isNew: true, rating: 4.9, sold: 5600, stock: 999, desc: "Template Notion đa năng", keywords: ["notion", "template"] },
  { id: 301, name: "AI Money Blueprint 2026", cat: "Ebooks", subCat: "AI", price: 49000, originalPrice: 99000, usd: 2.49, comm: 200000, img: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80", color: "from-emerald-500 to-teal-700", hot: true, isNew: true, rating: 4.7, sold: 8900, stock: 999, desc: "Kiếm tiền với AI 2026", keywords: ["ai", "money"] },
];

// ============================================================================
// 🎫 VOUCHER CODES
// ============================================================================
const VOUCHERS: Record<string, { discount: number; type: 'percent' | 'fixed'; minOrder: number; desc: string }> = {
  "WELCOME10": { discount: 10, type: "percent", minOrder: 0, desc: "Giảm 10% đơn đầu tiên" },
  "LIVE50": { discount: 50, type: "percent", minOrder: 500000, desc: "Flash Sale Live 50%" },
  "FLASH40": { discount: 40, type: "percent", minOrder: 200000, desc: "Flash Deal 40%" },
  "NEON100K": { discount: 100000, type: "fixed", minOrder: 300000, desc: "Giảm 100K" },
  "VIP30": { discount: 30, type: "percent", minOrder: 1000000, desc: "VIP giảm 30%" },
  "FREESHIP": { discount: 50000, type: "fixed", minOrder: 0, desc: "Free Ship 50K" },
};

// ============================================================================
// 📺 LIVE STREAMING CHANNELS
// ============================================================================
const LIVE_CHANNELS = [
  { id: 1, platform: "TikTok", icon: Music2, color: "from-black to-gray-800", viewers: 12500, products: 45, url: CONFIG.SOCIAL.tiktok, isLive: true, desc: "Live bán hàng mỗi ngày 20h-23h" },
  { id: 2, platform: "Shopee Live", icon: Tv, color: "from-orange-500 to-red-500", viewers: 8300, products: 32, url: "https://shopee.vn/neonstore", isLive: true, desc: "Flash sale mỗi giờ" },
  { id: 3, platform: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800", viewers: 5600, products: 28, url: CONFIG.SOCIAL.facebook, isLive: true, desc: "Q&A và tư vấn sản phẩm" },
  { id: 4, platform: "YouTube", icon: Youtube, color: "from-red-600 to-red-800", viewers: 15200, products: 50, url: CONFIG.SOCIAL.youtube, isLive: true, desc: "Review chi tiết sản phẩm" },
  { id: 5, platform: "Instagram", icon: Instagram, color: "from-purple-500 via-pink-500 to-orange-400", viewers: 7800, products: 25, url: CONFIG.SOCIAL.instagram, isLive: false, desc: "Behind the scenes" },
  { id: 6, platform: "Discord", icon: MessageSquare, color: "from-indigo-600 to-indigo-800", viewers: 2100, products: 15, url: CONFIG.SOCIAL.discord, isLive: true, desc: "Cộng đồng VIP members" }
];

// ============================================================================
// 🤖 CHATBOT AI CONFIG
// ============================================================================
const CHATBOT_CONFIG = {
  NAME: "Neon AI",
  AVATAR: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  HUMAN_NAME: "Minh Anh",
  HUMAN_AVATAR: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  WELCOME: "Xin chào bạn! 👋 Mình là Neon AI - trợ lý ảo của NEONSTORE. Bạn cần hỗ trợ gì ạ? 😊",
  RESPONSES: {
    greeting: ["Xin chào bạn! 👋 Rất vui được hỗ trợ bạn hôm nay. Bạn đang tìm kiếm sản phẩm gì ạ?"],
    price: ["Dạ giá bên em được niêm yết công khai trên website rồi ạ! 💰\n\n💡 Tip: Bạn có thể dùng mã WELCOME10 để giảm 10% đơn đầu tiên nhé!"],
    purchase: ["Tuyệt vời! 🎉 Để mua hàng, bạn chỉ cần:\n\n1️⃣ Chọn sản phẩm → Thêm vào giỏ\n2️⃣ Nhấn \"Thanh toán\"\n3️⃣ Quét mã QR chuyển khoản\n4️⃣ Nhận link download ngay!\n\nCần em hỗ trợ thêm không ạ? 😊"],
    promotion: ["🔥 KHUYẾN MÃI HOT hiện tại:\n\n🎫 WELCOME10 - Giảm 10% đơn đầu\n🎫 LIVE50 - Giảm 50% (đơn từ 500K)\n🎫 FLASH40 - Giảm 40%\n🎫 NEON100K - Giảm 100K\n🎫 FREESHIP - Miễn phí ship 50K\n\nNhập mã khi thanh toán nhé! 💰"],
    payment: ["Bên em hỗ trợ nhiều hình thức thanh toán:\n\n🇻🇳 Chuyển khoản ngân hàng (VietQR)\n💳 PayPal (Quốc tế)\n💳 Stripe (Visa/Master)\n💸 Wise\n\nQR code được tạo tự động, quét là xong! ⚡"],
    shipping: ["Sản phẩm số được gửi NGAY LẬP TỨC sau khi thanh toán ạ! ⚡\n\n📧 Link download gửi qua email\n📱 Hoặc qua Zalo\n\nKhông cần chờ đợi! 🎉"],
    refund: ["Bên em có chính sách hoàn tiền 7 ngày ạ! 💯\n\n✅ Hoàn 100% nếu sản phẩm lỗi\n✅ Hoàn 100% nếu không đúng mô tả\n✅ Hỗ trợ đổi sản phẩm khác"],
    warranty: ["Chính sách BẢO HÀNH TRỌN ĐỜI của NEONSTORE:\n\n♾️ Cập nhật miễn phí trọn đời\n♾️ Hỗ trợ kỹ thuật 24/7\n♾️ Thay thế nếu link hỏng\n♾️ Truy cập không giới hạn\n\nMua 1 lần, dùng mãi mãi! 🎉"],
    contact: [`Bạn có thể liên hệ bên em qua:\n\n📞 Hotline: ${CONFIG.HOTLINE}\n📧 Email: ${CONFIG.EMAIL}\n💬 Zalo: ${CONFIG.SOCIAL.zalo}\n\nHỗ trợ 24/7, phản hồi trong 5 phút! ⚡`],
    human: ["Dạ em sẽ kết nối bạn với nhân viên tư vấn ngay ạ! 👨‍💼\n\n⏳ Vui lòng chờ trong giây lát..."],
    thanks: ["Dạ không có gì ạ! 😊 Rất vui vì được hỗ trợ bạn!\n\nChúc bạn mua sắm vui vẻ! 🎉"],
    default: ["Dạ em hiểu rồi ạ! 😊 Bạn có thể cho em biết thêm chi tiết được không?\n\nHoặc bạn có thể hỏi về:\n• Sản phẩm & giá cả\n• Cách mua hàng\n• Khuyến mãi\n• Thanh toán"]
  },
  INTENTS: {
    greeting: ["xin chào", "hello", "hi", "chào", "hey", "alo"],
    price: ["giá", "bao nhiêu", "tiền", "phí", "cost", "price"],
    purchase: ["mua", "đặt", "order", "buy", "thêm giỏ", "hướng dẫn"],
    promotion: ["khuyến mãi", "giảm giá", "voucher", "mã giảm", "sale"],
    payment: ["thanh toán", "payment", "chuyển khoản", "qr", "paypal"],
    shipping: ["ship", "giao", "delivery", "nhận", "khi nào", "tự động"],
    refund: ["hoàn", "trả", "refund", "đổi"],
    warranty: ["bảo hành", "warranty", "trọn đời", "cập nhật"],
    contact: ["liên hệ", "contact", "hotline", "số điện thoại", "zalo"],
    thanks: ["cảm ơn", "thank", "thanks", "tks", "ok"],
    human: ["người thật", "nhân viên", "tư vấn viên", "staff", "human"]
  }
};

// ============================================================================
// 🌍 NGÔN NGỮ & TIỀN TỆ
// ============================================================================
type LangKey = 'vi' | 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'pt' | 'ru';
type CurrencyKey = 'VND' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW';

const LANGUAGES: Record<LangKey, { name: string; flag: string; translations: Record<string, string> }> = {
  vi: { name: "Tiếng Việt", flag: "🇻🇳", translations: { search: "Tìm kiếm sản phẩm...", cart: "Giỏ hàng", checkout: "Thanh toán", addToCart: "Thêm vào giỏ", sold: "Đã bán", live: "LIVE 24/7", login: "Đăng nhập", register: "Đăng ký", allProducts: "Tất cả", viewers: "người xem", products: "sản phẩm", watchNow: "Xem ngay", popular: "Phổ biến", bestSeller: "Bán chạy", newest: "Mới nhất", voucher: "Mã giảm giá", apply: "Áp dụng", total: "Tổng cộng", thankYou: "Cảm ơn bạn đã mua hàng!", rateUs: "Nếu hài lòng, hãy đánh giá 5 sao nhé!" }},
  en: { name: "English", flag: "🇺🇸", translations: { search: "Search products...", cart: "Cart", checkout: "Checkout", addToCart: "Add to Cart", sold: "Sold", live: "LIVE 24/7", login: "Login", register: "Register", allProducts: "All Products", viewers: "viewers", products: "products", watchNow: "Watch Now", popular: "Popular", bestSeller: "Best Seller", newest: "Newest", voucher: "Voucher Code", apply: "Apply", total: "Total", thankYou: "Thank you for your purchase!", rateUs: "If satisfied, please rate us 5 stars!" }},
  zh: { name: "中文", flag: "🇨🇳", translations: { search: "搜索产品...", cart: "购物车", checkout: "结账", addToCart: "加入购物车", sold: "已售", live: "直播24/7", login: "登录", register: "注册", allProducts: "全部商品", viewers: "观众", products: "商品", watchNow: "立即观看", popular: "热门", bestSeller: "畅销", newest: "最新", voucher: "优惠券", apply: "使用", total: "合计", thankYou: "感谢您的购买！", rateUs: "如果满意，请给我们5星好评！" }},
  ja: { name: "日本語", flag: "🇯🇵", translations: { search: "商品を検索...", cart: "カート", checkout: "レジに進む", addToCart: "カートに追加", sold: "販売済み", live: "ライブ24/7", login: "ログイン", register: "登録", allProducts: "すべての商品", viewers: "視聴者", products: "商品", watchNow: "今すぐ見る", popular: "人気", bestSeller: "ベストセラー", newest: "新着", voucher: "クーポン", apply: "適用", total: "合計", thankYou: "ご購入ありがとうございます！", rateUs: "ご満足いただけましたら、5つ星の評価をお願いします！" }},
  ko: { name: "한국어", flag: "🇰🇷", translations: { search: "상품 검색...", cart: "장바구니", checkout: "결제", addToCart: "장바구니에 추가", sold: "판매됨", live: "라이브 24/7", login: "로그인", register: "회원가입", allProducts: "전체 상품", viewers: "시청자", products: "상품", watchNow: "지금 보기", popular: "인기", bestSeller: "베스트셀러", newest: "신상품", voucher: "쿠폰", apply: "적용", total: "총액", thankYou: "구매해 주셔서 감사합니다!", rateUs: "만족하셨다면 별 5개 부탁드려요!" }},
  fr: { name: "Français", flag: "🇫🇷", translations: { search: "Rechercher...", cart: "Panier", checkout: "Paiement", addToCart: "Ajouter au panier", sold: "Vendu", live: "LIVE 24/7", login: "Connexion", register: "Inscription", allProducts: "Tous", viewers: "spectateurs", products: "produits", watchNow: "Regarder", popular: "Populaire", bestSeller: "Meilleures ventes", newest: "Nouveau", voucher: "Code promo", apply: "Appliquer", total: "Total", thankYou: "Merci pour votre achat!", rateUs: "Si satisfait, donnez-nous 5 étoiles!" }},
  de: { name: "Deutsch", flag: "🇩🇪", translations: { search: "Suchen...", cart: "Warenkorb", checkout: "Kasse", addToCart: "In den Warenkorb", sold: "Verkauft", live: "LIVE 24/7", login: "Anmelden", register: "Registrieren", allProducts: "Alle", viewers: "Zuschauer", products: "Produkte", watchNow: "Ansehen", popular: "Beliebt", bestSeller: "Bestseller", newest: "Neueste", voucher: "Gutscheincode", apply: "Anwenden", total: "Gesamt", thankYou: "Danke für Ihren Einkauf!", rateUs: "Wenn zufrieden, geben Sie uns 5 Sterne!" }},
  es: { name: "Español", flag: "🇪🇸", translations: { search: "Buscar...", cart: "Carrito", checkout: "Pagar", addToCart: "Añadir al carrito", sold: "Vendido", live: "EN VIVO 24/7", login: "Iniciar sesión", register: "Registrarse", allProducts: "Todo", viewers: "espectadores", products: "productos", watchNow: "Ver ahora", popular: "Popular", bestSeller: "Más vendido", newest: "Nuevo", voucher: "Código", apply: "Aplicar", total: "Total", thankYou: "¡Gracias por su compra!", rateUs: "Si está satisfecho, ¡denos 5 estrellas!" }},
  pt: { name: "Português", flag: "🇧🇷", translations: { search: "Pesquisar...", cart: "Carrinho", checkout: "Finalizar", addToCart: "Adicionar", sold: "Vendido", live: "AO VIVO 24/7", login: "Entrar", register: "Cadastrar", allProducts: "Todos", viewers: "espectadores", products: "produtos", watchNow: "Assistir", popular: "Popular", bestSeller: "Mais vendido", newest: "Novo", voucher: "Cupom", apply: "Aplicar", total: "Total", thankYou: "Obrigado pela compra!", rateUs: "Se satisfeito, dê-nos 5 estrelas!" }},
  ru: { name: "Русский", flag: "🇷🇺", translations: { search: "Поиск...", cart: "Корзина", checkout: "Оплата", addToCart: "В корзину", sold: "Продано", live: "LIVE 24/7", login: "Войти", register: "Регистрация", allProducts: "Все", viewers: "зрителей", products: "товаров", watchNow: "Смотреть", popular: "Популярное", bestSeller: "Бестселлер", newest: "Новинки", voucher: "Промокод", apply: "Применить", total: "Итого", thankYou: "Спасибо за покупку!", rateUs: "Если довольны, поставьте 5 звёзд!" }}
};

const CURRENCIES: Record<CurrencyKey, { symbol: string; rate: number }> = {
  VND: { symbol: "₫", rate: 1 },
  USD: { symbol: "$", rate: 0.00004 },
  EUR: { symbol: "€", rate: 0.000037 },
  GBP: { symbol: "£", rate: 0.000032 },
  JPY: { symbol: "¥", rate: 0.006 },
  CNY: { symbol: "¥", rate: 0.00029 },
  KRW: { symbol: "₩", rate: 0.054 }
};

// ============================================================================
// 📄 NỘI DUNG CÁC TRANG HỖ TRỢ
// ============================================================================
const SUPPORT_CONTENT = {
  autoDelivery: {
    title: "⚡ Giao Hàng Tự Động",
    icon: Truck,
    color: "cyan",
    content: [
      { title: "Sản phẩm số - Nhận ngay lập tức", desc: "Sau khi thanh toán thành công, bạn sẽ nhận được link download NGAY LẬP TỨC qua email và Zalo." },
      { title: "Không cần chờ đợi", desc: "Hệ thống tự động xác nhận thanh toán và gửi sản phẩm trong vòng 1-5 phút." },
      { title: "Truy cập 24/7", desc: "Link download không giới hạn thời gian, bạn có thể tải lại bất cứ lúc nào." },
      { title: "Hỗ trợ đa thiết bị", desc: "Sản phẩm có thể sử dụng trên PC, Laptop, Tablet, Điện thoại." }
    ]
  },
  warranty: {
    title: "♾️ Bảo Hành Trọn Đời",
    icon: Infinity,
    color: "green",
    content: [
      { title: "Cập nhật miễn phí mãi mãi", desc: "Mọi bản cập nhật mới của khóa học/sản phẩm đều được gửi miễn phí cho bạn." },
      { title: "Hỗ trợ kỹ thuật 24/7", desc: "Team support luôn sẵn sàng hỗ trợ qua Zalo, Email, Chat ngay trên website." },
      { title: "Thay thế link hỏng", desc: "Nếu link download bị lỗi, chúng tôi sẽ gửi link mới trong vòng 5 phút." },
      { title: "Cam kết chất lượng", desc: "Sản phẩm lỗi hoặc không đúng mô tả sẽ được hoàn tiền 100%." }
    ]
  },
  helpCenter: {
    title: "❓ Trung Tâm Trợ Giúp",
    icon: HelpCircle,
    color: "blue",
    faqs: [
      { q: "Làm sao để mua hàng?", a: "Chọn sản phẩm → Thêm vào giỏ → Thanh toán → Nhận link download qua email/Zalo." },
      { q: "Thanh toán bằng cách nào?", a: "Chuyển khoản ngân hàng (VietQR), PayPal, Stripe, Wise. QR code tự động tạo." },
      { q: "Bao lâu thì nhận được sản phẩm?", a: "Ngay lập tức! 1-5 phút sau khi thanh toán thành công." },
      { q: "Có được hoàn tiền không?", a: "Có! Hoàn tiền 100% trong 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả." },
      { q: "Sản phẩm có cập nhật không?", a: "Có! Cập nhật miễn phí trọn đời, bạn sẽ nhận được bản mới qua email." },
      { q: "Liên hệ hỗ trợ ở đâu?", a: `Hotline: ${CONFIG.HOTLINE} | Email: ${CONFIG.EMAIL} | Zalo: ${CONFIG.SOCIAL.zalo}` }
    ]
  },
  buyGuide: {
    title: "📖 Hướng Dẫn Mua Hàng",
    icon: BookOpen,
    color: "purple",
    steps: [
      { step: 1, title: "Chọn sản phẩm", desc: "Duyệt qua các danh mục, xem chi tiết và đánh giá sản phẩm.", icon: Search },
      { step: 2, title: "Thêm vào giỏ hàng", desc: "Nhấn nút 'Thêm vào giỏ' để thêm sản phẩm bạn muốn mua.", icon: ShoppingCart },
      { step: 3, title: "Áp dụng mã giảm giá", desc: "Nhập mã voucher (nếu có) để được giảm giá. VD: WELCOME10", icon: Gift },
      { step: 4, title: "Thanh toán", desc: "Chọn phương thức thanh toán và quét mã QR để chuyển khoản.", icon: CreditCard },
      { step: 5, title: "Tải ảnh bill", desc: "Upload ảnh chuyển khoản thành công để xác nhận đơn hàng.", icon: Upload },
      { step: 6, title: "Nhận sản phẩm", desc: "Link download được gửi qua Email và Zalo trong 1-5 phút.", icon: Download }
    ]
  },
  refundPolicy: {
    title: "💸 Chính Sách Hoàn Tiền",
    icon: RotateCcw,
    color: "yellow",
    policies: [
      { title: "✅ Được hoàn tiền 100%", items: ["Sản phẩm bị lỗi, không thể sử dụng", "Nội dung không đúng như mô tả", "Link download không hoạt động và không thể sửa", "Gửi nhầm sản phẩm"] },
      { title: "❌ Không hoàn tiền", items: ["Đã tải/sử dụng sản phẩm thành công", "Thay đổi ý định sau khi mua", "Yêu cầu sau 7 ngày kể từ ngày mua", "Sản phẩm miễn phí (FREE)"] },
      { title: "📝 Quy trình hoàn tiền", items: ["Liên hệ support qua Zalo/Email", "Cung cấp mã đơn hàng và lý do", "Xác minh trong 24 giờ", "Hoàn tiền trong 1-3 ngày làm việc"] }
    ]
  }
};

// ============================================================================
// ☁️ CLOUDFLARE COMPONENTS
// ============================================================================
const CloudflareTurnstile: React.FC<{ onVerify: () => void; verified: boolean }> = ({ onVerify, verified }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

  const startVerification = () => {
    setStatus('verifying');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setStatus('success'); onVerify(); return 100; }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center"><Shield className="text-orange-400" size={20} /></div>
        <div><h4 className="font-bold text-sm text-white">Cloudflare Turnstile</h4><p className="text-[10px] text-gray-400">Xác minh bảo mật</p></div>
      </div>
      {verified || status === 'success' ? (
        <div className="flex items-center gap-2 text-green-400 bg-green-500/10 p-3 rounded-lg"><CheckCircle size={18} /><span className="font-bold text-sm">Đã xác minh thành công!</span></div>
      ) : status === 'verifying' ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400"><RefreshCw size={16} className="animate-spin" /><span className="text-sm">Đang phân tích hành vi...</span></div>
          <div className="h-2 bg-black/30 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-150" style={{ width: `${progress}%` }} /></div>
        </div>
      ) : (
        <button onClick={startVerification} className="w-full py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-orange-400 font-bold text-sm transition-colors flex items-center justify-center gap-2"><Bot size={16} />Xác minh tôi không phải robot</button>
      )}
    </div>
  );
};

const CloudflareChallengePage: React.FC<{ onPass: () => void }> = ({ onPass }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Đang kiểm tra kết nối...", icon: Wifi },
    { label: "Phân tích trình duyệt...", icon: Activity },
    { label: "Kiểm tra JavaScript...", icon: Server },
    { label: "Xác thực Cookies...", icon: Shield },
    { label: "Hoàn tất xác minh!", icon: CheckCircle }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => { if (prev >= steps.length - 1) { clearInterval(timer); setTimeout(onPass, 1000); return prev; } return prev + 1; });
    }, 800);
    return () => clearInterval(timer);
  }, [onPass, steps.length]);

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4"><Shield className="w-10 h-10 text-orange-400" /></div>
        <h1 className="text-2xl font-black text-white mb-2">Cloudflare Security Check</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="space-y-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${i < step ? 'bg-green-500/10' : i === step ? 'bg-orange-500/10' : 'bg-white/5'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < step ? 'bg-green-500' : i === step ? 'bg-orange-500 animate-pulse' : 'bg-gray-700'}`}>
                    {i < step ? <Check size={16} className="text-white" /> : <Icon size={16} className="text-white" />}
                  </div>
                  <span className={`text-sm ${i < step ? 'text-green-400' : i === step ? 'text-orange-400' : 'text-gray-500'}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CloudflareSecurityDashboard: React.FC<{ isOpen: boolean; onClose: () => void; darkMode: boolean }> = ({ isOpen, onClose, darkMode }) => {
  const [botFightMode, setBotFightMode] = useState(true);
  const [underAttackMode, setUnderAttackMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 w-80">
      <div className={`${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2"><Shield className="text-white" size={20} /><span className="font-bold text-white">Cloudflare Security</span></div>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {[{ label: "Threats Blocked", value: "1,247", color: "red" }, { label: "Total Requests", value: "58,420", color: "blue" }, { label: "Bandwidth Saved", value: "2.4 GB", color: "green" }, { label: "Cache Hit Rate", value: "94.5%", color: "purple" }].map((stat, i) => (
            <div key={i} className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className={`px-4 pb-4 space-y-3 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} pt-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Bot size={16} className="text-orange-400" /><span className="text-sm">Bot Fight Mode</span></div>
            <button onClick={() => setBotFightMode(!botFightMode)} className={`w-10 h-6 rounded-full p-1 transition-colors ${botFightMode ? 'bg-green-500' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${botFightMode ? 'translate-x-4' : ''}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><AlertTriangle size={16} className="text-red-400" /><span className="text-sm">Under Attack Mode</span></div>
            <button onClick={() => setUnderAttackMode(!underAttackMode)} className={`w-10 h-6 rounded-full p-1 transition-colors ${underAttackMode ? 'bg-red-500' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${underAttackMode ? 'translate-x-4' : ''}`} />
            </button>
          </div>
        </div>
        <a href={CLOUDFLARE_CONFIG.DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="block p-4 bg-orange-500/10 text-center text-orange-400 text-sm font-bold hover:bg-orange-500/20">
          <Settings size={14} className="inline mr-2" />Open Cloudflare Dashboard →
        </a>
      </div>
    </div>
  );
};

const OfflinePage: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="fixed inset-0 z-[200] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6"><WifiOff className="w-12 h-12 text-red-400" /></div>
      <h1 className="text-3xl font-black text-white mb-4">Mất kết nối</h1>
      <p className="text-gray-400 mb-8">Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.</p>
      <button onClick={onRetry} className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 flex items-center gap-2 mx-auto"><RefreshCw size={18} />Thử lại</button>
    </div>
  </div>
);

// ============================================================================
// 📄 SUPPORT MODAL COMPONENT
// ============================================================================
const SupportModal: React.FC<{ type: string; onClose: () => void; darkMode: boolean }> = ({ type, onClose, darkMode }) => {
  const content = SUPPORT_CONTENT[type as keyof typeof SUPPORT_CONTENT];
  if (!content) return null;

  const IconComponent = content.icon;
  const colorClass = content.color === 'cyan' ? 'from-cyan-500 to-blue-600' : 
                     content.color === 'green' ? 'from-green-500 to-emerald-600' :
                     content.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                     content.color === 'purple' ? 'from-purple-500 to-pink-600' :
                     'from-yellow-500 to-orange-600';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className={`relative ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${colorClass} p-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><IconComponent className="text-white" size={24} /></div>
            <h2 className="text-2xl font-black text-white">{content.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><X className="text-white" size={20} /></button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Auto Delivery */}
          {type === 'autoDelivery' && (
            <div className="space-y-4">
              {(content as typeof SUPPORT_CONTENT.autoDelivery).content.map((item, i) => (
                <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'} flex gap-4`}>
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="text-cyan-400" size={20} />
                  </div>
                  <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-gray-400">{item.desc}</p></div>
                </div>
              ))}
              <div className={`mt-6 p-4 rounded-xl bg-gradient-to-r ${colorClass} text-white`}>
                <p className="font-bold text-lg">⚡ Giao hàng trong 1-5 phút!</p>
                <p className="text-white/80 text-sm">Hệ thống tự động 24/7, không cần đợi nhân viên xử lý.</p>
              </div>
            </div>
          )}

          {/* Warranty */}
          {type === 'warranty' && (
            <div className="space-y-4">
              {(content as typeof SUPPORT_CONTENT.warranty).content.map((item, i) => (
                <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'} flex gap-4`}>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Infinity className="text-green-400" size={20} />
                  </div>
                  <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-gray-400">{item.desc}</p></div>
                </div>
              ))}
            </div>
          )}

          {/* Help Center / FAQ */}
          {type === 'helpCenter' && (
            <div className="space-y-3">
              {(content as typeof SUPPORT_CONTENT.helpCenter).faqs.map((faq, i) => (
                <details key={i} className={`group p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <summary className="font-bold cursor-pointer flex items-center justify-between">
                    {faq.q}
                    <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" size={18} />
                  </summary>
                  <p className="mt-3 text-sm text-gray-400 pl-4 border-l-2 border-cyan-500">{faq.a}</p>
                </details>
              ))}
            </div>
          )}

          {/* Buy Guide */}
          {type === 'buyGuide' && (
            <div className="space-y-4">
              {(content as typeof SUPPORT_CONTENT.buyGuide).steps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.step} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'} flex gap-4`}>
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">{step.step}</div>
                      {step.step < 6 && <div className="w-0.5 h-full bg-purple-500/30 mt-2" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <StepIcon className="text-purple-400" size={18} />
                        <h3 className="font-bold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Refund Policy */}
          {type === 'refundPolicy' && (
            <div className="space-y-6">
              {(content as typeof SUPPORT_CONTENT.refundPolicy).policies.map((policy, i) => (
                <div key={i}>
                  <h3 className="font-bold text-lg mb-3">{policy.title}</h3>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <ul className="space-y-2">
                      {policy.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-yellow-400">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} flex justify-between items-center`}>
          <p className="text-sm text-gray-400">Cần hỗ trợ thêm? <a href={CONFIG.SOCIAL.zalo} className="text-cyan-400 hover:underline">Chat Zalo</a></p>
          <button onClick={onClose} className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg">Đã hiểu</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 📺 LIVE STREAMING MODAL
// ============================================================================
const LiveStreamingModal: React.FC<{ onClose: () => void; darkMode: boolean }> = ({ onClose, darkMode }) => {
  const totalViewers = LIVE_CHANNELS.reduce((a, c) => a + c.viewers, 0);
  const totalProducts = LIVE_CHANNELS.reduce((a, c) => a + c.products, 0);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className={`relative ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative"><Video className="text-white" size={28} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" /></div>
              <h2 className="text-2xl font-black text-white">📺 LIVE STREAMING 24/7</h2>
            </div>
            <button onClick={onClose} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><X className="text-white" size={20} /></button>
          </div>
          <div className="flex gap-6 text-white/90">
            <div className="flex items-center gap-2"><Users size={18} /><span className="font-bold">{totalViewers.toLocaleString()}</span><span className="text-sm">người xem</span></div>
            <div className="flex items-center gap-2"><Package size={18} /><span className="font-bold">{totalProducts}</span><span className="text-sm">sản phẩm</span></div>
            <div className="flex items-center gap-2"><Radio size={18} className="animate-pulse" /><span className="font-bold">{LIVE_CHANNELS.filter(c => c.isLive).length}</span><span className="text-sm">kênh đang live</span></div>
          </div>
        </div>
        
        {/* Channels Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIVE_CHANNELS.map(channel => (
              <a key={channel.id} href={channel.url} target="_blank" rel="noopener noreferrer" 
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${channel.color} overflow-hidden group hover:scale-[1.02] transition-transform`}>
                {channel.isLive && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                    <Radio size={12} /> LIVE
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <channel.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{channel.platform}</h3>
                    <p className="text-white/70 text-sm mb-2">{channel.desc}</p>
                    <div className="flex gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1"><Users size={14} />{channel.viewers.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Package size={14} />{channel.products} SP</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white/60 text-xs">Click để xem trực tiếp</span>
                  <div className="flex items-center gap-1 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                    Xem ngay <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 🎯 MAIN APP COMPONENT
// ============================================================================
const App: React.FC = () => {
  // Cloudflare States
  const [showCloudflareChallenge, setShowCloudflareChallenge] = useState(CLOUDFLARE_CONFIG.SECURITY.UNDER_ATTACK_MODE);
  const [isOffline, setIsOffline] = useState(false);
  const [showSecurityDashboard, setShowSecurityDashboard] = useState(false);
  
  // App States
  const [showIntro, setShowIntro] = useState(true);
  const [introProgress, setIntroProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const [showOutro, setShowOutro] = useState(false);
  const [outroRating, setOutroRating] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);
  
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isBusiness, setIsBusiness] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("smart");
  
  const [modal, setModal] = useState<string | null>(null);
  const [supportModal, setSupportModal] = useState<string | null>(null);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [lang, setLang] = useState<LangKey>("vi");
  const [currency, setCurrency] = useState<CurrencyKey>("VND");
  const [darkMode, setDarkMode] = useState(true);
  
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  
  const [orderId, setOrderId] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [billImg, setBillImg] = useState<string | null>(null);
  const [payTab, setPayTab] = useState("vn");
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  
  const [chatHistory, setChatHistory] = useState<Array<{role: string; text: string; isHuman?: boolean; quickReplies?: string[]}>>([ 
    { role: "bot", text: CHATBOT_CONFIG.WELCOME, quickReplies: ["🛍️ Xem sản phẩm", "💰 Khuyến mãi", "📦 Hướng dẫn mua", "👨‍💼 Gặp nhân viên"] }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isHumanChat, setIsHumanChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = LANGUAGES[lang].translations;

  // Effects
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  useEffect(() => {
    if (showIntro && !isPaused && !showCloudflareChallenge) {
      const timer = setInterval(() => {
        setIntroProgress(prev => { if (prev >= 100) { clearInterval(timer); setTimeout(() => setShowIntro(false), 500); return 100; } return prev + 2; });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showIntro, isPaused, showCloudflareChallenge]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(null), 3000); return () => clearTimeout(timer); } }, [toast]);
  useEffect(() => { chatRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);
  useEffect(() => { let timer: ReturnType<typeof setInterval>; if (modal === "payment" && timeLeft > 0) { timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000); } return () => clearInterval(timer); }, [modal, timeLeft]);

  // Computed values
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.rating >= CONFIG.MIN_RATING);
    if (activeCat !== "All") result = result.filter(p => p.cat === activeCat);
    if (search) { const s = search.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s)); }
    switch (sortBy) {
      case "smart": result.sort((a, b) => (b.rating * 20 + b.sold / 100 + (b.hot ? 50 : 0)) - (a.rating * 20 + a.sold / 100 + (a.hot ? 50 : 0))); break;
      case "sold": result.sort((a, b) => b.sold - a.sold); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "priceLow": result.sort((a, b) => a.price - b.price); break;
      case "priceHigh": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [activeCat, search, sortBy]);

  const categories = useMemo(() => ["All", ...new Set(PRODUCTS.map(p => p.cat))], []);
  const cartTotal = useMemo(() => Math.max(0, cart.reduce((acc, item) => acc + (isBusiness ? item.comm : item.price) * item.qty, 0) - discount), [cart, isBusiness, discount]);
  const kpiStats = useMemo(() => ({
    totalProducts: filteredProducts.length,
    avgRating: filteredProducts.length ? (filteredProducts.reduce((a, p) => a + p.rating, 0) / filteredProducts.length).toFixed(2) : "0",
    totalSold: (filteredProducts.reduce((a, p) => a + p.sold, 0) / 1000).toFixed(1),
    hotProducts: filteredProducts.filter(p => p.hot).length
  }), [filteredProducts]);

  // Helper functions
  const formatPrice = (amount: number) => {
    const converted = amount * CURRENCIES[currency].rate;
    if (currency === "VND") return amount.toLocaleString() + "đ";
    return CURRENCIES[currency].symbol + converted.toFixed(2);
  };

  const showToast = (msg: string) => setToast(msg);
  const addToCart = (p: Product) => {
    const exists = cart.find(i => i.id === p.id);
    if (exists) setCart(cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    else setCart([...cart, { ...p, qty: 1 }]);
    showToast(`✓ Đã thêm: ${p.name}`);
  };
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) { setWishlist(wishlist.filter(i => i !== id)); showToast("Đã xóa khỏi yêu thích"); }
    else { setWishlist([...wishlist, id]); showToast("❤️ Đã thêm vào yêu thích"); }
  };
  const applyVoucher = () => {
    const v = VOUCHERS[voucher.toUpperCase()];
    if (!v) { showToast("❌ Mã không hợp lệ!"); return; }
    const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
    if (subtotal < v.minOrder) { showToast(`❌ Đơn tối thiểu ${formatPrice(v.minOrder)}`); return; }
    const discountAmount = v.type === "percent" ? subtotal * v.discount / 100 : v.discount;
    setDiscount(discountAmount); setAppliedVoucher(voucher.toUpperCase()); showToast(`✓ Đã áp dụng: ${v.desc}`);
  };
  const startPayment = () => { if (cart.length === 0) { showToast("Giỏ hàng trống!"); return; } setOrderId(`#N${Date.now().toString().slice(-6)}`); setTimeLeft(300); setBillImg(null); setModal("payment"); };
  const completePayment = () => { if (!billImg) { showToast("Vui lòng tải ảnh bill!"); return; } setPurchasedItems([...cart]); setCart([]); setDiscount(0); setAppliedVoucher(null); setModal(null); setShowOutro(true); };

  // Chatbot
  const detectIntent = (message: string): string => {
    const msgLower = message.toLowerCase();
    for (const [intent, keywords] of Object.entries(CHATBOT_CONFIG.INTENTS)) { if (keywords.some(kw => msgLower.includes(kw))) return intent; }
    return "default";
  };
  const handleChat = (msg: string) => {
    if (!msg.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: msg }]); setChatInput(""); setIsTyping(true);
    setTimeout(() => {
      const intent = detectIntent(msg);
      if (intent === "human") { setIsHumanChat(true); setChatHistory(prev => [...prev, { role: "bot", text: "🧑‍💼 Đang kết nối với nhân viên Minh Anh...\n\n✅ Đã kết nối! Xin chào, mình là Minh Anh. Mình có thể giúp gì cho bạn ạ?", isHuman: true }]); }
      else {
        const responses = CHATBOT_CONFIG.RESPONSES[intent as keyof typeof CHATBOT_CONFIG.RESPONSES] || CHATBOT_CONFIG.RESPONSES.default;
        const text = responses[Math.floor(Math.random() * responses.length)];
        setChatHistory(prev => [...prev, { role: "bot", text, quickReplies: ["🛍️ Xem sản phẩm", "💰 Khuyến mãi", "📞 Liên hệ"], isHuman: isHumanChat }]);
      }
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileVerified) { showToast("Vui lòng xác minh Cloudflare!"); return; }
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = authTab === "register" ? (form.elements.namedItem("name") as HTMLInputElement).value : email.split("@")[0];
    setUser({ name, email }); setModal(null); showToast(`✓ Xin chào, ${name}!`);
  };

  // Render states
  if (isOffline) return <OfflinePage onRetry={() => window.location.reload()} />;
  if (showCloudflareChallenge) return <CloudflareChallengePage onPass={() => setShowCloudflareChallenge(false)} />;

  // Intro
  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden">
        <video autoPlay muted={isMuted} loop className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-11748-large.mp4" />
        <audio ref={audioRef} src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" loop autoPlay muted={isMuted} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 text-center px-4">
          <div className="mb-8 animate-pulse"><Zap className="w-20 h-20 mx-auto text-cyan-400 fill-cyan-400" /></div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">NEONSTORE</h1>
          <p className="text-gray-400 text-lg mb-8">{CONFIG.STORE_SLOGAN}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">✨ {PRODUCTS.length}+ Sản phẩm</span>
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">📺 Live 24/7</span>
            <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm">☁️ Cloudflare Protected</span>
          </div>
          <div className="w-64 mx-auto mb-6">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200" style={{ width: `${introProgress}%` }} /></div>
            <p className="text-gray-500 text-sm mt-2">{introProgress}%</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/10 rounded-full hover:bg-white/20">{isMuted ? <VolumeX /> : <Volume2 />}</button>
            <button onClick={() => setIsPaused(!isPaused)} className="p-3 bg-white/10 rounded-full hover:bg-white/20">{isPaused ? <Play /> : <Pause />}</button>
            <button onClick={() => setShowIntro(false)} className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 flex items-center gap-2">Skip <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    );
  }

  // Outro
  if (showOutro) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 z-[100] flex items-center justify-center overflow-hidden">
        <audio autoPlay src="https://assets.mixkit.co/music/preview/mixkit-feeling-happy-5.mp3" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(100)].map((_, i) => (<div key={i} className="absolute animate-fall" style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${3 + Math.random() * 2}s` }}><div className={`w-3 h-3 ${['bg-cyan-400', 'bg-pink-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'][i % 5]}`} style={{ transform: `rotate(${Math.random() * 360}deg)` }} /></div>))}
        </div>
        <div className="relative z-10 text-center px-4 max-w-lg">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">{t.thankYou}</h1>
          <p className="text-cyan-400 mb-2">Mã đơn hàng: {orderId}</p>
          <p className="text-gray-400 mb-6">Hẹn gặp lại bạn lần sau nhé! 💖</p>
          {purchasedItems.length > 0 && (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-400 mb-2">Sản phẩm đã mua:</p>
              {purchasedItems.map(item => (<div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0"><img src={item.img} className="w-12 h-12 rounded-lg object-cover" alt={item.name} /><div className="flex-1"><p className="text-white text-sm font-medium line-clamp-1">{item.name}</p><p className="text-cyan-400 text-sm">{formatPrice(item.price)}</p></div></div>))}
            </div>
          )}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <p className="text-white mb-4">{t.rateUs}</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (<button key={star} onClick={() => { setOutroRating(star); if (star === 5) showToast("🎉 Cảm ơn bạn đã đánh giá 5 sao!"); }} className="p-2 hover:scale-125 transition-transform"><Star size={36} className={`${star <= outroRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'} transition-colors`} /></button>))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Download size={20} /> Tải sản phẩm ngay</button>
            <button onClick={() => { setShowOutro(false); setOutroRating(0); }} className="w-full py-4 bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/20"><ShoppingBag size={20} /> Tiếp tục mua sắm</button>
          </div>
        </div>
        <style>{`@keyframes fall { 0% { transform: translateY(-100%) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } } .animate-fall { animation: fall linear forwards; }`}</style>
      </div>
    );
  }

  // Main App
  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* HEADER */}
      <nav className={`fixed top-0 w-full z-40 ${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`hidden md:block ${darkMode ? 'bg-white/5' : 'bg-gray-100'} py-1`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between text-xs">
            <div className="flex items-center gap-4">
              <button onClick={() => setSupportModal('autoDelivery')} className="flex items-center gap-1 hover:text-cyan-400 transition-colors"><Truck size={12} /> Giao hàng tự động</button>
              <button onClick={() => setSupportModal('warranty')} className="flex items-center gap-1 hover:text-green-400 transition-colors"><Infinity size={12} /> Bảo hành trọn đời</button>
              <button onClick={() => setShowLiveModal(true)} className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"><Radio size={12} className="animate-pulse" /> Live 24/7</button>
              <span className="flex items-center gap-1 text-orange-400"><Shield size={12} /> Cloudflare Protected</span>
            </div>
            <div className="flex items-center gap-3">
              <select value={lang} onChange={(e) => setLang(e.target.value as LangKey)} className="bg-transparent text-xs cursor-pointer focus:outline-none">{Object.entries(LANGUAGES).map(([key, { name, flag }]) => (<option key={key} value={key} className="bg-black">{flag} {name}</option>))}</select>
              <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyKey)} className="bg-transparent text-xs cursor-pointer focus:outline-none">{Object.keys(CURRENCIES).map(c => (<option key={c} value={c} className="bg-black">{c}</option>))}</select>
              <button onClick={() => setDarkMode(!darkMode)} className="p-1">{darkMode ? <Sun size={14} /> : <Moon size={14} />}</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Zap className={`${isBusiness ? 'text-yellow-400' : 'text-cyan-400'} fill-current`} />
            <span className="font-black text-xl tracking-tighter">NEON<span className={isBusiness ? 'text-yellow-400' : 'text-cyan-400'}>STORE</span></span>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className={`relative flex items-center w-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-xl overflow-hidden`}>
              <Search className="ml-4 text-gray-400" size={18} />
              <input type="text" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent p-3 focus:outline-none placeholder:text-gray-500" />
              <button className="p-3 hover:bg-white/10"><Camera size={18} className="text-gray-400" /></button>
            </div>
          </div>
          
          <button onClick={() => setIsBusiness(!isBusiness)} className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isBusiness ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>{isBusiness ? '🏢 Resell' : '🛍️ Shop'}</button>
          
          <div className="flex items-center gap-3">
            {user ? (<div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold">{user.name[0].toUpperCase()}</div><span className="hidden md:block text-sm">{user.name}</span></div>) : (<button onClick={() => setModal("auth")} className="flex items-center gap-2 text-sm hover:text-cyan-400"><User size={18} /><span className="hidden md:block">{t.login}</span></button>)}
            <button onClick={() => setModal("cart")} className="relative p-2 hover:bg-white/10 rounded-full"><ShoppingCart size={22} />{cart.length > 0 && (<span className={`absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce ${isBusiness ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black'}`}>{cart.reduce((a, i) => a + i.qty, 0)}</span>)}</button>
          </div>
        </div>
      </nav>

      {/* LIVE STREAMING BANNER */}
      <section className="pt-36 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setShowLiveModal(true)} className="w-full p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl hover:border-red-500/50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative"><Video className="text-red-400" size={24} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" /></div>
              <div className="text-left">
                <h3 className="font-bold text-white flex items-center gap-2">📺 LIVE 24/7 - {LIVE_CHANNELS.filter(c => c.isLive).length} kênh đang phát</h3>
                <p className="text-sm text-gray-400">{LIVE_CHANNELS.reduce((a, c) => a + c.viewers, 0).toLocaleString()} người đang xem • Flash Sale mỗi giờ</p>
              </div>
            </div>
            <ChevronRight className="text-red-400" size={24} />
          </button>
        </div>
      </section>

      {/* KPI STATS */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ icon: Package, value: kpiStats.totalProducts, label: "Sản phẩm", color: "cyan" }, { icon: Star, value: kpiStats.avgRating, label: "Rating TB", color: "yellow" }, { icon: TrendingUp, value: kpiStats.totalSold + "K", label: "Đã bán", color: "green" }, { icon: Flame, value: kpiStats.hotProducts, label: "HOT", color: "red" }].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}><stat.icon className={`text-${stat.color}-400`} size={20} /></div><div><p className="text-2xl font-black">{stat.value}</p><p className="text-xs text-gray-400">{stat.label}</p></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES & SORT */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">{categories.map(cat => (<button key={cat} onClick={() => setActiveCat(cat)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCat === cat ? (isBusiness ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black') : (darkMode ? 'bg-white/10 text-gray-400 hover:bg-white/20' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')}`}>{cat === 'All' ? '🛍️ ' + t.allProducts : cat === 'Courses' ? '📚 ' + cat : cat === 'Neon Art' ? '🎨 ' + cat : cat === 'Templates' ? '📄 ' + cat : '📖 ' + cat}</button>))}</div>
          <div className="flex items-center justify-between">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-200'} text-sm`}><SlidersHorizontal size={16} /> Lọc</button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-200'} text-sm focus:outline-none cursor-pointer`}><option value="smart">🔥 {t.popular}</option><option value="sold">📦 {t.bestSeller}</option><option value="rating">⭐ Đánh giá cao</option><option value="newest">🆕 {t.newest}</option><option value="priceLow">💰 Giá thấp</option><option value="priceHigh">💎 Giá cao</option></select>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (<div className="text-center py-20 text-gray-500"><Search size={48} className="mx-auto mb-4 opacity-50" /><p>Không tìm thấy sản phẩm...</p></div>) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(p => {
                const discountPercent = Math.round((1 - p.price / p.originalPrice) * 100);
                return (
                  <div key={p.id} className={`group relative rounded-2xl overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10 hover:border-cyan-500/50' : 'border-gray-200 hover:border-cyan-500'} transition-all hover:-translate-y-1`}>
                    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                      {p.hot && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Flame size={10} /> HOT</span>}
                      {p.isNew && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Sparkles size={10} /> NEW</span>}
                      {p.price === 0 && <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">FREE</span>}
                      {discountPercent > 10 && p.price > 0 && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">-{discountPercent}%</span>}
                    </div>
                    <button onClick={() => toggleWishlist(p.id)} className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"><Heart size={16} className={wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-white'} /></button>
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform"><button onClick={() => addToCart(p)} className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${isBusiness ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black'}`}><ShoppingCart size={16} /> {t.addToCart}</button></div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm line-clamp-2 mb-1">{p.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2"><span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{p.rating}</span><span>|</span><span>{p.sold.toLocaleString()} {t.sold}</span></div>
                      <div className="flex items-center gap-2"><span className={`font-bold ${isBusiness ? 'text-yellow-400' : 'text-cyan-400'}`}>{formatPrice(isBusiness ? p.comm : p.price)}</span>{p.price < p.originalPrice && <span className="text-xs text-gray-500 line-through">{formatPrice(p.originalPrice)}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${darkMode ? 'bg-white/5' : 'bg-gray-100'} border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><Zap className="text-cyan-400 fill-cyan-400" /><span className="font-black text-xl">NEONSTORE</span></div>
              <p className="text-sm text-gray-400">{CONFIG.STORE_SLOGAN}</p>
              <div className="flex gap-3 mt-4">
                <a href={CONFIG.SOCIAL.facebook} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Facebook size={18} /></a>
                <a href={CONFIG.SOCIAL.instagram} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Instagram size={18} /></a>
                <a href={CONFIG.SOCIAL.youtube} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Youtube size={18} /></a>
                <a href={CONFIG.SOCIAL.tiktok} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Music2 size={18} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setSupportModal('helpCenter')} className="hover:text-cyan-400 transition-colors">❓ Trung tâm trợ giúp</button></li>
                <li><button onClick={() => setSupportModal('buyGuide')} className="hover:text-cyan-400 transition-colors">📖 Hướng dẫn mua hàng</button></li>
                <li><button onClick={() => setSupportModal('refundPolicy')} className="hover:text-cyan-400 transition-colors">💸 Chính sách hoàn tiền</button></li>
                <li><button onClick={() => setSupportModal('autoDelivery')} className="hover:text-cyan-400 transition-colors">⚡ Giao hàng tự động</button></li>
                <li><button onClick={() => setSupportModal('warranty')} className="hover:text-cyan-400 transition-colors">♾️ Bảo hành trọn đời</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Phone size={14} /> {CONFIG.HOTLINE}</li>
                <li className="flex items-center gap-2"><Mail size={14} /> {CONFIG.EMAIL}</li>
                <li className="flex items-center gap-2"><Headphones size={14} /> Hỗ trợ 24/7</li>
                <li><button onClick={() => setShowLiveModal(true)} className="flex items-center gap-2 text-red-400 hover:text-red-300"><Radio size={14} className="animate-pulse" /> Xem Live 24/7</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Bảo mật</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-xs flex items-center gap-1"><Shield size={10} /> CDN</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1"><Shield size={10} /> SSL</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center gap-1"><Shield size={10} /> DDoS</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-xs flex items-center gap-1"><Bot size={10} /> Bot Fight</span>
              </div>
              <div className="flex items-center gap-2"><Shield className="text-orange-400" size={16} /><span className="text-xs text-gray-400">Cloudflare Protected</span></div>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} text-center`}>
            <p className="text-gray-400 text-sm">© 2026 NEONSTORE. ALL RIGHTS RESERVED | 🌍 🇻🇳 🇺🇸 🇨🇳 🇯🇵 🇰🇷</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* Cart Modal */}
      {modal === "cart" && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className={`relative w-full max-w-md ${darkMode ? 'bg-neutral-900' : 'bg-white'} h-full p-6 flex flex-col border-l ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-black flex items-center gap-2"><ShoppingCart /> {t.cart} ({cart.reduce((a, i) => a + i.qty, 0)})</h2><button onClick={() => setModal(null)}><X /></button></div>
            <div className="flex-1 overflow-y-auto space-y-3">{cart.length === 0 ? <div className="text-center text-gray-500 py-20">Giỏ hàng trống</div> : cart.map((item, idx) => (<div key={idx} className={`flex gap-3 p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}><img src={item.img} className="w-16 h-16 rounded-lg object-cover" alt={item.name} /><div className="flex-1"><h4 className="font-bold text-sm line-clamp-1">{item.name}</h4><p className={`font-bold ${isBusiness ? 'text-yellow-400' : 'text-cyan-400'}`}>{formatPrice(isBusiness ? item.comm : item.price)}</p><div className="flex items-center gap-2 mt-1"><button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="w-6 h-6 rounded bg-white/10 text-sm">-</button><span className="text-sm">{item.qty}</span><button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="w-6 h-6 rounded bg-white/10 text-sm">+</button></div></div><button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-gray-400 hover:text-red-500"><X size={18} /></button></div>))}</div>
            {cart.length > 0 && (<div className="pt-4 border-t border-white/10 space-y-3"><div className="flex gap-2"><input type="text" placeholder={t.voucher} value={voucher} onChange={(e) => setVoucher(e.target.value)} className={`flex-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-100'} text-sm`} /><button onClick={applyVoucher} className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg text-sm">{t.apply}</button></div>{appliedVoucher && <div className="text-green-400 text-sm flex items-center gap-2"><Check size={14} /> {VOUCHERS[appliedVoucher].desc} (-{formatPrice(discount)})</div>}<div className="flex justify-between text-xl font-black"><span>{t.total}:</span><span className={isBusiness ? 'text-yellow-400' : 'text-cyan-400'}>{formatPrice(cartTotal)}</span></div><button onClick={startPayment} className={`w-full py-4 rounded-xl font-black text-black ${isBusiness ? 'bg-yellow-500' : 'bg-cyan-500'}`}>{t.checkout}</button></div>)}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {modal === "payment" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModal(null)} />
          <div className={`relative ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} w-full max-w-lg rounded-2xl overflow-hidden`}>
            <div className={`p-4 ${darkMode ? 'bg-white/5' : 'bg-gray-100'} flex justify-between items-center`}><div><h3 className="font-black">Thanh toán</h3><p className="text-xs text-cyan-400">{orderId}</p></div><div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full"><Clock size={14} className="text-red-400 animate-pulse" /><span className="text-red-400 font-bold font-mono">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span></div></div>
            <div className="flex border-b border-white/10"><button onClick={() => setPayTab("vn")} className={`flex-1 py-3 text-sm font-bold ${payTab === 'vn' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'}`}>🇻🇳 VietQR</button><button onClick={() => setPayTab("int")} className={`flex-1 py-3 text-sm font-bold ${payTab === 'int' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-500'}`}>🌍 Quốc tế</button></div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {payTab === "vn" ? (<div className="space-y-4 text-center"><div className="bg-white p-2 rounded-xl inline-block"><img src={`https://img.vietqr.io/image/${CONFIG.BANK.ID}-${CONFIG.BANK.NO}-${CONFIG.BANK.TPL}.png?amount=${cartTotal}&addInfo=${orderId.replace('#', '')}`} className="w-48 h-48 object-contain" alt="QR" /></div><div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'} text-left`}><div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Số tiền:</span><span className="font-bold text-cyan-400">{formatPrice(cartTotal)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-400">Nội dung:</span><button onClick={() => { navigator.clipboard.writeText(orderId.replace('#', '')); showToast("Đã copy!"); }} className="font-bold text-yellow-400 flex items-center gap-1">{orderId.replace('#', '')} <Copy size={12} /></button></div></div><label className={`block w-full border-2 border-dashed ${darkMode ? 'border-white/20' : 'border-gray-300'} hover:border-cyan-500 rounded-xl p-4 cursor-pointer`}><input type="file" hidden onChange={(e) => { if (e.target.files?.[0]) { setBillImg(URL.createObjectURL(e.target.files[0])); showToast("Đã tải ảnh!"); } }} />{billImg ? <span className="text-green-400 font-bold flex items-center justify-center gap-2"><Check /> Đã tải ảnh</span> : <span className="text-gray-400 flex flex-col items-center gap-2"><Upload /> Tải ảnh chuyển khoản</span>}</label><button onClick={completePayment} className={`w-full py-3 rounded-xl font-bold ${billImg ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-500'}`}>Xác nhận đã chuyển</button></div>) : (<div className="space-y-4 text-center"><Globe size={48} className="mx-auto text-blue-500" /><p className="text-2xl font-bold">{CURRENCIES[currency].symbol}{(cartTotal * CURRENCIES[currency].rate).toFixed(2)}</p><a href="https://paypal.com" target="_blank" rel="noreferrer" className="block w-full py-4 bg-[#0070BA] rounded-xl font-bold text-white">PayPal</a><a href="https://stripe.com" target="_blank" rel="noreferrer" className="block w-full py-4 bg-[#635BFF] rounded-xl font-bold text-white">Stripe</a></div>)}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {modal === "auth" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModal(null)} />
          <div className={`relative ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} w-full max-w-md rounded-2xl overflow-hidden`}>
            <div className="flex border-b border-white/10"><button onClick={() => setAuthTab("login")} className={`flex-1 py-4 font-bold ${authTab === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'}`}>{t.login}</button><button onClick={() => setAuthTab("register")} className={`flex-1 py-4 font-bold ${authTab === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'}`}>{t.register}</button></div>
            <form onSubmit={handleAuth} className="p-6 space-y-4">
              {authTab === "register" && (<div><label className="text-sm text-gray-400 mb-1 block">Họ tên</label><div className={`flex items-center ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-xl overflow-hidden`}><User className="ml-4 text-gray-400" size={18} /><input type="text" name="name" required className="flex-1 bg-transparent p-3 focus:outline-none" placeholder="Nguyễn Văn A" /></div></div>)}
              <div><label className="text-sm text-gray-400 mb-1 block">Email</label><div className={`flex items-center ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-xl overflow-hidden`}><Mail className="ml-4 text-gray-400" size={18} /><input type="email" name="email" required className="flex-1 bg-transparent p-3 focus:outline-none" placeholder="email@example.com" /></div></div>
              <div><label className="text-sm text-gray-400 mb-1 block">Mật khẩu</label><div className={`flex items-center ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-xl overflow-hidden`}><Lock className="ml-4 text-gray-400" size={18} /><input type={showPassword ? "text" : "password"} name="password" required className="flex-1 bg-transparent p-3 focus:outline-none" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="p-3">{showPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}</button></div></div>
              <CloudflareTurnstile verified={turnstileVerified} onVerify={() => setTurnstileVerified(true)} />
              <button type="submit" className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl">{authTab === "login" ? t.login : t.register}</button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {modal === "chat" && (
        <div className={`fixed bottom-20 right-4 z-50 w-[380px] ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} rounded-2xl shadow-2xl overflow-hidden h-[500px] flex flex-col`}>
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="relative"><img src={isHumanChat ? CHATBOT_CONFIG.HUMAN_AVATAR : CHATBOT_CONFIG.AVATAR} className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar" /><span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" /></div><div><h4 className="font-bold text-white flex items-center gap-2">{isHumanChat ? CHATBOT_CONFIG.HUMAN_NAME : CHATBOT_CONFIG.NAME}{isHumanChat && <Award size={14} className="text-yellow-400" />}</h4><p className="text-[11px] text-cyan-100">{isHumanChat ? "✓ Nhân viên hỗ trợ" : "🤖 Trợ lý AI 24/7"}</p></div></div>
            <button onClick={() => setModal(null)}><X size={20} className="text-white" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-black/30 to-black/10">
            {chatHistory.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] ${m.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white/10 rounded-tl-none'} p-3 rounded-2xl`}>{m.isHuman && <span className="text-[10px] text-yellow-400 flex items-center gap-1 mb-1"><Award size={10} /> Nhân viên</span>}<p className="text-sm whitespace-pre-wrap">{m.text}</p>{m.quickReplies && m.role === 'bot' && i === chatHistory.length - 1 && (<div className="flex flex-wrap gap-2 mt-3">{m.quickReplies.map((reply, j) => (<button key={j} onClick={() => handleChat(reply)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium">{reply}</button>))}</div>)}</div></div>))}
            {isTyping && (<div className="flex gap-1 bg-white/10 w-fit p-3 rounded-2xl rounded-tl-none"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /></div>)}
            <div ref={chatRef} />
          </div>
          {!isHumanChat && (<div className="px-4 py-2 border-t border-white/10 flex gap-2 overflow-x-auto"><button onClick={() => handleChat("Tôi muốn nói chuyện với nhân viên thật")} className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold whitespace-nowrap"><Headphones size={12} /> Chat người thật</button><button onClick={() => handleChat("Cho tôi xem khuyến mãi")} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full text-xs whitespace-nowrap"><Gift size={12} /> Khuyến mãi</button><button onClick={() => handleChat("Hướng dẫn thanh toán")} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full text-xs whitespace-nowrap"><CreditCard size={12} /> Thanh toán</button></div>)}
          <div className={`p-3 ${darkMode ? 'bg-neutral-800' : 'bg-gray-100'} border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} flex gap-2`}><input type="text" placeholder="Nhập tin nhắn..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleChat(chatInput); }} className={`flex-1 ${darkMode ? 'bg-black/50' : 'bg-white'} rounded-full px-4 py-2.5 text-sm focus:outline-none`} /><button onClick={() => handleChat(chatInput)} className="p-2.5 bg-cyan-500 text-black rounded-full hover:bg-cyan-400"><Send size={18} /></button></div>
        </div>
      )}

      {/* Support Modals */}
      {supportModal && <SupportModal type={supportModal} onClose={() => setSupportModal(null)} darkMode={darkMode} />}
      
      {/* Live Streaming Modal */}
      {showLiveModal && <LiveStreamingModal onClose={() => setShowLiveModal(false)} darkMode={darkMode} />}

      {/* Cloudflare Security Dashboard */}
      <CloudflareSecurityDashboard isOpen={showSecurityDashboard} onClose={() => setShowSecurityDashboard(false)} darkMode={darkMode} />

      {/* Floating Buttons */}
      <button onClick={() => setModal(modal === "chat" ? null : "chat")} className="fixed bottom-6 right-4 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">{modal === "chat" ? <X size={24} /> : <MessageCircle size={24} />}</button>
      <button onClick={() => setShowSecurityDashboard(!showSecurityDashboard)} className="fixed bottom-6 left-4 z-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"><Shield size={20} /></button>
      {showScrollTop && (<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-20 left-4 z-40 bg-white/10 backdrop-blur p-3 rounded-full hover:bg-white/20"><ArrowUp size={20} /></button>)}

      {/* Cookies Consent */}
      {!cookiesAccepted && (<div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${darkMode ? 'bg-neutral-900' : 'bg-white'} border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}><div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><p className="text-sm text-gray-400">🍪 Chúng tôi sử dụng cookies để cải thiện trải nghiệm. Website được bảo vệ bởi Cloudflare.</p><div className="flex gap-2"><button onClick={() => setCookiesAccepted(true)} className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg text-sm">Đồng ý</button><button onClick={() => setCookiesAccepted(true)} className="px-4 py-2 bg-white/10 rounded-lg text-sm">Từ chối</button></div></div></div>)}

      {/* Toast */}
      {toast && (<div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full font-bold shadow-lg z-[80] flex items-center gap-2 text-sm animate-bounce">{toast}</div>)}
    </div>
  );
};

export default App;
