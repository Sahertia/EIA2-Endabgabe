// import { URLSearchParams } from "url";

namespace Rocket_Jam {
    let serverPage: string = "https://rocketjam.herokuapp.com/";
    export let result: iData;

    let canvas: HTMLCanvasElement | null;

    let rocketParticles: RocketWithPhysics[] = []; // TODO
    let maxRockets: number = 5000;

    let rocketsSpawn: number = 1;

    let updateTimer: number = 20;

    let xMouse: number;
    let yMouse: number;

    let gravity: number = 9.81 * 10;

    // let guiValues: interfaceValues | null;

    export let ctx: CanvasRenderingContext2D;

    window.addEventListener("load", handleLoad);


    function shootMouse(_event: MouseEvent): void {
        _event.preventDefault();
        let rect: ClientRect = ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }


    async function handleLoad(): Promise<void> {
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

        document?.querySelector("canvas")?.addEventListener("click", shootMouse);

        await getDataFromServer();

        console.log(result);

        generateContent(result);

        let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
        loadBtn.addEventListener("click", loadCurrentSelectedPreset);

        let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
        saveBtn.addEventListener("click", sendDataToServer);
    }

    // Function which loads all the rockets from the server into the main
    // Called only at start
    async function getDataFromServer() {
        let response = await fetch(serverPage + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        console.log(allDatas);
        // result = allDatas.find(item => item.rocketTitel === userValue);
        // result = <iData>allDatas;
        // console.log(result);
        result = {
            Rockets: [
                {
                    preset: "Default 1",
                    startColor: "#dddddd",
                    endColor: "#65431",
                    lifetime: 0.4,
                    particleSize: 1,
                    particleRadius: 1,
                    spawnAmount: 2,
                    ExplosionTimes: 1
                },
                {
                    preset: "Default 2",
                    startColor: "#ffaaff",
                    endColor: "#00ffaa",
                    lifetime: 0.2,
                    particleSize: 1,
                    particleRadius: 3,
                    spawnAmount: 3,
                    ExplosionTimes: 2
                },
                {
                    preset: "Default 3",
                    startColor: "#123456",
                    endColor: "#aaaaaa",
                    lifetime: 0.3,
                    particleSize: 1,
                    particleRadius: 2,
                    spawnAmount: 4,
                    ExplosionTimes: 3
                }
            ]
        };

        for(let i: number = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp: iRocket = <iRocket>allDatas[i]; //.find(item => item.rocketTitel === userValue);
            // resultInterface.
            console.log(allDatas);
            console.log("TODO: Loading problem is here: cannot convert the data properly")
            console.log(allDatas[i]);

            let resultInterface: iRocket = {
                preset: resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                particleRadius: resultInterfaceTemp.particleRadius,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                ExplosionTimes: resultInterfaceTemp.ExplosionTimes
            }
            // console.log(resultInterface);
            result.Rockets.push(resultInterface);
        }
        console.log("Datein wurden geladen");
        console.log(result);
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
        ctx.fillStyle = "#00000011"; // TODO: Check if opacity 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        // TODO: Implement physics for all rockets
        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null) {
                continue;
            } else if (rocketParticles[i].shouldBeDestroyed) {
                // Can the rocket spawn sub particles?

                console.log("pre-spawm");

                if ((rocketParticles[i].hierarchy < rocketParticles[i].hierarchyMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                    console.log(rocketParticles[i].particleAmount);
                    for (let i: number = 0; i < rocketParticles[i].particleAmount; i++) {
                        trySpawnRocketParticle(rocketParticles[i], i);
                    }
                }

                if (rocketParticles[i].canBeOverwritten != true) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
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
                    // console.log(1);
                } else {
                    ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    // console.log(2);
                }

                ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
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

    // Function which condensed the current values of the GUI into a rocket, and then saves that as a new one.
    async function sendDataToServer(_event: any) {
        // let rocketGUIData: iRocket = getCurrentValues();

        /*
        console.log(rocketGUIData);
        let query: string = rocketGUIData.toString();
        let urlSearchParam: URLSearchParams = new URLSearchParams(<any>query);
        console.log(query);

        // rocketTitel = textArea.value;
        // let presetName: string  = String(new FormData(document.forms[0]).get("presetName"));
        // let controlPanelData = new FormData(form);
        // let query = new URLSearchParams(controlPanelData);
        // query.append("rocketTitel", rocketTitel);
        // textArea.value = "";
        */
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form#userInterface");
        let controlPanelData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>controlPanelData);
        console.log(query);
        let response: Response = await fetch(serverPage + "?" + query.toString());
        let responseText: string = await response.text();
        alert("Deine Daten wurden gespeichert");
        console.log("Daten geschickt: ", responseText);
        console.log(responseText);
    }


    ////// ------------------------------------------------------------------------


    // Is triggered on click, will try to create new rockets
    export function spawnSomeRockets(): void {
        // On start, spawn 5 rockets randomly
        for (let i: number = 0; i < rocketsSpawn; i++) {
            trySpawnRocketNew();
            // console.log(rocketParticles[i].size);
            // console.log(rocketParticles[i].xPosition);
        }
    }

    // launch a new rocket
    function trySpawnRocketNew(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        let colorStart: string  = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string  = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        console.log(new FormData(document.forms[1]).get("lifetime"));
        console.log(lifetime);
        let radius: number = Number(new FormData(document.forms[1]).get("particleRadius"));
        console.log(radius);
        let size: number = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount: number = Number(new FormData(document.forms[1]).get("spawnAmount"));
        console.log(size);
        let hierarchyMax: number = Number(new FormData(document.forms[1]).get("explosionTimes"));
        console.log(hierarchyMax);

        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }

        let newRocket: RocketWithPhysics;
        let pos: Vector = new Vector(canvas.width / 2, canvas.height); 
        // This should roughly go from the starting position to the mouse x position:
        // This should roughly be the formular to calculate the correct y velocity against the gravity. But it only works in the lower number areas.
        let vel: Vector = new Vector((xMouse - pos.x) / updateTimer / 5 * 4, Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15);

        newRocket = new RocketWithPhysics(pos, vel, gravity, lifetime, size, colorStart, colorEnd, 
            particleAmount, 0, hierarchyMax, radius);
        rocketParticles[spawnIndex] = newRocket;
    }




    function trySpawnRocketParticle(rocketOriginal: RocketWithPhysics, index: number): void {
        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");

            let lifetime: number = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6)); // TODO: get value for this from user input

            let position: Vector = new Vector(0, 0);
            let velocity: Vector = new Vector(0, 0);

            let colorStart: string = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
            // let colorStart: string = (document.getElementById("startColor") as HTMLInputElement).value;
            let colorEnd: string = rocketOriginal.colorEnd;
            //let colorEnd: string = (document.getElementById("endColor") as HTMLInputElement).value;


            let size: number = rocketParticles[index].size * 0.5; // TODO: get value from user input
            let radius: number = rocketParticles[index].radius * 0.8; // TODO: get value from user input

            let particleAmount: number = rocketParticles[index].particleAmount;

            let newRocket: RocketWithPhysics;
            newRocket = new RocketWithPhysics(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.copyPosition(rocketParticles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            rocketParticles[spawnIndex] = newRocket;
        }
    }


    function GetFreeRocketSlot(): number {

        // console.log(rocketParticles.length);
        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) {// Rocket respawn problem here

                // console.log(i);
                return i;
            }
        }

        return -1;

    }
}    
