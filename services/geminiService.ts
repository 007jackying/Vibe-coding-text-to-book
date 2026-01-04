import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const polishText = async (text: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return text;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert editor. Please format the following text for a better reading experience. 
      - Fix spacing, paragraph breaks, and basic punctuation errors. 
      - Do NOT change the meaning or style of the text excessively. 
      - Ensure there are proper paragraph separations (double newlines).
      - If the text is very short, you can creatively expand it slightly to make it a better demo, but keep the core message.
      
      Input Text:
      ${text}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || text;
  } catch (error) {
    console.error("Gemini Polish Error:", error);
    return text;
  }
};

export const generateStory = async (topic: string): Promise<{ title: string; content: string }> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a short story or article about: ${topic}. 
    Return the output as a JSON object with keys: "title" and "content".
    The content should be formatted with markdown-like paragraph breaks (double newlines). Length: approx 500-1000 words.`,
    config: {
      responseMimeType: "application/json",
    }
  });

  const jsonStr = response.text?.trim();
  if (!jsonStr) throw new Error("No response from AI");
  
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Fallback if not valid JSON
    return { title: topic, content: response.text || "" };
  }
};
