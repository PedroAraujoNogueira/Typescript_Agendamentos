import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { ListRulesSchedulesUseCase } from "./ListRulesSchedulesUseCase";
import { ListRulesSchedulesController } from "./ListRulesSchedulesController";

const scheduleRepository = new ScheduleRepository();

const listRulesSchedulesUseCase = new ListRulesSchedulesUseCase(scheduleRepository);

const listRulesSchedulesController = new ListRulesSchedulesController(
    listRulesSchedulesUseCase
);

export { listRulesSchedulesController };