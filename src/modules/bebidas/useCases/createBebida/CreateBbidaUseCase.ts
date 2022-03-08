import { prisma } from "../../../../database/prismaClient"



interface ICreateBebida {
    name: string;
    volume: number;
    valor: number;
    user_id: string;
    latitude: string;
    longitude: string;
    loja_name: string;
}



class CreateBebidaUseCase {
    async execute({ name, volume, valor, user_id, latitude, longitude, loja_name }: ICreateBebida) {
        const lojas = await prisma.loja.findFirst({
            where: {

                name: {
                    equals: loja_name,
                    mode: "insensitive"
                },
                latitude,
                longitude
            }
        });
        const bebidaAlreadExists = await prisma.bebida.findFirst({
            where: {

                name: {
                    equals: name,
                    mode: "insensitive"
                },
                volume,
                AND: {
                    loja: {
                        id: lojas?.id
                    }
                }
            }
        });
        if (lojas && !bebidaAlreadExists) {
            const bebida = prisma.bebida.create({
                data: {
                    name,
                    valor,
                    volume,
                    user: {
                        connect: {
                            id: user_id
                        }
                    },
                    loja: {
                        connect: {
                            id: lojas.id
                        }
                    }
                }

            });
            return bebida;
        }
        if (bebidaAlreadExists) {
            throw new Error("produto já existe!")
        }
        if (!lojas && !bebidaAlreadExists) {
            const loja = await prisma.loja.create({
                data: {
                    name: loja_name,
                    latitude,
                    longitude,
                    user: {
                        connect: {
                            id: user_id
                        }
                    },
                    Bebida: {
                        create: {
                            name,
                            valor,
                            volume,
                            user_id,
                        }
                    }
                }
            })

            return loja;
        }

    }
}

export { CreateBebidaUseCase }