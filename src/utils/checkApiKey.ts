import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({path: '.env.local'});

export const checkApiKey = (req: Request, res: Response): boolean => {
    const apiKeyFromQuery = req.query.api_key;
    if (!apiKeyFromQuery || apiKeyFromQuery !== process.env.API_KEY_NODE) {
        res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
        return false;
    }
    return true; 
};