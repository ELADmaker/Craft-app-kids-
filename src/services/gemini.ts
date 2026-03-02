import { GoogleGenAI, Type, ThinkingLevel, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getAI = () => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
};

export interface CampaignContent {
  subjectLine: string;
  previewText: string;
  bodyContent: string;
  imagePrompt: string;
}

export async function generateCampaign(prompt: string): Promise<CampaignContent> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a complete email marketing campaign based on this prompt: "${prompt}". 
    Provide a compelling subject line, a short preview text, the main body content in Markdown format, and a detailed prompt for an AI image generator that would complement this email.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subjectLine: { type: Type.STRING },
          previewText: { type: Type.STRING },
          bodyContent: { type: Type.STRING, description: "Markdown formatted email body" },
          imagePrompt: { type: Type.STRING, description: "Detailed prompt for generating a visual for this email" },
        },
        required: ["subjectLine", "previewText", "bodyContent", "imagePrompt"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateCampaignImage(prompt: string, size: "1K" | "2K" | "4K") {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}
