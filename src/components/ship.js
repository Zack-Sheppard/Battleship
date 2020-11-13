"use strict";
// (not actually a component)
// 3 different kinds ([], |, L) call (O, I, L)
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship_O = exports.Ship_L = exports.Ship_I = exports.Ship = exports.sum = void 0;
// this was to test testing
function sum(num1, num2) {
    return num1 + num2;
}
exports.sum = sum;
var orientation;
(function (orientation) {
    orientation[orientation["Vertical"] = 0] = "Vertical";
    orientation[orientation["Horizontal"] = 1] = "Horizontal";
})(orientation || (orientation = {}));
function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var Ship = /** @class */ (function () {
    function Ship(name) {
        this.name = name;
    }
    return Ship;
}());
exports.Ship = Ship;
var Ship_I = /** @class */ (function (_super) {
    __extends(Ship_I, _super);
    function Ship_I(name) {
        var _this = _super.call(this, name) || this;
        _this.or = randInt(1);
        // space is dependent on orientation
        _this.space = [
            [1],
            [1],
            [1],
            [1]
        ];
        // maybe a fn to calc these for each ship
        _this.width = 1;
        _this.height = 4;
        return _this;
    }
    return Ship_I;
}(Ship));
exports.Ship_I = Ship_I;
var Ship_L = /** @class */ (function (_super) {
    __extends(Ship_L, _super);
    function Ship_L(name) {
        var _this = _super.call(this, name) || this;
        _this.reflected = randInt(1) == 1;
        _this.or = randInt(1);
        _this.space = [
            // first 2 rows cond'n
            [1, 0],
            [1, 0],
            [1, 1],
        ];
        _this.width = 2;
        _this.height = 3;
        return _this;
    }
    return Ship_L;
}(Ship));
exports.Ship_L = Ship_L;
var Ship_O = /** @class */ (function (_super) {
    __extends(Ship_O, _super);
    function Ship_O(name) {
        var _this = _super.call(this, name) || this;
        _this.space = [
            [1, 1],
            [1, 1],
        ];
        _this.width = 2;
        _this.height = 2;
        return _this;
    }
    return Ship_O;
}(Ship));
exports.Ship_O = Ship_O;
//# sourceMappingURL=ship.js.map