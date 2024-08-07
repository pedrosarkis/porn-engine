import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../entities/User';
import UserRequest from '../types/UserRequest';


const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.authorization
    console.log(token, 'token');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        
        req.email = decodedToken.email;
       console.log(req.email);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;