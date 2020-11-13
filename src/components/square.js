"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
var React = require("react");
var preserve_state_1 = require("../preserve_state");
function Square(props) {
    var _a;
    var _b = ['', function (s) { }], val = _b[0], setVal = _b[1];
    if (props.gameInProgress) {
        var key = JSON.stringify(props.id);
        _a = preserve_state_1.default(key, ''), val = _a[0], setVal = _a[1];
    }
    else {
        localStorage.clear();
    }
    return (React.createElement("button", { className: "square", id: props.type, onClick: function () { return setVal('X'); } }, val));
}
exports.Square = Square;
//# sourceMappingURL=square.js.map