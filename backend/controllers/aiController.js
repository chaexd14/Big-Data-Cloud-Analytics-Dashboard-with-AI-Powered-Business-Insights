import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import supabase from '../config/supabaseClient.js';
import { buildPrompt } from '../utils/geminiPrompt.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateInsights = async (req, res) => {
    try {
        const { data } = await supabase
            .from('food_delivery')
            .select('*');

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite'
        });

        const prompt = buildPrompt(data);

        const result = await model.generateContent(prompt);

        const response = result.response;

        const text = response.text();

        res.json({ insight: text });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};