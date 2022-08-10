import { Request, Response } from 'express';
import { DeleteScheduleUseCase } from "./DeleteScheduleUseCase"

class DeleteScheduleController {

    constructor(private deleteScheduleUseCase: DeleteScheduleUseCase){}

    handle(request: Request, response: Response){
        const { id } = request.params;
        
        this.deleteScheduleUseCase.execute({ id });
  
        return response.status(201).send()
    }
}

export { DeleteScheduleController }