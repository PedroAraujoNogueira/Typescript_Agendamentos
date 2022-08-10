import { v4 as uuidV4 } from 'uuid';

class Schedule {
  id?: string;
  name: string;
  date: string;
  intervals: string[];

  constructor(id) {
    if (!id) {
      this.id = uuidV4();
    } else {
      this.id = id
    }
  }
}

export { Schedule };
