import fs from "fs";
import { Schedule } from "../models/Schedule";
import { differenceBetweenDates, dateLocale, formatDate, transformStringInDate } from "../../utils/ManipulateDate"

class ScheduleRepository {
    schedules: Schedule[]; 

    constructor(){
        this.schedules = []
    }

    createSchedule(date, intervals, name, id): void {
        this.schedules = this.listRulesSchedules();

        const schedule = new Schedule(id);

        schedule.date = date;
        schedule.intervals = intervals;
        schedule.name = name;

        this.schedules.push(schedule);

        fs.writeFileSync("schedules.json", JSON.stringify(this.schedules)); 

        return schedule
    }

    deleteSchedule({ id }): void {
        const rulesSchedules = this.listRulesSchedules();
        const schedules = rulesSchedules.filter((schedule) => {
            return schedule.id !== id 
        });
        
        if (rulesSchedules.length === schedules.length) { 
            throw new Error("O agendamento não foi encontrado.");
        }

        this.writeFileJson({ schedules })
    }

    listRulesSchedules() {
        const data = fs.readFileSync("schedules.json");
        const schedules = JSON.parse(data.toString('utf8'))
        return schedules
    }

    listRulesSchedulesFormated() {
        const data = fs.readFileSync("schedules.json");
        const schedules = JSON.parse(data.toString('utf8'))
        
        this.formatSchedules(schedules)

        return schedules
    }

    formatSchedules(schedules){
        schedules.map((schedule) => {
            schedule.date = formatDate(schedule.date, "DD-MM-YYYY")
            schedule.intervals.map((interval) => {
                interval.start = formatDate(interval.start, "HH:mm")
                interval.end = formatDate(interval.end, "HH:mm")
            })
        })
    }

    listAvailableSchedules({ startDate, endDate }){
        const allRulesSchedules = this.listRulesSchedules();

        const availablesSchedules = allRulesSchedules.filter((ruleSchedule) => {
            const dateOfSchedule = dateLocale(ruleSchedule.date);
            return dateOfSchedule >= transformStringInDate(startDate) && dateOfSchedule <= transformStringInDate(endDate)
        })

        this.formatSchedules(availablesSchedules)

        return availablesSchedules;
    }
    
    listOneSchedule(date, intervalRequest){
        const allRulesSchedules = this.listRulesSchedules();

        const rulesSchedulesForDate = allRulesSchedules.filter((ruleSchedule) => {
            if(differenceBetweenDates(date, dateLocale(ruleSchedule.date)) === 0){
                return ruleSchedule
            }
        })

        const ruleSchedule = rulesSchedulesForDate.find((ruleSchedule) => {
            const timeAlreadyExistsInSchedule = ruleSchedule.intervals.find((intervalSchedule) => {
                return (intervalRequest.start >= dateLocale(intervalSchedule.start) 
                    && intervalRequest.start <= dateLocale(intervalSchedule.end))
                    || 
                    (intervalRequest.end >= dateLocale(intervalSchedule.start) 
                    && intervalRequest.end <= dateLocale(intervalSchedule.end))         
            })

            return timeAlreadyExistsInSchedule;

        })

        return ruleSchedule
    }

    writeFileJson({ schedules }){
        fs.writeFile("schedules.json", JSON.stringify(schedules), () => {});
    }
}

export { ScheduleRepository }