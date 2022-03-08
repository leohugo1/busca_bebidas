import { Request, Response } from "express";
import { FindAllBebidasUseCase } from "./FindAllBebidasUseCase";





class FindAllBebidasController {
    async handle(request: Request, response: Response) {
        const name = request.query.name as string;
        const latitude = parseFloat(request.query.latitude as string);
        const longitude = parseFloat(request.query.longitude as string);
        const metros = request.query.metros as string;
        const findAllBebidasUseCase = new FindAllBebidasUseCase();
        const result = await findAllBebidasUseCase.execute({ name, latitude, longitude, metros });

        return response.json(result);
    }
}
export { FindAllBebidasController }