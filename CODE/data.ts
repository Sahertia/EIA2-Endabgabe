namespace Rocket_Jam {
 
    export interface iRocket {
        preset: string;
        startColor: string;
        endColor: string;
        lifetime: number;
        particleSize: number;
        particleRadius: number;
        spawnAmount: number;
        explosionTimes: number;
    }
      
   
    export interface iData {
        [category: string]: iRocket[];
    }


    export let data: iData = {
        Rockets: [
            {
                preset: "Let it Bang!",
                startColor: "#e8e217",
                endColor: "#fc3bb3",
                lifetime: 0.4,
                particleSize: 1,
                particleRadius: 1,
                spawnAmount: 2,
                explosionTimes: 1
            },
            {
                preset: "Happy 2021",
                startColor: "#e8e217",
                endColor: "#00ffaa",
                lifetime: 0.2,
                particleSize: 1,
                particleRadius: 2,
                spawnAmount: 3,
                explosionTimes: 2
            },
            {
                preset: "BIG BANG!",
                startColor: "#fc3bb3",
                endColor: "#aaaaaa",
                lifetime: 0.1,
                particleSize: 4,
                particleRadius: 4,
                spawnAmount: 4,
                explosionTimes: 5
            }
        ]
    };
}