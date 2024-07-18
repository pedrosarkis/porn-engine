import FavoriteVideoDTO from "../DTO/FavoriteVideoDTO";
import User from "../entities/User";
import bcrypt from "bcrypt";

class UserRepository {
    constructor(private userModel: any) {
        this.userModel = userModel;
    }

  public async create(user: User): Promise<User> {
    user.setPassword(await bcrypt.hash(user.getPassword(), 10));
    return await this.userModel.create(user);
  }

  public async login(email: string, password: string): Promise<any | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
  }

  public async addFavoriteVideo(userId: String, video: FavoriteVideoDTO): Promise<User> {
    const user = await this.userModel.findById(userId);
    user.favoriteVideos.push(video);
    await user.save();
    return user
}

  public async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
}

}

export default UserRepository;