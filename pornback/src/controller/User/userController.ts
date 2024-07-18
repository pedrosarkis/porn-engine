import UserRepository from "../../repositories/UserRepository";
import { Request, Response} from "express"
import User from "../../entities/User";
import FavoriteVideoDTO from "../../DTO/FavoriteVideoDTO";
import jwt from "jsonwebtoken";
import UserRequest from "../../types/UserRequest";

class UserController {
    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const newUser = new User(name, email, password);
            const userCreated = await this.userRepository.create(newUser);
            return res.status(201).json(userCreated);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userRepository.findById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.login(email, password);
            if(!user){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            const token = jwt.sign({ id: user?.email }, process.env.SECRET_KEY as string, { expiresIn: '8h' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({message: 'User logged in successfully'});
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addFavoriteVideo(req: UserRequest, res: Response) {
        try {
            const { title, url, thumbnail } = req.body;
            const favoriteVideo: FavoriteVideoDTO = { title, url, thumbnail };
            const user = await this.userRepository.addFavoriteVideo(req.email as String, favoriteVideo);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default UserController