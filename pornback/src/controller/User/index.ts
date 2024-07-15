import UserController from "./userController";
import UserRepository from "../../repositories/UserRepository";
import Usermodel from "../../model/User"

const userRepository = new UserRepository(Usermodel);
const userController = new UserController(userRepository);

export default userController;