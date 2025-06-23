import { Express, Request, Response } from "express"

const checkBodyRequest = (data: any, req: Request, res: Response): boolean => {
    if (!data || data === undefined){
            res.status(400).json({error: 'Bad Request: Request Body required'});
            return false;
        }
    return true;
}

export default checkBodyRequest;