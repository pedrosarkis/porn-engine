import { get } from "http";
import Video from "./Video";

class User {
    constructor(
        private name: string,
        private email: string,
        private password: string,
        private favoriteVideos: Video[] = []
        ) {
            
        }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }

    getFavoriteVideos() {
        return this.favoriteVideos
    }

    setPassword(password: string) {
        this.password = password
    }

}

export default User