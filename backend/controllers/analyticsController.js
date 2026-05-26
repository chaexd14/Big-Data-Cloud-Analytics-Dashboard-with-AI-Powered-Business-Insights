import supabase from '../config/supabaseClient.js';

export const getAnalytics = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('food_delivery')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};