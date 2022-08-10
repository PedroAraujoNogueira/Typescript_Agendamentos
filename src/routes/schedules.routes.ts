import { Router } from "express";

import { createScheduleController } from "../modules/schedules/useCases/createSchedule";
import { listRulesSchedulesController } from "../modules/schedules/useCases/listRulesSchedules";
import { listAvailableSchedulesController } from "../modules/schedules/useCases/listAvailableSchedules";
import { deleteScheduleController } from "../modules/schedules/useCases/deleteSchedule";

const scheduleRoutes = Router();

scheduleRoutes.get("/", (request, response) => {
  return listRulesSchedulesController.handle(request, response);
});

scheduleRoutes.get("/availables", (request, response) => {
  return listAvailableSchedulesController.handle(request, response);
});

scheduleRoutes.post("/", (request, response) => {
  return createScheduleController.handle(request, response);
});

scheduleRoutes.delete("/:id", (request, response) => {
  return deleteScheduleController.handle(request, response);
});

export { scheduleRoutes };