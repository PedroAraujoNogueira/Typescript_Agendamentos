import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { DeleteScheduleController } from "./DeleteScheduleController";
import { DeleteScheduleUseCase } from "./DeleteScheduleUseCase";

const scheduleRepository = new ScheduleRepository();

const deleteScheduleUseCase = new DeleteScheduleUseCase(scheduleRepository);

const deleteScheduleController = new DeleteScheduleController(deleteScheduleUseCase);

export { deleteScheduleController }