"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generatePromptWithGemini;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MODEL_NAME = 'gemini-2.5-flash';
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
function generatePromptWithGemini(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const prompt = ` You are a prompt engineer for AI app builder tools like Bolt or Lovable. based on given details generate a detailed prompt for the AI app builder tool to generate a full app with all the pages and features.

Here are the details for you to generate the prompt:
Details:
- the primary App idea: ${input.idea} that i'm trying to build
- with UI preference: ${input.uiType} 
- and Pages structure would be ${input.pages.map(page => `Page: ${page.name}, Subheading: ${page.subheading}`).join(', ')}
- and i preffer Theme: ${input.theme}
- and you should generate the detailed prompt of Length: ${input.length}
`;
        const result = yield model.generateContent(prompt);
        const text = result.response.text();
        return text.split(/\n\n|Prompt \d+:/i)
            .map(p => p.trim())
            .filter(p => p.length > 30);
    });
}
