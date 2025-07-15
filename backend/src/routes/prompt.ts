import express from 'express';
import generatePromptVariants from '../services/gemini';

interface PromptRequest {
  idea: string;
  uiType: string;
  length: number;
  pages: { name: string; subheading: string }[];
  theme: string;
}
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userInput = req.body as PromptRequest;
    const prompts = await generatePromptVariants(userInput)
    res.json({ prompts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate prompt variants.' });
  }
});

export default router;