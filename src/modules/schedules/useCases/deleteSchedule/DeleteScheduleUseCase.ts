import { ScheduleRepository } from "../../repositories/ScheduleRepository"

class DeleteScheduleUseCase {
    constructor(private scheduleRepository: ScheduleRepository){}

    execute({ id }){
        this.scheduleRepository.deleteSchedule({ id })
    }
}

export { DeleteScheduleUseCase }