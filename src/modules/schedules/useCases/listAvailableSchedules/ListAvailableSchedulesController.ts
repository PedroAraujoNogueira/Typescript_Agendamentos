import { Request, Response } from "express";

import { ListAvailableSchedulesUseCase } from "./ListAvailableSchedulesUseCase";

class ListAvailableSchedulesController {
  constructor(private listAvailableSchedulesUseCase: ListAvailableSchedulesUseCase) {}

  handle(request: Request, response: Response): Response {
    const { startDate, endDate } = request.query

    const availableSchedules = this.listAvailableSchedulesUseCase.execute({ startDate, endDate });

    return response.json(availableSchedules);
  }
}

export { ListAvailableSchedulesController };
