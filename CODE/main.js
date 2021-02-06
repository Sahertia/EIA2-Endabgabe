"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    // TODO: Wie importiert man die scripts richtig?
    // import RocketPhysics = Firework_Canvas.RocketWithPhysics;
    let rocketParticles = []; // TODO
    let maxRockets = 5000;
    let rocketsSpawm = 1;
    let rocketCascadeMax = 2;
    let rocketsPerCascade = 10;
    let updateTimer = 20;
    window.addEventListener("load", init);
    window.addEventListener("click", spawnSomeRockets);
    function init() {
        let canvas = document.querySelector("canvas");
        // let GUI: HTMLDivElement | null = document.querySelector("GUI");
        if (!canvas)
            return;
        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);
        rocketParticles.length = maxRockets;
        // let ctx: CanvasRenderingContext2D;
        Rocket_Jam.ctx = canvas.getContext("2d");
        Rocket_Jam.ctx.beginPath();
        Rocket_Jam.ctx.fillStyle = "#000000"; // TODO: Check if opacity 
        Rocket_Jam.ctx.fillRect(0, 0, Rocket_Jam.ctx.canvas.width, Rocket_Jam.ctx.canvas.height);
        Rocket_Jam.ctx.stroke();
        spawnSomeRockets();
        // update();
        setInterval(update, updateTimer, canvas);
    }
    function update() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Rocket_Jam.ctx = canvas.getContext("2d");
        // console.log("update");
        // ctx.putImageData(saveBackground, 0, 0); // TODO: Understand this line
        Rocket_Jam.ctx.beginPath();
        Rocket_Jam.ctx.fillStyle = "#00000022"; // TODO: Check if opacity 
        Rocket_Jam.ctx.fillRect(0, 0, Rocket_Jam.ctx.canvas.width, Rocket_Jam.ctx.canvas.height);
        Rocket_Jam.ctx.stroke();
        // TODO: Implement physics for all rockets
        for (let i = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null) {
                continue;
            }
            else if (rocketParticles[i].shouldBeDestroyed) {
                // Can the rocket spawn sub particles?
                if (rocketParticles[i] == null || rocketParticles[i].hierarchy < rocketCascadeMax && rocketParticles[i].canBeOverwritten == false) // TODO: let each rocket know how many hierarchies it has
                 {
                    for (let i = 0; i < rocketsPerCascade; i++) {
                        trySpawnRocketParticle(rocketParticles[i].hierarchy + 1, i);
                    }
                }
                rocketParticles[i].canBeOverwritten = true;
                rocketParticles.splice(i, 1);
                rocketParticles.pop();
                i--;
            }
            else {
                rocketParticles[i].calculateNewValue(updateTimer, canvas.width, canvas.height);
                //  console.log(rocketParticles[i].yVelocity);
                Rocket_Jam.ctx.save();
                Rocket_Jam.ctx.beginPath();
                // console.log(rocketParticles[i].lifetime);
                Rocket_Jam.ctx.fillStyle = "#ffffff"; // TODO: Check if opacity 
                Rocket_Jam.ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                // ctx.rotate(rotationValue + 3.1415 / 2);
                Rocket_Jam.ctx.fill();
                Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorCurrent;
                Rocket_Jam.ctx.closePath();
                Rocket_Jam.ctx.stroke();
                Rocket_Jam.ctx.restore();
            }
        }
    }
    function spawnSomeRockets() {
        // On start, spawn 5 rockets randomly
        for (let i = 0; i < rocketsSpawm; i++) {
            trySpawnRocketNew();
            // console.log(rocketParticles[i].size);
            // console.log(rocketParticles[i].xPosition);
        }
    }
    // Code to launch a new rocket
    function trySpawnRocketNew() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Rocket_Jam.ctx = canvas.getContext("2d");
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }
        let newRocket;
        let xPos = Math.random() * canvas.width;
        let yPos = canvas.height; // TODO: check what canvas.height is
        let xVel = (Math.random() - 0.5) * 2 * 20000 / canvas.width; // How much sideways the rocket flies 
        let yVel = (Math.random() * (-5)) - 20000 / canvas.height;
        // let yVel : number = (Math.random() * (-5)) - 100; 
        let lifetime = Math.random() * 0.05 + 0.025;
        // TODO: Get small/middle/large
        /*
        if()
        {

        }
        */
        let size = 0.4;
        let colorStart = "#000000";
        let colorEnd = "#ffffff";
        let radius = Math.random() * 3 + 1; // TODO: get value from user input
        newRocket = new Rocket_Jam.RocketWithPhysics(xPos, yPos, xVel, yVel, 9.81, lifetime, size, colorStart, colorEnd, 0, radius);
        rocketParticles[spawnIndex] = newRocket;
    }
    function trySpawnRocketParticle(hierarchy, index) {
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex == -1) {
            return;
        }
        let lifetime = Math.random() * 0.05 + 0.05; // TODO: get value for this from user input
        let colorStart = "#000000"; // TODO: change to cascade from main rocket
        let colorEnd = "#ffffff66";
        let radius = rocketParticles[index].size * 1; // TODO: get value from user input
        // let radius : number = Math.random() * 0.05 + 0.05; // TODO: get value from user input
        let newRocket;
        newRocket = new Rocket_Jam.RocketWithPhysics(0, 0, 0, 0, 9.81, lifetime, radius, colorStart, colorEnd, hierarchy, radius);
        newRocket.copyPosition(rocketParticles[index]);
        newRocket.xVelocity += (Math.random() - 0.5) * 30;
        newRocket.yVelocity += (Math.random() - 0.5) * 30;
        rocketParticles[spawnIndex] = newRocket;
    }
    function GetFreeRocketSlot() {
        // console.log(rocketParticles.length);
        for (let i = 0; i < maxRockets; i++) {
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
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=main.js.map