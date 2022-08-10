import { Schedule } from "../../models/Schedule";
import { ScheduleRepository } from "../../repositories/ScheduleRepository";

class ListRulesSchedulesUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute() {
    const allRulesSchedules = this.scheduleRepository.listRulesSchedulesFormated();

    return allRulesSchedules;
  }
}

export { ListRulesSchedulesUseCase };