"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    class RocketWithPhysics {
        constructor(_position, _velocity, _yGravity, _lifetime, _size, _colorStart, _colorEnd, _particleAmount, _hierachy, _hierarchyMax, _radius) {
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
            this.particleAmount = _particleAmount;
            this.hierarchy = _hierachy;
            this.hierarchyMax = _hierarchyMax;
            this.radius = _radius;
        }
        // Calculate the new values for the next update frame thingy
        copyPosition(_target) {
            this.position = new Rocket_Jam.Vector(_target.position.x, _target.position.y);
            this.velocity = new Rocket_Jam.Vector(_target.velocity.x, _target.velocity.y);
        }
        //     // Calculate the new values for the next update frame thingy
        calculateNewValue(timeElapsed, canvasWidth, canvasHeight) {
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
            }
            else {
                this.lifetime = this.lifetime - (timeElapsed / 10000);
            }
            // console.log(this.xVelocity + " | " + this.yVelocity);
            /*else {
                console.log(this.lifetime);
            }*/
        }
    }
    Rocket_Jam.RocketWithPhysics = RocketWithPhysics;
    // GUI Date
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=rockets.js.map