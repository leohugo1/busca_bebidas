import { prisma } from "../../../../database/prismaClient"
import { FindDistance } from "../../../../utils/FindDistance";

interface IFindBebidas {
    name: string;
    latitude: number;
    longitude: number;
    metros: string;
}


class FindAllBebidasUseCase {
    async execute({ name, latitude, longitude, metros }: IFindBebidas) {
        //buscar por nome
        const bebidas = await prisma.bebida.findMany({
            where: {
                name
            }, include: {
                loja: true
            }
        });
        if (bebidas.length == 0) {
            throw new Error("produto não cadastrado");
        }
        const bebidaresult = FindDistance(bebidas, latitude, longitude, metros);
        return bebidaresult;
    }
}

export { FindAllBebidasUseCase }