import { Request, request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";






class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body;
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        const result = await authenticateUserUseCase.execute({ name, password });

        return response.json(result);
    }
}
export { AuthenticateUserController }