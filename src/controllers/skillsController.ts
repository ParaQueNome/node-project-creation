import { Request, Response } from 'express';
import { listSkills, createNewSkill } from '../repositories/skillsRepository';
import { checkApiKey } from '../utils/checkApiKey';
import checkBodyRequest from '../utils/checkBodyRequest';


const listAllSkills = async (req: Request, res: Response) => { 
    try { 
        if(!checkApiKey(req, res)) return;
        const response = await listSkills();
        return res.status(200).json(response);
    } catch (error) { 
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }

};
const createSkill = async (req : Request, res: Response) =>{
    const data = req.body;
    try { 
        if (!checkApiKey(req, res)) return;
        if (!checkBodyRequest(data, req, res)) return;
        if (data.rate > 10 || data.rate < 1) {
            return res.status(400).json({error: 'Bad request: rate must be a number beetween 1-10'});
        }
        const response = await createNewSkill(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}


export { listAllSkills, createSkill};