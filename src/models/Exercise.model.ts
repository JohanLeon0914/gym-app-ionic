export interface Exercise {
    id: string,
    name: string,
    image_url: string,
    gif_url:string,
    description:string,
    repetitions:Repetitions,
    category:string,
    run_time:number,
    weight?: Weight,
    sets:number
}

interface Repetitions {
    begginer:number[],
    intermediate:number[],
    advanced:number[]
}

interface Weight {
    begginer:number[],
    intermediate:number[],
    advanced:number[]
}