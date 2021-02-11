namespace Rocket_Jam {

    let canvas: HTMLCanvasElement | null;

    let rocketParticles: RocketWithPhysics[] = []; // TODO
    let maxRockets: number = 10000;

    let rocketsSpawm: number = 1;

    let rocketCascadeMax: number = 2; // 3 OG
    let rocketsPerCascade: number = 4; // 5 OG

    let rocketLifeTime: number = 0.05;
    let rocketRadius: number = 0.5;
    let rocketSize: number = 0.5;

    let updateTimer: number = 20;

    let xMouse: number;
    let yMouse: number;

    let colorStart: string;
    let colorEnd: string;

    let gravity: number = 9.81 * 10;

    export let ctx: CanvasRenderingContext2D;

    window.addEventListener("load", handleLoad);



    // window.addEventListener("click", spawnSomeRockets);

    function updateMouse(_event: MouseEvent): void {
        _event.preventDefault();
        var rect: ClientRect = ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }

    function handleLoad(): void {
        canvas = document.querySelector("canvas");
        // let GUI: HTMLDivElement | null = document.querySelector("GUI");
        if (!canvas)
            return;

        canvas.width = screen.width;
        canvas.height = screen.height;

        console.log(maxRockets);

        rocketParticles.length = maxRockets;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#000000"; // TODO: Check if opacity 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();
        setInterval(update, updateTimer, canvas);

        document?.querySelector("canvas")?.addEventListener("click", updateMouse);


        // var theInput = document.getElementById("favcolor");
        // var theColor = theInput.value;
        // theInput.addEventListener("input", function() {

        // document.getElementById("hex").innerHTML = theInput.value;
        // }, false);

        // let colorPicker = document.getElementById("")



    }

    // This big method is called every frame (hopefully). 
    // It checks which rockets needs to be rendered onto the canvas and which rockets are gone and produce sub-particles.
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

                console.log("pre-spawm");

                if ((rocketParticles[i].hierarchy < rocketCascadeMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                

                    for (let i: number = 0; i < rocketsPerCascade; i++) {
                        trySpawnRocketParticle(rocketParticles[i], i);
                    }
                }

                if (rocketParticles[i].canBeOverwritten != true) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
                    if (rocketParticles[i].hierarchy == 0) {
                        ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    } else {
                        ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    }
                    // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                    // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                    // ctx.rotate(rotationValue + 3.1415 / 2);
                    ctx.fill();
                    ctx.fillStyle = rocketParticles[i].colorCurrent;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
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

                if (rocketParticles[i].hierarchy == 0) {
                    ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    console.log(1);
                } else {
                    ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    console.log(2);
                }

                ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                // ctx.rotate(rotationValue + 3.1415 / 2);
                ctx.fill();
                ctx.fillStyle = rocketParticles[i].colorCurrent;
                ctx.strokeStyle = "rgba (1, 1, 1, 0)";
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

            }
        }
    }

    // Is triggered on click, will try to create new rockets
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

        let lifetime: number = rocketLifeTime; // stanadard  0.05 + 0.025

        let xPos: number = canvas.width / 2;
        let yPos: number = canvas.height; // TODO: check what canvas.height is


        let xVel: number = (xMouse - xPos) / updateTimer / 5 * 4; // This should roughly go from the starting position to the mouse x position:
        let yVel: number = Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15; // This should roughly be the formular to calculate the correct y velocity against the gravity. But it only works in the lower number areas.


        // TODO: Get small/middle/large // DO this with the GUI
        /*
        if()
        {

        }
        */
        let size: number = rocketSize;


        let formElement: HTMLElement = <HTMLElement>document.querySelector("input#startColor");
        colorStart = "" + formElement.getAttribute("value");
        formElement = <HTMLElement>document.querySelector("input#endColor");
        colorEnd = "" + formElement.getAttribute("value");

        console.log(colorStart + " | " + colorEnd);

        let radius: number = Math.random() * 0.1 + rocketRadius; // TODO: get value from user input

        newRocket = new RocketWithPhysics(xPos, yPos, xVel, yVel, gravity, lifetime, size, colorStart, colorEnd, 0, radius);
        rocketParticles[spawnIndex] = newRocket;
    }

    function trySpawnRocketParticle(rocketOriginal: RocketWithPhysics, index: number): void {
        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex == -1) {
            return;
        }
        console.log("spawn");

        let lifetime: number = (Math.random() * rocketLifeTime / 8) + rocketLifeTime / 2; // TODO: get value for this from user input

        let colorStart: string = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
        let colorEnd: string = rocketOriginal.colorEnd;

        let size: number = rocketParticles[index].size * 0.5; // TODO: get value from user input
        let radius: number = rocketParticles[index].radius * 0.8; // TODO: get value from user input

        let newRocket: RocketWithPhysics;
        newRocket = new RocketWithPhysics(0, 0, 0, 0, gravity, lifetime, size, colorStart, colorEnd, rocketOriginal.hierarchy + 1, radius);
        newRocket.copyPosition(rocketParticles[index]);
        newRocket.xVelocity = (Math.random() - 0.5) * 40;
        newRocket.yVelocity = (Math.random() - 0.75) * 40 + rocketOriginal.yVelocity / updateTimer;
        newRocket.colorStart = colorStart;
        newRocket.colorEnd = colorEnd;
        rocketParticles[spawnIndex] = newRocket;
    }

    function GetFreeRocketSlot(): number {

        // console.log(rocketParticles.length);
        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) // Rocket respawn problem here
            {
                // console.log(i);
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
