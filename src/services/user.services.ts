import { AppDataSource } from "../database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

export class UserService {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        if (await this.getUserByEmail(userData.email!)) {
            throw new Error(`Email "${userData.email}" is already registered`);
        }

        const user = this.userRepository.create(userData);
        if ((userData as { password?: string }).password) {
            user.passwordHash = await bcrypt.hash((userData as { password?: string }).password!, 10);
        }

        return this.userRepository.save(user);
    }

    async updateUser(id: number, params: Partial<User>): Promise<User> {
        const user = await this.getUserById(id);
        if (!user) throw new Error("User not found");

        if ((params as { password?: string }).password) {
            params.passwordHash = await bcrypt.hash((params as { password?: string }).password!, 10);
        }

        Object.assign(user, params);
        return this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error("User not found");
        await this.userRepository.remove(user);
    }
}