
class LoginResponseDTO {
    email: string;
    name: string;
    createdAt: Date;
    constructor({email, name, createdAt}: {email: string, name: string, createdAt: Date}) {
        this.email = email;
        this.name = name;
        this.createdAt = createdAt;
       
    }
}

export default LoginResponseDTO;