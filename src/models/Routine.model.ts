import { Exercise } from "./Exercise.model"

export class Routine {
    id:string
    name:String = ""
    exercises: Exercise[] = []
    history: History[] = [];
    rest_time: number = 0;
}

export class History {
    completed_date: Date
    rest_time: number
    history_exercises: Exercise[] = []
    note?: string = "";
}