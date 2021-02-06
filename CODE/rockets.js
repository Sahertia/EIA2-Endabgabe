"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    class RocketWithPhysics {
        constructor(_xPosition, _yPosition, _xVelocity, _yVelocity, _yGravity, _lifetime, _size, _colorStart, _colorEnd, _hierachy, _radius) {
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
        copyPosition(_target) {
            this.xPosition = _target.xPosition;
            this.yPosition = _target.yPosition;
            this.xVelocity = _target.xVelocity;
            this.yVelocity = _target.yVelocity;
        }
        //     // Calculate the new values for the next update frame thingy
        calculateNewValue(timeElapsed, canvasWidth, canvasHeigth) {
            // this.xVelocity = this.xVelocity; // x velocity should stay the same
            this.yVelocity = this.yVelocity + (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time
            this.xPosition = Math.min(Math.max(this.xPosition + this.xVelocity, 0), canvasWidth);
            this.yPosition = Math.min(Math.max(this.yPosition + this.yVelocity, 0), canvasHeigth);
            // colorLerp();
            if (this.lifetime < 0) {
                this.shouldBeDestroyed = true;
            }
            else {
                this.lifetime = this.lifetime - (timeElapsed / 10000);
            }
            /*else {
                console.log(this.lifetime);
            }*/
        }
    }
    Rocket_Jam.RocketWithPhysics = RocketWithPhysics;
    // GUI Date
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=rockets.js.map