/*
namespace Firework_Canvas {
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
            public calculateNewValue(timeElapsed: number): void {
                // this.xVelocity = this.xVelocity; // x velocity should stay the same
                this.yVelocity = this.yVelocity - (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time
                // colorLerp();
                this.lifetime = this.lifetime - (timeElapsed / 1000);
                if(this.lifetime < 0)
                {
                    this.shouldBeDestroyed = true;
                }
            }

            /*
            function colorLerp(_colorStart: string, _colorEnd: string, t: number): void {
                colorCurrent
            }
            */

            /*
            public drawRocket(ctx : CanvasRenderingContext2D): void {
                ctx.beginPath();
                ctx.fillRect(this.xPosition, this.yPosition, 20, 100);
                let rotationValue: number = Math.sin(this.xVelocity / this.yVelocity);
                ctx.rotate(rotationValue);
                ctx.fillStyle = this.colorCurrent;
                ctx.closePath();
                ctx.stroke();
            }
        }
   }
}
*/