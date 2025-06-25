import express, {Request, Response} from 'express';

const router = express.Router();

import {listAllProjects, createProject, deleteProject, updateProject} from '../controllers/projectController';
import { listAllSkills, createSkill, deleteSkill, updateSkill} from '../controllers/skillsController';

router.get('/listProjects', (req: Request, res: Response) => {
    listAllProjects(req, res);
});

router.post('/createProject', (req: Request, res: Response) => {
    createProject(req, res);
});

router.delete('/deleteProject', (req: Request, res: Response) => {
    deleteProject(req, res)
});

router.put('/updateProject', (req: Request, res: Response)=>{
    updateProject(req, res);
});

router.get('/listSkills', (req: Request, res: Response) => { 
    listAllSkills(req, res);
});

router.post('/createSkill', (req: Request, res: Response) => {
    createSkill(req, res);
});

router.delete('/deleteSkill', (req: Request, res: Response) => { 
    deleteSkill(req, res);
});

router.put('/updateSkill', (req: Request, res: Response) => {
    updateSkill(req, res);
});
export default router;

