import { GoogleGenAI } from "@google/genai";
import { WardrobeItem } from "../types";

// Initialize Gemini Client
// The API key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFashionCommentary = async (
  suit: WardrobeItem,
  shirt: WardrobeItem,
  tie: WardrobeItem,
  shoes: WardrobeItem
): Promise<string> => {
  try {
    const prompt = `
      You are a witty, slightly eccentric fashion critic observing the outfit of Albert Einstein.
      He is wearing:
      - Suit: ${suit.name}
      - Shirt: ${shirt.name}
      - Tie: ${tie.name}
      - Shoes: ${shoes.name}
      
      In one short, humorous, and intelligent sentence (max 30 words), describe this look or how it might affect his physics research today.
      Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "A combination that defies the laws of fashion physics.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The probability of this outfit looking good is theoretically non-zero.";
  }
};