namespace Rocket_Jam {

    export interface iData {
        [category: string]: iRocket[];
    }

    export interface iRocket {
        preset: string;
        startColor: string;
        endColor: string;
        lifetime: number;
        particleSize: number;
        particleRadius: number;
        spawnAmount: number;
        ExplosionTimes: number;
    }

    export let data: iData = {
        Rockets: [
            {
                preset: "Default 1",
                startColor: "#dddddd",
                endColor: "#ffffff",
                lifetime: 0.4,
                particleSize: 1,
                particleRadius: 1,
                spawnAmount: 2,
                ExplosionTimes: 1
            },
            {
                preset: "Default 2",
                startColor: "#ffffff",
                endColor: "#ffffff",
                lifetime: 0.2,
                particleSize: 1,
                particleRadius: 3,
                spawnAmount: 3,
                ExplosionTimes: 2
            },
            {
                preset: "Default 3",
                startColor: "#dddddd",
                endColor: "#aaaaaa",
                lifetime: 0.3,
                particleSize: 1,
                particleRadius: 2,
                spawnAmount: 4,
                ExplosionTimes: 3
            }
        ]
    };
}