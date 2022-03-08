import { prisma } from "../../../../database/prismaClient";
import { DeleteFile } from "../../../../utils/file";



interface IAvatar {
    user_id: string;
    avatarFile: string;
}

class UpdateUserAvatarUseCase {
    async execute({ user_id, avatarFile }: IAvatar) {
        const user_avatar = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        })
        if (user_avatar?.avatar) {
            await DeleteFile(`./tmp/avatar/${user_avatar?.avatar}`);

        }
        const user = await prisma.user.update({
            where: {
                id: user_id
            }, data: {
                avatar: avatarFile
            }
        });
        return user;
    }
}
export { UpdateUserAvatarUseCase }