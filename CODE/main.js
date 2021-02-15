"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    let serverPage = "https://rocketjam.herokuapp.com/";
    let canvas;
    let rocketParticles = []; // TODO
    let maxRockets = 2500;
    let rocketsSpawn = 1;
    let updateTimer = 20;
    let xMouse;
    let yMouse;
    let gravity = 9.81 * 10;
    window.addEventListener("load", handleLoad);
    function shootMouse(_event) {
        _event.preventDefault();
        let rect = Rocket_Jam.ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }
    async function handleLoad() {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);
        rocketParticles.length = maxRockets;
        Rocket_Jam.ctx = canvas.getContext("2d");
        Rocket_Jam.ctx.beginPath();
        Rocket_Jam.ctx.fillStyle = "#000000";
        Rocket_Jam.ctx.fillRect(0, 0, Rocket_Jam.ctx.canvas.width, Rocket_Jam.ctx.canvas.height);
        Rocket_Jam.ctx.stroke();
        setInterval(update, updateTimer, canvas);
        document?.querySelector("canvas")?.addEventListener("click", shootMouse);
        await getDataFromServer();
        console.log(Rocket_Jam.result);
        Rocket_Jam.generateContent(Rocket_Jam.result);
        let loadBtn = document.querySelector("button#loadBtn");
        loadBtn.addEventListener("click", Rocket_Jam.loadCurrentSelectedPreset);
        let saveBtn = document.querySelector("button#saveBtn");
        saveBtn.addEventListener("click", sendDataToServer);
    }
    // Called only at start
    async function getDataFromServer() {
        let response = await fetch(serverPage + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        console.log(allDatas);
        Rocket_Jam.result = {
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
                    explosionTimes: 4
                }
            ]
        };
        for (let i = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp = allDatas[i]; //.find(item => item.rocketTitel === userValue);
            // resultInterface.
            console.log(allDatas);
            console.log("TODO: Loading problem is here: cannot convert the data properly");
            console.log(allDatas[i]);
            let resultInterface = {
                preset: "" + resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                particleRadius: resultInterfaceTemp.particleRadius,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                explosionTimes: resultInterfaceTemp.explosionTimes
            };
            // console.log(resultInterface);
            Rocket_Jam.result.Rockets.push(resultInterface);
        }
        console.log("Datein wurden geladen");
        console.log(Rocket_Jam.result);
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
        Rocket_Jam.ctx.fillStyle = "#00000011"; // TODO: Check if opacity 
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
                if ((rocketParticles[i].hierarchy < rocketParticles[i].hierarchyMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                    console.log(rocketParticles[i].particleAmount);
                    for (let i = 0; i < rocketParticles[i].particleAmount; i++) {
                        trySpawnRocketParticle(rocketParticles[i], i);
                    }
                }
                if (rocketParticles[i].canBeOverwritten != true) {
                    Rocket_Jam.ctx.save();
                    Rocket_Jam.ctx.beginPath();
                    Rocket_Jam.ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
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
                    // console.log(1);
                }
                else {
                    Rocket_Jam.ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    // console.log(2);
                }
                Rocket_Jam.ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
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
    // Function which condensed the current values of the GUI into a rocket, and then saves that as a new one.
    async function sendDataToServer(_event) {
        let form = document.querySelector("form#userInterface");
        let interfaceData = new FormData(form);
        let query = new URLSearchParams(interfaceData);
        console.log(query);
        let response = await fetch(serverPage + "?" + query.toString());
        let responseText = await response.text();
        alert("Deine Daten wurden gespeichert");
        console.log("Daten geschickt: ", responseText);
        console.log(responseText);
    }
    function spawnSomeRockets() {
        // On start, spawn 5 rockets randomly
        for (let i = 0; i < rocketsSpawn; i++) {
            trySpawnRocketNew();
        }
    }
    Rocket_Jam.spawnSomeRockets = spawnSomeRockets;
    // launch a new rocket
    function trySpawnRocketNew() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Rocket_Jam.ctx = canvas.getContext("2d");
        let colorStart = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        console.log(new FormData(document.forms[1]).get("lifetime"));
        console.log(lifetime);
        let radius = Number(new FormData(document.forms[1]).get("particleRadius"));
        console.log(radius);
        let size = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount = Number(new FormData(document.forms[1]).get("spawnAmount"));
        console.log(size);
        let hierarchyMax = Number(new FormData(document.forms[1]).get("explosionTimes"));
        console.log(hierarchyMax);
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }
        let newRocket;
        let pos = new Rocket_Jam.Vector(canvas.width / 2, canvas.height);
        let vel = new Rocket_Jam.Vector((xMouse - pos.x) / updateTimer / 5 * 4, Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15);
        newRocket = new Rocket_Jam.RocketWithPhysics(pos, vel, gravity, lifetime, size, colorStart, colorEnd, particleAmount, 0, hierarchyMax, radius);
        rocketParticles[spawnIndex] = newRocket;
    }
    function trySpawnRocketParticle(rocketOriginal, index) {
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");
            let lifetime = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6));
            let position = new Rocket_Jam.Vector(0, 0);
            let velocity = new Rocket_Jam.Vector(0, 0);
            let colorStart = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
            let colorEnd = rocketOriginal.colorEnd;
            let size = rocketParticles[index].size * 0.5;
            let radius = rocketParticles[index].radius * 0.8;
            let particleAmount = rocketParticles[index].particleAmount;
            let newRocket;
            newRocket = new Rocket_Jam.RocketWithPhysics(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.copyPosition(rocketParticles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            rocketParticles[spawnIndex] = newRocket;
        }
    }
    function GetFreeRocketSlot() {
        // console.log(rocketParticles.length);
        for (let i = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) { // Rocket respawn problem here
                // console.log(i);
                return i;
            }
        }
        return -1;
    }
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=main.js.map