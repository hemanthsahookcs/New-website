
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getElectionAnalysis(candidates: any[]) {
  try {
    const prompt = `
      Analyze the current voting scenario with the following candidates:
      ${JSON.stringify(candidates)}
      
      Provide a brief 3-sentence summary of the election progress, identifying the leading party and a message encouraging fair participation. 
      Return the response as a plain string.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analyzing current trends...";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "The system is monitoring vote integrity. Please proceed to vote responsibly.";
  }
}
