import { Request, Response } from "express";
import { FilterByVolumeUseCase } from "./FilterByVolumeUseCase";







class FilterByVolumeController {
    async handle(request: Request, response: Response) {
        const volume = parseInt(request.query.volume as string);
        const latitude = parseFloat(request.query.latitude as string);
        const longitude = parseFloat(request.query.longitude as string);
        const metros = request.query.metros as string;



        const filterByVolumeUseCase = new FilterByVolumeUseCase();
        const result = await filterByVolumeUseCase.execute({ volume, latitude, longitude, metros });

        return response.json(result);
    }
}
export { FilterByVolumeController }