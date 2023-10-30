import { Exercise } from "./Exercise.model"

export class Routine {
    id:string
    name:String = ""
    exercises: Exercise[] = []
    history: history[] = [];
    rest_time: number = 0;
}

export class history {
    completed_date: Date
    rest_time: number
    history_exercises: Exercise[] = []
}