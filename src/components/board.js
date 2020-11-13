"use strict";
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
var React = require("react");
var square_1 = require("./square");
var size = 8;
var rows = size;
var cols = size;
;
;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            s: []
        };
        return _this;
    }
    Board.prototype.renderSquare = function (i, j) {
        var square_id = {
            player: this.props.player,
            x: i,
            y: j
        };
        var gameInProgress = true;
        if (this.props.message == "lobby") {
            gameInProgress = false;
        }
        return (React.createElement(square_1.Square, { gameInProgress: gameInProgress, id: square_id, type: this.props.squares[i][j] }));
    };
    Board.prototype.renderRow = function (row) {
        return (React.createElement("div", { className: "board-row" }, row));
    };
    Board.prototype.render = function () {
        // board to view
        var board = new Array(size);
        for (var i = 0; i < cols; i++) {
            var row = new Array(size);
            for (var j = 0; j < rows; j++) {
                row[j] = this.renderSquare(i, j);
            }
            board[i] = this.renderRow(row);
        }
        return (React.createElement("div", { className: "game-board" }, board));
    };
    return Board;
}(React.Component));
exports.default = Board;
//# sourceMappingURL=board.js.map