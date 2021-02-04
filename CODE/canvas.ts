namespace Firework_Canvas {
        // TODO: Wie importiert man die scripts richtig?
        // import RocketPhysics = Firework_Canvas.RocketWithPhysics;

        let rocketParticles: RocketWithPhysics[] = []; // TODO
        let maxRockets : number = 3000;

        let rocketsSpawm : number = 1;

        let rocketCascadeMax : number = 2;
        let rocketsPerCascade : number = 10;

        let updateTimer: number = 20;

        let ctx: CanvasRenderingContext2D;

        window.addEventListener("load", init);
        window.addEventListener("click", spawnSomeRockets);

        function init(): void {
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            if (!canvas)
                return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

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
                if(rocketParticles[i] == null)
                {
                    continue;
                } else if(rocketParticles[i].shouldBeDestroyed)
                {
                    // Can the rocket spawn sub particles?
                    if(rocketParticles[i] == null || rocketParticles[i].hierarchy < rocketCascadeMax && rocketParticles[i].canBeOverwritten == false) // TODO: let each rocket know how many hierarchies it has
                    {
                        for(let i : number = 0; i < rocketsPerCascade; i++)
                        {
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
                    
                    ctx.arc(rocketParticles[i].xPosition, rocketParticles[i].yPosition, 100 * rocketParticles[i].size, 0, 2 * Math.PI, false);
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

        function spawnSomeRockets() : void{
            // On start, spawn 5 rockets randomly
            for (let i: number = 0; i < rocketsSpawm; i++) {
                trySpawnRocketNew();
                // console.log(rocketParticles[i].size);
                // console.log(rocketParticles[i].xPosition);
            }
        }

        // Code to launch a new rocket
        function trySpawnRocketNew() : void
        {
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            if (!canvas)
                return;
            ctx = <CanvasRenderingContext2D>canvas.getContext("2d");


            let spawnIndex = GetFreeRocketSlot();
            if(spawnIndex == -1 || canvas == null)
            {
                return;
            }

            let newRocket : RocketWithPhysics;

            let xPos : number = Math.random() * canvas.width;
            let yPos : number = canvas.height; // TODO: check what canvas.height is

            let xVel : number = (Math.random() - 0.5) * 2 * 20000 / canvas.width; // How much sideways the rocket flies 
            let yVel : number = (Math.random() * (-5)) - 20000 / canvas.height; 
            // let yVel : number = (Math.random() * (-5)) - 100; 

            let lifetime : number = Math.random() * 0.05 + 0.025;

            // TODO: Get small/middle/large
            /*
            if()
            {

            }
            */
            let size : number = 0.5;

            let colorStart : string = "#000000";
            let colorEnd : string = "#ffffff";

            let radius : number = Math.random() * 3 + 1; // TODO: get value from user input

            newRocket = new RocketWithPhysics(xPos, yPos, xVel, yVel, 9.81, lifetime, size, colorStart, colorEnd, 0, radius);
            rocketParticles[spawnIndex] = newRocket;
        }

        function trySpawnRocketParticle(hierarchy : number, index : number) : void
        {
            let spawnIndex = GetFreeRocketSlot();
            if(spawnIndex == -1)
            {
                return;
            }

            let lifetime : number = Math.random() * 0.05 + 0.05; // TODO: get value for this from user input

            let colorStart : string = "#000000"; // TODO: change to cascade from main rocket
            let colorEnd : string = "#ffffff66";

            let radius : number = rocketParticles[index].size * 0.5; // TODO: get value from user input
            // let radius : number = Math.random() * 0.05 + 0.05; // TODO: get value from user input

            let newRocket : RocketWithPhysics;
            newRocket = new RocketWithPhysics(0, 0, 0, 0, 9.81/2, lifetime, radius, colorStart, colorEnd, hierarchy, radius);
            newRocket.copyPosition(rocketParticles[index]);
            newRocket.xVelocity += (Math.random() - 0.5) * 30;
            newRocket.yVelocity += (Math.random() - 0.5) * 30;
            rocketParticles[spawnIndex] = newRocket;
        }

        function GetFreeRocketSlot() : number
        {
            // console.log(rocketParticles.length);
            for(let i : number = 0; i < maxRockets; i++)
            {
                if(rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) // Rocket respawn problem here
                {
                    console.log(i);
                    return i;
                }
            }
            return -1;
        }

        class RocketWithPhysics {
            public xPosition: number;
            public yPosition: number;
    
            public xVelocity: number;
            public yVelocity: number;
    
            public rotationValue: number; // Which way the rocket is heading
    
            public yGravity: number;
    
            public lifetime: number;
    
            public size: number;
            public colorStart: string;
            public colorEnd: string;
    
            public colorCurrent: string;
    
            public shouldBeDestroyed: boolean;
            public canBeOverwritten: boolean;
    
            public hierarchy : number;
    
            public radius : number;
    
            constructor(_xPosition: number, _yPosition: number, _xVelocity: number, _yVelocity: number, _yGravity: number, _lifetime: number, _size: number, _colorStart: string, _colorEnd: string, _hierachy: number, _radius: number) {
                this.xPosition = _xPosition;
                this.yPosition = _yPosition;
                this.xVelocity = _xVelocity;
                this.yVelocity = _yVelocity;
                this.rotationValue = 0;
                this.yGravity = _yGravity;
                this.lifetime = _lifetime;
                this.size = _size;
                this.colorStart = _colorStart;
                this.colorEnd = _colorEnd;
                this.shouldBeDestroyed = false;
                this.canBeOverwritten = false;
                this.hierarchy = _hierachy;
                this.radius = _radius;
            }
            
            // Calculate the new values for the next update frame thingy
            public copyPosition(_target: RocketWithPhysics): void {
                this.xPosition = _target.xPosition;
                this.yPosition = _target.yPosition;
    
                this.xVelocity = _target.xVelocity;
                this.yVelocity = _target.yVelocity;
            }
    
    
            // Calculate the new values for the next update frame thingy
            public calculateNewValue(timeElapsed: number, canvasWidth: number, canvasHeigth: number): void {
                // this.xVelocity = this.xVelocity; // x velocity should stay the same

                this.yVelocity = this.yVelocity + (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time
                this.xPosition = Math.min(Math.max(this.xPosition + this.xVelocity, 0), canvasWidth);
                this.yPosition = Math.min(Math.max(this.yPosition + this.yVelocity, 0), canvasHeigth);
                //  // colorLerp();
                if(this.lifetime < 0)
                {
                    this.shouldBeDestroyed = true;
                } else {
                    this.lifetime = this.lifetime - (timeElapsed / 10000);
                }
                /*else {
                    console.log(this.lifetime);
                }*/
            }
    
            /*
            function colorLerp(_colorStart: string, _colorEnd: string, t: number): void {
                colorCurrent
            }
            */
        }    
    
}