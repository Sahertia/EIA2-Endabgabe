namespace Rocket_Jam {
    // TODO: Wie importiert man die scripts richtig?
    // import RocketPhysics = Firework_Canvas.RocketWithPhysics;

    let rocketParticles: RocketWithPhysics[] = []; // TODO
    let maxRockets: number = 5000;

    let rocketsSpawm: number = 1;

    let rocketCascadeMax: number = 2;
    let rocketsPerCascade: number = 10;

    let updateTimer: number = 20;

    export let ctx: CanvasRenderingContext2D;

    window.addEventListener("load", init);
    window.addEventListener("click", spawnSomeRockets);


    function init(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        // let GUI: HTMLDivElement | null = document.querySelector("GUI");
        if (!canvas)
            return;

        canvas.width = screen.width;
        canvas.height = screen.height;


        console.log(maxRockets);

        rocketParticles.length = maxRockets;

        // let ctx: CanvasRenderingContext2D;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "#000000"; // TODO: Check if opacity 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        spawnSomeRockets();

        // update();
        setInterval(update, updateTimer, canvas);
    }

    function update(): void {

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        // console.log("update");
        // ctx.putImageData(saveBackground, 0, 0); // TODO: Understand this line
        ctx.beginPath();
        ctx.fillStyle = "#00000022"; // TODO: Check if opacity 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        // TODO: Implement physics for all rockets
        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null) {
                continue;
            } else if (rocketParticles[i].shouldBeDestroyed) {
                // Can the rocket spawn sub particles?
                if (rocketParticles[i] == null || rocketParticles[i].hierarchy < rocketCascadeMax && rocketParticles[i].canBeOverwritten == false) // TODO: let each rocket know how many hierarchies it has
                {
                    for (let i: number = 0; i < rocketsPerCascade; i++) {
                        trySpawnRocketParticle(rocketParticles[i].hierarchy + 1, i);
                    }
                }
                rocketParticles[i].canBeOverwritten = true;
                rocketParticles.splice(i, 1);
                rocketParticles.pop();
                i--;
            } else {
                rocketParticles[i].calculateNewValue(updateTimer, canvas.width, canvas.height);
                //  console.log(rocketParticles[i].yVelocity);

                ctx.save();
                ctx.beginPath();

                // console.log(rocketParticles[i].lifetime);

                ctx.fillStyle = "#ffffff"; // TODO: Check if opacity 

                ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                // ctx.rotate(rotationValue + 3.1415 / 2);
                ctx.fill();
                ctx.fillStyle = rocketParticles[i].colorCurrent;
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

            }
        }
    }

    function spawnSomeRockets(): void {
        // On start, spawn 5 rockets randomly
        for (let i: number = 0; i < rocketsSpawm; i++) {
            trySpawnRocketNew();
            // console.log(rocketParticles[i].size);
            // console.log(rocketParticles[i].xPosition);
        }
    }

    // Code to launch a new rocket
    function trySpawnRocketNew(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");


        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }

        let newRocket: RocketWithPhysics;

        let xPos: number = Math.random() * canvas.width;
        let yPos: number = canvas.height; // TODO: check what canvas.height is

        let xVel: number = (Math.random() - 0.5) * 2 * 20000 / canvas.width; // How much sideways the rocket flies 
        let yVel: number = (Math.random() * (-5)) - 20000 / canvas.height;
        // let yVel : number = (Math.random() * (-5)) - 100; 

        let lifetime: number = Math.random() * 0.05 + 0.025;

        // TODO: Get small/middle/large
        /*
        if()
        {

        }
        */
        let size: number = 0.4;

        let colorStart: string = "#000000";
        let colorEnd: string = "#ffffff";

        let radius: number = Math.random() * 3 + 1; // TODO: get value from user input

        newRocket = new RocketWithPhysics(xPos, yPos, xVel, yVel, 9.81, lifetime, size, colorStart, colorEnd, 0, radius);
        rocketParticles[spawnIndex] = newRocket;
    }

    function trySpawnRocketParticle(hierarchy: number, index: number): void {
        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex == -1) {
            return;
        }

        let lifetime: number = Math.random() * 0.05 + 0.05; // TODO: get value for this from user input

        let colorStart: string = "#000000"; // TODO: change to cascade from main rocket
        let colorEnd: string = "#ffffff66";

        let radius: number = rocketParticles[index].size * 1; // TODO: get value from user input
        // let radius : number = Math.random() * 0.05 + 0.05; // TODO: get value from user input

        let newRocket: RocketWithPhysics;
        newRocket = new RocketWithPhysics(0, 0, 0, 0, 9.81, lifetime, radius, colorStart, colorEnd, hierarchy, radius);
        newRocket.copyPosition(rocketParticles[index]);
        newRocket.xVelocity += (Math.random() - 0.5) * 30;
        newRocket.yVelocity += (Math.random() - 0.5) * 30;
        rocketParticles[spawnIndex] = newRocket;
    }

    function GetFreeRocketSlot(): number {

        // console.log(rocketParticles.length);
        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) // Rocket respawn problem here
            {
                console.log(i);
                return i;
            }
        }


        return -1;

    }

    // function displayDuration(_event: Event): void {
    //     let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("#durationSlider");
    //     let duration: string = (<HTMLInputElement>_event.target).value;
    //     progress.value = parseFloat(duration);
    // }


}    
