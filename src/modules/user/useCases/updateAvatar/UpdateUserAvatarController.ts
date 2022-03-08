import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";




class UpdateUserAvatarController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;
        const avatarFile = request.file?.filename as string;
        const updateUserAvatarUseCase = new UpdateUserAvatarUseCase();
        await updateUserAvatarUseCase.execute({ user_id, avatarFile });
        return response.status(200).send();
    }
}

export { UpdateUserAvatarController }