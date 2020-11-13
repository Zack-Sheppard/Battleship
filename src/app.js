"use strict";
// Battleship Game - SMART interview project
// Author - Zack Sheppard
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
var board_1 = require("./components/board");
var ship_1 = require("./components/ship");
var preserve_state_1 = require("./preserve_state");
var size = 8;
var rows = size;
var cols = size;
;
;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        // Randomly adds ship to board
        _this.addShip = function (board, ship) {
            var overlappingShip = true;
            var x = 0;
            var y = 0;
            while (overlappingShip) {
                x = Math.floor(Math.random() * Math.floor(size - ship.width));
                y = Math.floor(Math.random() * Math.floor(size - ship.height));
                overlappingShip = false;
                // check
                for (var i = 0; i < ship.height; i++) {
                    for (var j = 0; j < ship.width; j++) {
                        if (board[x + i][y + j] !== "water") {
                            overlappingShip = true;
                        }
                    }
                }
            }
            // fill
            for (var i = 0; i < ship.height; i++) {
                for (var j = 0; j < ship.width; j++) {
                    if (ship.space[i][j]) {
                        // this only throws error for 0-3
                        board[x + i][y + j] = ship.name;
                    }
                }
            }
        };
        _this.populateShips = function (board) {
            _this.addShip(board, new ship_1.Ship_I("I1"));
            _this.addShip(board, new ship_1.Ship_I("I2"));
            _this.addShip(board, new ship_1.Ship_O("O1"));
            _this.addShip(board, new ship_1.Ship_L("L1"));
        };
        _this.resetBoards();
        return _this;
    }
    Game.prototype.updateGameState = function (gs) {
        this.props.update(gs);
    };
    Game.prototype.resetBoards = function () {
        // fill boards with "water" first
        var arr1 = new Array(cols).fill(null);
        for (var i = 0; i < cols; i++) {
            arr1[i] = new Array(rows).fill("water");
        }
        var arr2 = new Array(cols).fill(null);
        for (var i = 0; i < cols; i++) {
            arr2[i] = new Array(rows).fill("water");
        }
        this.state = {
            board1: arr1,
            board2: arr2,
            p1Turn: true
        };
        this.populateShips = this.populateShips.bind(this);
        this.populateShips(this.state.board1);
        this.populateShips(this.state.board2);
    };
    // renderBoard(player) {}
    // calculateWinner() {}
    Game.prototype.render = function () {
        var _this = this;
        if (this.props.message == "lobby") {
            this.resetBoards();
        }
        var b1 = this.state.board1;
        var b2 = this.state.board2;
        return (React.createElement("div", { className: "game" },
            React.createElement(board_1.default, { message: this.props.message, player: 0, squares: b1 }),
            React.createElement(board_1.default, { message: this.props.message, player: 1, squares: b2 }),
            React.createElement("div", { className: "game-info" },
                React.createElement("div", null),
                React.createElement("ol", null)),
            React.createElement("div", null,
                React.createElement("button", { onClick: function () { return _this.updateGameState("game"); } }, "Start"),
                React.createElement("button", { onClick: function () { return _this.updateGameState("lobby"); } }, "Restart?"))));
    };
    return Game;
}(React.Component));
function App() {
    var _a = preserve_state_1.default("game", "lobby"), game = _a[0], setGame = _a[1];
    return (React.createElement(Game, { message: game, update: setGame }));
}
exports.default = App;
//# sourceMappingURL=app.js.map