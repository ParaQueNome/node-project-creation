import express, {Request, Response} from 'express';

const router = express.Router();

import {listAllProjects, createProject} from '../controllers/projectController';

router.get('/listProjects', (req: Request, res: Response) => {
    listAllProjects(req, res);
});

router.post('/createProject', (req: Request, res: Response) => {
    createProject(req, res);
});


export default router;
