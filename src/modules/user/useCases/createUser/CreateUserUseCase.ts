import { prisma } from "../../../../database/prismaClient"
import { hash } from 'bcryptjs'

interface ICreateUser {
    name: string
    password: string
    username: string
}



class CreateUserUseCase {
    async execute({ name, password, username }: ICreateUser) {
        const usernameAlreadExists = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });
        if (usernameAlreadExists) {
            throw new Error("username já existe!")
        }
        const hashPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashPassword
            }
        });
        return user;
    }
}
export { CreateUserUseCase }