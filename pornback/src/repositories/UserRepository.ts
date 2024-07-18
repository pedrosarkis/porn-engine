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

  public async addFavoriteVideo(email: String, video: FavoriteVideoDTO): Promise<User> {
    console.log(video, 'video');
    const user = await this.userModel.findOne({email});
    user.favoriteVideos.push(video);
    await user.save();
    return user
}

  public async getFavoriteVideos(email: String): Promise<FavoriteVideoDTO> {
    console.log(email, 'email');
      const user = await this.userModel.findOne({email});
      console.log(user.favoriteVideos, 'favoriteVideos');
      return user.favoriteVideos;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
}

}

export default UserRepository;