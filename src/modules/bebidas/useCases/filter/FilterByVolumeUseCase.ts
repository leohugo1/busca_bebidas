import { prisma } from "../../../../database/prismaClient"
import { FindDistance } from "../../../../utils/FindDistance";



interface IFindBebidas {
    volume: number;
    latitude: number;
    longitude: number;
    metros: string;
}


class FilterByVolumeUseCase {
    async execute({ volume, latitude, longitude, metros }: IFindBebidas) {
        const volumes = await prisma.bebida.findMany({
            where: {
                volume
            }, include: {
                loja: true
            }
        });
        if (volumes.length == 0) {
            throw new Error("nenhum produto com esse volume");
        }

        const volumeresult = FindDistance(volumes, latitude, longitude, metros);
        return volumeresult;
    }
}
export { FilterByVolumeUseCase }