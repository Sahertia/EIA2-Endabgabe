namespace Rocket_Jam {
    
    export class RocketWithPhysics {
        
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

        public hierarchy: number;

        public radius: number;

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


        //     // Calculate the new values for the next update frame thingy
        public calculateNewValue(timeElapsed: number, canvasWidth: number, canvasHeight: number): void {
            // this.xVelocity = this.xVelocity; // x velocity should stay the same

            this.yVelocity = this.yVelocity + (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time


            /*
            if((this.yPosition < 0 && this.yVelocity < 0) || (this.yPosition > canvasHeight || this.yVelocity > 0)) {
                this.yVelocity = this.yVelocity * -0.9;
            }

            if((this.xPosition < 0 && this.xVelocity < 0) || (this.xPosition > canvasWidth || this.xVelocity > 0)) {
                this.xVelocity = this.xVelocity * -0.9;
            }
            */

            this.yPosition = Math.min(Math.max(this.yPosition + this.yVelocity, 0), canvasHeight);
            this.xPosition = Math.min(Math.max(this.xPosition + this.xVelocity, 0), canvasWidth);

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