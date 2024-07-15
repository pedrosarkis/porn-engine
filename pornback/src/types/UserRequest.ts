import { Request } from 'express';
interface UserRequest extends Request {
    email?: string;
}

export default UserRequest;