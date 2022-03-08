import { Request, Response } from "express";
import { CreateBebidaUseCase } from "./CreateBbidaUseCase";








class CreateBebidaController {
    async handle(request: Request, response: Response) {
        const { name, volume, valor, latitude, longitude, loja_name } = request.body;
        const { user_id } = request;
        const createBebidaUseCase = new CreateBebidaUseCase();
        const bebida = await createBebidaUseCase.execute({ name, valor, volume, user_id, latitude, longitude, loja_name });

        return response.json(bebida);
    }
}

export { CreateBebidaController }