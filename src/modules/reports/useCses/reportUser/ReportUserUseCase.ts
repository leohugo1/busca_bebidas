import { prisma } from "../../../../database/prismaClient"






class ReportUserUseCase {
    async execute(id_user: string, user_id: string) {
        if (user_id == id_user) {
            throw new Error("erro ao reportar usuário");
        }
        const user = await prisma.user.findFirst({
            where: {
                id: id_user
            }
        });
        let reports = user?.report.find((report) => {
            return report == user_id
        });
        if (reports) {
            throw new Error("usuário já foi reportado ");
        }
        let penal = 0
        penal = user?.penalidade as number
        console.log(penal)
        if (penal >= 2) {
            await prisma.bebida.deleteMany({
                where: {
                    user_id: id_user
                }
            });
            await prisma.loja.deleteMany({
                where: {
                    user_id: id_user
                }
            })
            let result = await prisma.user.delete({
                where: {
                    id: id_user

                }
            });
            return result;
        } else if (penal == null) {
            penal = 1
            let result = await prisma.user.update({
                where: {
                    id: id_user
                },
                data: {
                    penalidade: penal,
                    report: {
                        push: user_id
                    }
                }
            });
            return result;
        }
        penal = penal + 1
        let result = await prisma.user.update({
            where: {
                id: id_user
            },
            data: {
                penalidade: penal,
                report: {
                    push: user_id
                }
            }
        });


        console.log(penal)
        return result;
    }
}

export { ReportUserUseCase }