import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { CreateScheduleController } from "./CreateScheduleController";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";


const scheduleRepository = new ScheduleRepository();

const createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository);

const createScheduleController = new CreateScheduleController(createScheduleUseCase);

export { createScheduleController };