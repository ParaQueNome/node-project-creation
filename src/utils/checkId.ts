import { Express, Request, Response } from "express"


const checkId = (id : number, req: Request, res: Response): boolean  => {
    
    if (!id || id === undefined) {
        res.status(400).json({error: "Bad Request: projectId expected"});
        return false;
        }
    return true;
}

export default checkId;