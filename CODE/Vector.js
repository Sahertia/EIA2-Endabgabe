"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Rocket_Jam.Vector = Vector;
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=Vector.js.map