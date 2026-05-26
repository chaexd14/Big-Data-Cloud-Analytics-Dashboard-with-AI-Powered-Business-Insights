import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/analytics', analyticsRoutes);
app.use('/_/backend/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/_/backend/api/ai', aiRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    const frontendDistPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendDistPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendDistPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});