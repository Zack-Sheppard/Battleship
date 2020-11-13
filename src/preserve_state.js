"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/*
    Author: selbekk:
    using code from dev.to tutorial
*/
function preserveState(key, defaultValue) {
    var _a = React.useState(JSON.parse(localStorage.getItem(key)) || defaultValue), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}
exports.default = preserveState;
//# sourceMappingURL=preserve_state.js.map