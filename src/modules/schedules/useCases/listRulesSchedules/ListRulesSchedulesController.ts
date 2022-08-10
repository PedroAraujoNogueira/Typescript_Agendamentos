import { Request, Response } from "express";

import { ListRulesSchedulesUseCase } from "./ListRulesSchedulesUseCase";

class ListRulesSchedulesController {
  constructor(private listRulesSchedulesUseCase: ListRulesSchedulesUseCase) {}

  handle(request: Request, response: Response): Response {

    const allRulesSchedules = this.listRulesSchedulesUseCase.execute();

    return response.json(allRulesSchedules);
  }
}

export { ListRulesSchedulesController };
