import { Request, Response } from "express";
import { UpdateValorUseCase } from "./UpdateValorUseCase";







class UpdateValorController {
    async handle(request: Request, response: Response) {
        const { valor } = request.body;
        const { user_id } = request;
        const { id: bebida_id } = request.params;

        const updateValorUseCase = new UpdateValorUseCase();
        const result = await updateValorUseCase.execute({ valor, user_id, bebida_id });

        return response.json(result);
    }
}
export { UpdateValorController }