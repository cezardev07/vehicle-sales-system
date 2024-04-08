import bcrypt from "bcrypt";

export default class Bcrypt{
  public async compare(comparePassword: string, hash: string): Promise<boolean>{
    const decrypted: boolean = await bcrypt.compare(comparePassword, hash)
    return decrypted
  }
  public async encrypt(password: string): Promise<string>{
    const saltRounds: number = 10;  
    const hashPassword: string = await bcrypt.hash(password, saltRounds)
    return hashPassword
  }
}