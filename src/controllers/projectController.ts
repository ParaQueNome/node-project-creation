import { Request, Response } from 'express';
import {listProjects, createNewProject} from '../repositories/projectRepository';
import { checkApiKey } from '../utils/checkApiKey';


const listAllProjects = async (req : Request, res : Response)=>{
    const apiKeyFromQuery = req.query.api_key;
    try { 
        if (!checkApiKey(req, res)) return;
        const response = await listProjects();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }

}

const createProject = async (req : Request, res: Response) =>{
    const data = req.body;
    const apiKeyFromQuery = req.query.api_key;
    try { 
        if (!checkApiKey(req, res)) return;
        if (!data || data === undefined){
            return res.status(400).json({error: 'Bad Request: Request Body required'});
        }
        const response = await createNewProject(data);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}

export {listAllProjects, createProject};