import { v4 as uuidV4 } from 'uuid';

import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { addDaysInDate, addHourAndMinute, addWeeksInDate, dateLocale, dayOfWeek, differenceBetweenDates, transformStringInDate } from "../../../utils/ManipulateDate"

class CreateScheduleUseCase {

    constructor(private scheduleRepository: ScheduleRepository){}

    validateTimeAlreadyExistInOwnRequest(intervals, intervalFormated){
        const timeAlreadyExistsInRequest = intervals.find((interval) => {
            return (intervalFormated.start >= interval.start 
                && intervalFormated.start <= interval.end)
                || 
                (intervalFormated.end >= interval.start 
                && intervalFormated.end <= interval.end)         
        })

        if(timeAlreadyExistsInRequest){
            throw new Error('Você escolheu horários que entram em conflito.')   
        }
    }

    intervalsFormatedAndValidate(date, intervals){

        const intervalsFormatedAndValidate = []

        intervals.map((interval) => {
            const intervalFormated = {}
            const hourStart = interval.start.split(":")[0]
            const minuteStart = interval.start.split(":")[1]
            const hourEnd = interval.end.split(":")[0]
            const minuteEnd = interval.end.split(":")[1]
    
            intervalFormated.start = addHourAndMinute(date, hourStart, minuteStart);
            intervalFormated.end = addHourAndMinute(date, hourEnd, minuteEnd);
            
            if(intervalFormated.start >= intervalFormated.end){
                throw new Error('O horário de início é maior ou igual ao horário de termino.');
            }

            this.validateDateStartAfterDateNow(intervalFormated.start);

            this.validateTimeAlreadyExistInOwnRequest(intervalsFormatedAndValidate, intervalFormated);
            
            const timeAlreadyExistsInSchedule = this.scheduleRepository.listOneSchedule(date, intervalFormated);

            if(timeAlreadyExistsInSchedule){
                throw new Error('Você escolheu um horário já agendado por alguém..')   
            }

            intervalsFormatedAndValidate.push(intervalFormated);
        })

        return intervalsFormatedAndValidate;
    }

    validateDaysOfWeek(daysLength: number): void {
        if(daysLength > 7){
            throw new Error('Não existe essa quantidade de dias em uma semana.');
        }
    }

    validateDateStartBeforeDateEnd(dateStartFormat, dateEndFormat): void {
        if(dateStartFormat > dateEndFormat){
            throw new Error('A data inicial é maior que a data final.')
        }
    }

    validateDateStartAfterDateNow(dateStart): void {
        if(dateStart < dateLocale()){
            throw new Error('A data inicial é anterior a data atual.');
        }
    }
    
    validateHourAndMinuteOfIntervals(intervals): void {
        intervals.map((interval) => {
            const hourStart = interval.start.split(":")[0]
            const minuteStart = interval.start.split(":")[1]
            const hourEnd = interval.end.split(":")[0]
            const minuteEnd = interval.end.split(":")[1]
                
            if(!(hourStart >= 0 && hourStart < 24)){
                throw new Error('A hora de início escolhida não está entre 0 e 24.')
            }
        
            if(!(hourEnd >= 0 && hourEnd < 24)){
                throw new Error('A hora final escolhida não está entre 0 e 24.')
            }
        
            if(!(minuteStart >= 0 && minuteStart < 60)){
                throw new Error('O minuto de início escolhido não está entre 0 e 60.')
            }
        
            if(!(minuteEnd >= 0 && minuteEnd < 60)){
                throw new Error('O minuto final escolhido não está entre 0 e 60.')
            }
        })
    }

    execute(dateStart, dateEnd, days, intervals, name): void {
        const id = uuidV4();
        const daysLength = days.length; 

        this.validateDaysOfWeek(daysLength);

        const dateStartFormat = transformStringInDate(dateStart);
        const dateEndFormat = transformStringInDate(dateEnd);
        
        this.validateHourAndMinuteOfIntervals(intervals);

        this.validateDateStartBeforeDateEnd(dateStartFormat, dateEndFormat);

        switch(daysLength){
            case 0: 
                const date = dateStartFormat;
                const intervalsValidate = this.intervalsFormatedAndValidate(date, intervals);
                this.scheduleRepository.createSchedule(date, intervalsValidate, name, id);
                break;
            case 7:
                for(let date = dateStartFormat; differenceBetweenDates(date, dateEndFormat) !== 0; date = addDaysInDate(date, 1)){
                    const intervalsValidate = this.intervalsFormatedAndValidate(date, intervals);
                    this.scheduleRepository.createSchedule(date, intervalsValidate, name, id);                
                }  
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6: 
                days.map((dayINeed) => {
                    const dateInitial = dayOfWeek(dateStartFormat)
                    let firstDayWeeklyRecurrence;
                    if (dateInitial <= dayINeed) { 
                        firstDayWeeklyRecurrence = dayOfWeek(dateStartFormat, dayINeed);
                    } else {
                        firstDayWeeklyRecurrence = dayOfWeek(addWeeksInDate(dateStartFormat, 1), dayINeed);
                    }
                    
                    for(let date = firstDayWeeklyRecurrence; differenceBetweenDates(date, dateEndFormat) <= 0; date = addDaysInDate(date, 7)){    
                        const intervalsValidate = this.intervalsFormatedAndValidate(date, intervals);
                        this.scheduleRepository.createSchedule(date, intervalsValidate, name, id);
                    } 
                })
                break;  
        }
    }
}

export { CreateScheduleUseCase }
