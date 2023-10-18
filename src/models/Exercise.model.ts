export interface Exercise {
    id: string,
    name: string,
    image_url: string,
    gifUrl:string,
    description:string,
    repetitions:Repetitions,
    sets:number
}

interface Repetitions {
    begginer:number,
    intermediate:number,
    advanced:number
}