import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({path: '.env.local'});
import listProjects from '../repositories/projectRepository';


const listAllProjects = async (req : Request, res : Response)=>{
    const apiKeyFromQuery = req.query.api_key;
    try { 
        if (!apiKeyFromQuery || apiKeyFromQuery !== process.env.API_KEY_NODE) {
            return res.status(403).json({error: 'Forbidden: API_KEY is missing or invalid'});
        }
        const response = await listProjects();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }

}


export default listAllProjects;