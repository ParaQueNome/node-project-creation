import { Request, Response } from 'express';
import {listProjects, createNewProject, deleteProjectById} from '../repositories/projectRepository';
import { checkApiKey } from '../utils/checkApiKey';


const listAllProjects = async (req : Request, res : Response)=>{
    try { 
        if (!checkApiKey(req, res)) return;
        const response = await listProjects();
        return res.status(200).json(response);

    } catch (error) {
       return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }

}

const createProject = async (req : Request, res: Response) =>{
    const data = req.body;
    try { 
        if (!checkApiKey(req, res)) return;
        if (!data || data === undefined){
            return res.status(400).json({error: 'Bad Request: Request Body required'});
        }
        const response = await createNewProject(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}

const deleteProject = async (req: Request, res: Response) => {
    const projectId = Number(req.query.id);

    try {
        if (!checkApiKey(req, res)) return;
        if (!projectId || projectId === undefined) {
            return res.status(400).json({error: "Bad Request: projectId expected"});
        }
        const response = await deleteProjectById(projectId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}



export {listAllProjects, createProject, deleteProject};