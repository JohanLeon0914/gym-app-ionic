import { Exercise } from "./Exercise.model"

export class Routine {
    id:string
    name:String = ""
    exercises: Exercise[] = []
    date_and_rest_time: Date_and_rest_time[] = [];
    rest_time: number = 0;
}

export interface Date_and_rest_time {
    completed_date: Date
    rest_time: number
}