import { Schedule } from "../../models/Schedule";
import { ScheduleRepository } from "../../repositories/ScheduleRepository";

class ListAvailableSchedulesUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute({ startDate, endDate }) {
    const availableSchedules = this.scheduleRepository.listAvailableSchedules({ startDate, endDate });

    return availableSchedules;
  }
}

export { ListAvailableSchedulesUseCase };