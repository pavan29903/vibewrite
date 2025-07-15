import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

interface PromptRequest {
  idea: string;
  uiType: string;
  length: number;
  pages: { name: string; subheading: string }[];
  theme: string;
}

dotenv.config();
const MODEL_NAME = 'gemini-2.5-flash';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function generatePromptWithGemini(input: PromptRequest): Promise<any> {
  
  
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt =` You are a prompt engineer for AI app builder tools like Bolt or Lovable. based on given details generate a detailed prompt for the AI app builder tool to generate a full app with all the pages and features.

Here are the details for you to generate the prompt:
Details:
- the primary App idea: ${input.idea} that i'm trying to build
- with UI preference: ${input.uiType} 
- and Pages structure would be ${input.pages.map(page => `Page: ${page.name}, Subheading: ${page.subheading}`).join(', ')}
- and i preffer Theme: ${input.theme}
- and you should generate the detailed prompt of Length: ${input.length}
`;


  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text.split(/\n\n|Prompt \d+:/i)
    .map(p => p.trim())
    .filter(p => p.length > 30);

}
  