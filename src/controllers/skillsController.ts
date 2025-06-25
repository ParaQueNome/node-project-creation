import { Request, Response } from 'express';
import { listSkills, createNewSkill, deleteSkillById, updateSkillById } from '../repositories/skillsRepository';
import { checkApiKey } from '../utils/checkApiKey';
import checkBodyRequest from '../utils/checkBodyRequest';
import checkId from '../utils/checkId';


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
            return res.status(400).json({error: 'Bad request: rate must be a number between 1-10'});
        }
        const response = await createNewSkill(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}

const deleteSkill = async (req: Request, res: Response) => {
    const skillId = Number(req.query.id);
    try {
        if (!checkApiKey(req, res)) return;
        if (!checkId(skillId, req, res)) return;
        const response = await deleteSkillById(skillId);
        if (response === null) { 
            return res.status(404).json({error: "The skill you're trying to delete doesn't exists"});
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}

const updateSkill = async (req: Request, res: Response) => { 
    const skillId = Number(req.query.id);
    const data = req.body;
    try { 
        if(!checkApiKey(req, res)) return;
        if (!checkId(skillId, req, res)) return;
        if (!checkBodyRequest(data, req, res)) return;
        const response = await updateSkillById({id: skillId}, data)
        if (response === null) { 
            return res.status(404).json({error: "The skill you're trying to update doesn't exists"});
        }
        return res.status(200).json(response);
    } catch (error) { 
        return res.status(500).json({error: `Internal server error, try it later: ${error}`});
    }
}


export { listAllSkills, createSkill, deleteSkill, updateSkill};