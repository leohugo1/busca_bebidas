import { Request, Response } from "express";
import { ReportUserUseCase } from "./ReportUserUseCase";





class ReportUserController {
    async handle(request: Request, response: Response) {
        const { id: id_user } = request.params;
        const { user_id } = request;
        const reportUserUseCase = new ReportUserUseCase()
        const result = await reportUserUseCase.execute(id_user, user_id);
        return response.json(result);
    }
}
export { ReportUserController }