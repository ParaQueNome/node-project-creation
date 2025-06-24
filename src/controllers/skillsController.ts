import { Request, Response } from 'express';
import { listSkills } from '../repositories/skillsRepository';
import { checkApiKey } from '../utils/checkApiKey';


const listAllSkills = async (req: Request, res: Response) => { 
    try { 
        if(!checkApiKey(req, res)) return;
        const response = await listSkills();
        return res.status(200).json(response);
    } catch (error) { 
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }

};


export { listAllSkills};