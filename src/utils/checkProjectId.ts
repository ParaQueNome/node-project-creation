import { Express, Request, Response } from "express"


const checkProjectId = (projectId : number, req: Request, res: Response): boolean  => {
    
    if (!projectId || projectId === undefined) {
        res.status(400).json({error: "Bad Request: projectId expected"});
        return false;
        }
    return true;
}

export default checkProjectId;