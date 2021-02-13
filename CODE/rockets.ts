namespace Rocket_Jam {
    
    export class RocketWithPhysics {
        
        public position: Vector;
        public velocity: Vector;

        public rotationValue: number; // Which way the rocket is heading

        public yGravity: number;

        public lifetime: number;
        public lifetimeMax: number;

        public size: number;
        public colorStart: string;
        public colorEnd: string;

        public colorCurrent: string;

        public shouldBeDestroyed: boolean;
        public canBeOverwritten: boolean;

        public hierarchy: number;
        public hierarchyMax: number; // The max number of subsequent explosions

        public radius: number;

        constructor(_position: Vector, _velocity: Vector, _yGravity: number, _lifetime: number, _size: number, _colorStart: string, _colorEnd: string, _hierachy: number, _hierarchyMax : number, _radius: number) {
            this.position = _position;
            this.velocity = _velocity;
            this.rotationValue = 0;
            this.yGravity = _yGravity;
            this.lifetime = _lifetime;
            this.lifetimeMax = _lifetime;
            this.size = _size;
            this.colorStart = _colorStart;
            this.colorEnd = _colorEnd;
            this.shouldBeDestroyed = false;
            this.canBeOverwritten = false;
            this.hierarchy = _hierachy;
            this.hierarchyMax = _hierarchyMax;
            this.radius = _radius;
        }

        // Calculate the new values for the next update frame thingy
        public copyPosition(_target: RocketWithPhysics): void {
            this.position = new Vector(_target.position.x, _target.position.y);

            this.velocity = new Vector(_target.velocity.x, _target.velocity.y);
        }


        //     // Calculate the new values for the next update frame thingy
        public calculateNewValue(timeElapsed: number, canvasWidth: number, canvasHeight: number): void {
            // this.xVelocity = this.xVelocity; // x velocity should stay the same

            this.velocity.y = this.velocity.y + (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time

            /*
            if((this.yPosition < 0 && this.yVelocity < 0) || (this.yPosition > canvasHeight || this.yVelocity > 0)) {
                this.yVelocity = this.yVelocity * -0.9;
            }

            if((this.xPosition < 0 && this.xVelocity < 0) || (this.xPosition > canvasWidth || this.xVelocity > 0)) {
                this.xVelocity = this.xVelocity * -0.9;
            }
            */

            this.position.x = Math.min(Math.max(this.position.x + this.velocity.x, 0), canvasWidth);
            this.position.y = Math.min(Math.max(this.position.y + this.velocity.y, 0), canvasHeight);

            // colorLerp();
            if (this.lifetime < 0) {
                this.shouldBeDestroyed = true;
            } else {
                this.lifetime = this.lifetime - (timeElapsed / 10000);
            }

            // console.log(this.xVelocity + " | " + this.yVelocity);
            /*else {
                console.log(this.lifetime);
            }*/
        }

 
        //    function colorLerp(_colorStart: string, _colorEnd: string, t: number): void {
        //   colorCurrent
        //          }
    }

    // GUI Date
    
}