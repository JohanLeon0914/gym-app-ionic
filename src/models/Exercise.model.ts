export interface Exercise {
    id: string,
    name: string,
    image_url: string,
    gifUrl:string,
    description:string,
    repetitions:Repetitions,
    category:string,
    sets:number
}

interface Repetitions {
    begginer:number,
    intermediate:number,
    advanced:number
}