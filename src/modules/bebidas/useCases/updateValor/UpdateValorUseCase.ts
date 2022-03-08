import { prisma } from "../../../../database/prismaClient"


interface IUpdateValor {
    bebida_id: string;
    valor: number;
    user_id: string;
}



class UpdateValorUseCase {
    async execute({ bebida_id, valor, user_id }: IUpdateValor) {
        const bebida = await prisma.bebida.findFirst({
            where: {
                id: bebida_id
            }
        })
        if (!bebida) {
            throw new Error("produto não encontrado")
        }
        const bebidas = await prisma.bebida.update({
            where: {
                id: bebida_id,

            }, data: {
                valor: valor,
                user_id: user_id,
            }
        });
        return bebidas;
    }
}

export { UpdateValorUseCase }