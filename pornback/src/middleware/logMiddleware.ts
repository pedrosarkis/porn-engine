import { Request, Response, NextFunction } from 'express';

const LogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
};

export default LogMiddleware;