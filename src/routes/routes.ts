import express, {Request, Response} from 'express';

const router = express.Router();

import listAllProjects from '../controllers/projectController';

router.get('/listprojects', (req: Request, res: Response) => {
    listAllProjects(req, res);
});



export default router;
