import express, {Request, Response} from 'express';

const router = express.Router();

import {listAllProjects, createProject, deleteProject, updateProject} from '../controllers/projectController';

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
export default router;
