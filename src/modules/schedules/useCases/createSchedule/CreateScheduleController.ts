import { CreateScheduleUseCase } from "./CreateScheduleUseCase";
import { Request, Response } from "express"

class CreateScheduleController {
    
    constructor(private createScheduleUseCase: CreateScheduleUseCase){}
    
    handle(request: Request, response: Response): Response {
      const { dateStart, dateEnd, days, intervals, name } = request.body;
      const result = this.createScheduleUseCase.execute(dateStart, dateEnd, days, intervals, name);

      return response.json(result)
    }
}

export { CreateScheduleController };