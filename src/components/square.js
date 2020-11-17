"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = exports.SquareSpace = void 0;
var React = require("react");
var square;
(function (square) {
    square[square["water"] = 0] = "water";
    square[square["ship"] = 1] = "ship";
})(square || (square = {}));
// hold on this but I think u get the point
var SquareSpace = /** @class */ (function () {
    function SquareSpace() {
    }
    SquareSpace.prototype.getMark = function () {
        if (this.marked) {
        }
    };
    return SquareSpace;
}());
exports.SquareSpace = SquareSpace;
function Square(props) {
    var mark = "";
    if (props.value == "hit" || props.value == "miss") {
        mark = "X";
    }
    return (React.createElement("button", { className: "square", id: props.value, onClick: function () { return props.onClick(); } }, mark));
}
exports.Square = Square;
//# sourceMappingURL=square.js.map