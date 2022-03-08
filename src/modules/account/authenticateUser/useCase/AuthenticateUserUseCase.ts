import { prisma } from "../../../../database/prismaClient"
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken";


interface IAuthenticateUser {
    name: string;
    password: string;
}





class AuthenticateUserUseCase {
    async execute({ name, password }: IAuthenticateUser) {
        const user = await prisma.user.findFirst({
            where: {
                name
            }
        });
        if (!user) {
            throw new Error("name or password inválido!")
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("name or password inválido!")
        }
        const token = sign({ name }, "02755418fe9033c4959a8dfd9f2bf0a9", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserUseCase }