"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    let canvas;
    let rocketParticles = []; // TODO
    let maxRockets = 10000;
    let rocketsSpawm = 1;
    let rocketCascadeMax = 2; // 3 OG
    let rocketsPerCascade = 4; // 5 OG
    let rocketLifeTime = 0.05;
    let rocketRadius = 0.5;
    let rocketSize = 0.5;
    let updateTimer = 20;
    let xMouse;
    let yMouse;
    let colorStart;
    let colorEnd;
    let gravity = 9.81 * 10;
    window.addEventListener("load", handleLoad);
    // window.addEventListener("click", spawnSomeRockets);
    function updateMouse(_event) {
        _event.preventDefault();
        var rect = Rocket_Jam.ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }
    function handleLoad() {
        canvas = document.querySelector("canvas");
        // let GUI: HTMLDivElement | null = document.querySelector("GUI");
        if (!canvas)
            return;
        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);
        rocketParticles.length = maxRockets;
        Rocket_Jam.ctx = canvas.getContext("2d");
        Rocket_Jam.ctx.beginPath();
        Rocket_Jam.ctx.fillStyle = "#000000"; // TODO: Check if opacity 
        Rocket_Jam.ctx.fillRect(0, 0, Rocket_Jam.ctx.canvas.width, Rocket_Jam.ctx.canvas.height);
        Rocket_Jam.ctx.stroke();
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
                console.log("pre-spawm");
                if ((rocketParticles[i].hierarchy < rocketCascadeMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                    for (let i = 0; i < rocketsPerCascade; i++) {
                        trySpawnRocketParticle(rocketParticles[i], i);
                    }
                }
                if (rocketParticles[i].canBeOverwritten != true) {
                    Rocket_Jam.ctx.save();
                    Rocket_Jam.ctx.beginPath();
                    Rocket_Jam.ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
                    if (rocketParticles[i].hierarchy == 0) {
                        Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    }
                    else {
                        Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    }
                    // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                    // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                    // ctx.rotate(rotationValue + 3.1415 / 2);
                    Rocket_Jam.ctx.fill();
                    Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorCurrent;
                    Rocket_Jam.ctx.closePath();
                    Rocket_Jam.ctx.stroke();
                    Rocket_Jam.ctx.restore();
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
                if (rocketParticles[i].hierarchy == 0) {
                    Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    console.log(1);
                }
                else {
                    Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    console.log(2);
                }
                Rocket_Jam.ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                // ctx.fillRect(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 50 * rocketParticles[i].size, 200 * rocketParticles[i].size);
                // let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                // ctx.rotate(rotationValue + 3.1415 / 2);
                Rocket_Jam.ctx.fill();
                Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorCurrent;
                Rocket_Jam.ctx.strokeStyle = "rgba (1, 1, 1, 0)";
                Rocket_Jam.ctx.closePath();
                Rocket_Jam.ctx.stroke();
                Rocket_Jam.ctx.restore();
            }
        }
    }
    // Is triggered on click, will try to create new rockets
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
        let lifetime = rocketLifeTime; // stanadard  0.05 + 0.025
        let xPos = canvas.width / 2;
        let yPos = canvas.height; // TODO: check what canvas.height is
        let xVel = (xMouse - xPos) / updateTimer / 5 * 4; // This should roughly go from the starting position to the mouse x position:
        let yVel = Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15; // This should roughly be the formular to calculate the correct y velocity against the gravity. But it only works in the lower number areas.
        // TODO: Get small/middle/large // DO this with the GUI
        /*
        if()
        {

        }
        */
        let size = rocketSize;
        let formElement = document.querySelector("input#startColor");
        colorStart = "" + formElement.getAttribute("value");
        formElement = document.querySelector("input#endColor");
        colorEnd = "" + formElement.getAttribute("value");
        console.log(colorStart + " | " + colorEnd);
        let radius = Math.random() * 0.1 + rocketRadius; // TODO: get value from user input
        newRocket = new Rocket_Jam.RocketWithPhysics(xPos, yPos, xVel, yVel, gravity, lifetime, size, colorStart, colorEnd, 0, radius);
        rocketParticles[spawnIndex] = newRocket;
    }
    function trySpawnRocketParticle(rocketOriginal, index) {
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex == -1) {
            return;
        }
        console.log("spawn");
        let lifetime = (Math.random() * rocketLifeTime / 8) + rocketLifeTime / 2; // TODO: get value for this from user input
        let colorStart = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
        let colorEnd = rocketOriginal.colorEnd;
        let size = rocketParticles[index].size * 0.5; // TODO: get value from user input
        let radius = rocketParticles[index].radius * 0.8; // TODO: get value from user input
        let newRocket;
        newRocket = new Rocket_Jam.RocketWithPhysics(0, 0, 0, 0, gravity, lifetime, size, colorStart, colorEnd, rocketOriginal.hierarchy + 1, radius);
        newRocket.copyPosition(rocketParticles[index]);
        newRocket.xVelocity = (Math.random() - 0.5) * 40;
        newRocket.yVelocity = (Math.random() - 0.75) * 40 + rocketOriginal.yVelocity / updateTimer;
        newRocket.colorStart = colorStart;
        newRocket.colorEnd = colorEnd;
        rocketParticles[spawnIndex] = newRocket;
    }
    function GetFreeRocketSlot() {
        // console.log(rocketParticles.length);
        for (let i = 0; i < maxRockets; i++) {
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
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=main.js.map