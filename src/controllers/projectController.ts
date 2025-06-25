import { Request, Response } from 'express';
import {listProjects, createNewProject, deleteProjectById, updateProjectById} from '../repositories/projectRepository';
import { checkApiKey } from '../utils/checkApiKey';
import checkBodyRequest from '../utils/checkBodyRequest';
import checkId from '../utils/checkId';



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
        if (!checkBodyRequest(data, req, res)) return;
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
        if (!checkId(projectId, req, res)) return;
        const response = await deleteProjectById(projectId);
        if (response === null) { 
            return res.status(404).json({error: "The project you're trying to delete doesn't exists"});
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}

const updateProject = async (req: Request, res: Response) => { 
    const projectId = Number(req.query.id);
    const data = req.body;
    try { 
        if(!checkApiKey(req, res)) return;
        if (!checkId(projectId, req, res)) return;
        if (!checkBodyRequest(data, req, res)) return;
        const response = await updateProjectById({id: projectId}, data)
        if (response === null) { 
            return res.status(404).json({error: "The project you're trying to update doesn't exists"});
        }
        return res.status(200).json(response);
    } catch (error) { 
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}


export {listAllProjects, createProject, deleteProject, updateProject};