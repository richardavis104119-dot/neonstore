
import { GoogleGenAI } from "@google/genai";
import { DB_PRODUCTS, CONFIG, VOUCHERS } from "../constants";

export class GeminiAssistant {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, base64Image?: string, history: any[] = []): Promise<string> {
    try {
      // Chuẩn bị dữ liệu ngữ cảnh cho AI
      const productContext = DB_PRODUCTS.map(p => 
        `- ${p.name}: Giá ${p.price.toLocaleString()}đ (Gốc: ${p.originalPrice.toLocaleString()}đ), Danh mục: ${p.cat}, Mô tả: ${p.desc}`
      ).join('\n');

      const systemInstruction = `Bạn là NEON - Trợ lý AI đa năng của NEONSTORE. 
        
        NHÂN CÁCH: Thông minh, công nghệ, nhiệt huyết. Gọi khách là "bạn".
        
        SẢN PHẨM & ƯU ĐÃI:
        ${productContext}
        
        QUY TẮC:
        1. Nếu khách gửi ẢNH, hãy phân tích ảnh và liên hệ với sản phẩm của shop (VD: tư vấn màu neon hợp với không gian trong ảnh).
        2. Nếu khách hỏi về giá, luôn check xem có mã giảm giá nào phù hợp không.
        3. Phản hồi bằng ngôn ngữ của khách.`;

      const contents = [
        ...history.map(h => ({
          role: h.role === 'bot' ? 'model' : 'user',
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [
            ...(base64Image ? [{
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(',')[1] // Loại bỏ prefix data:image/jpeg;base64,
              }
            }] : []),
            { text: message }
          ]
        }
      ];

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-12-2025',
        contents,
        config: {
          systemInstruction,
          temperature: 1,
          topP: 0.95,
        }
      });

      return response.text || "NEON đang xử lý dữ liệu, bạn đợi xíu nhé! 😊";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Hệ thống AI đang bảo trì tính năng hình ảnh, bạn vui lòng chat văn bản trước nhé! ⚡";
    }
  }
}

export const assistant = new GeminiAssistant();
