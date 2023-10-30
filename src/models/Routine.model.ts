import { Exercise } from "./Exercise.model"

export class Routine {
    id:string
    name:String = ""
    exercises: Exercise[] = []
    completed_dates: Date[] = [];
}