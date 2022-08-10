import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { ListAvailableSchedulesUseCase } from "./ListAvailableSchedulesUseCase";
import { ListAvailableSchedulesController } from "./ListAvailableSchedulesController";

const scheduleRepository = new ScheduleRepository();

const listAvailableSchedulesUseCase = new ListAvailableSchedulesUseCase(scheduleRepository);

const listAvailableSchedulesController = new ListAvailableSchedulesController(
    listAvailableSchedulesUseCase
);

export { listAvailableSchedulesController };