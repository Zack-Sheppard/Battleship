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
// enum for gameViews: lobby, inGame, victory
// for now just string
var defaultScene = {
    view: "lobby",
    p0Turn: true,
    boards: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []]
    ]
};
;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.populateShips = function (board) {
            // add const ship names, or something better
            _this.addShip(board, new ship_1.Ship_I("I1"));
            _this.addShip(board, new ship_1.Ship_I("I2"));
            _this.addShip(board, new ship_1.Ship_O("O1"));
            _this.addShip(board, new ship_1.Ship_L("L1"));
        };
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
                        if (board[y + i][x + j] !== "water") {
                            overlappingShip = true;
                        }
                    }
                }
            }
            // fill
            for (var i = 0; i < ship.height; i++) {
                for (var j = 0; j < ship.width; j++) {
                    if (ship.space[i][j]) {
                        board[y + i][x + j] = ship.name;
                    }
                }
            }
        };
        if (props.scene.view == "lobby") {
            // rebuild board if loaded from lobby view
            _this.resetBoards(props.scene);
            props.setScene(props.scene);
        }
        _this.state = {
            message: "Welcome to Battleship!"
        };
        return _this;
    }
    Game.prototype.getScene = function () {
        var scene = {
            view: this.props.scene.view,
            p0Turn: this.props.scene.p0Turn,
            boards: [this.props.scene.boards[0], this.props.scene.boards[1]]
        };
        return scene;
    };
    //setScene(s: Scene) is a built in Game property
    Game.prototype.updateScene = function (params) {
        // todo
    };
    // pass in scene, sets two new boards in that scene
    Game.prototype.resetBoards = function (curr) {
        var p0_board = [[], [], [], [], [], [], [], []];
        var p1_board = [[], [], [], [], [], [], [], []];
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                p0_board[i][j] = "water";
                p1_board[i][j] = "water";
            }
        }
        this.populateShips(p0_board);
        this.populateShips(p1_board);
        curr.boards = [p0_board, p1_board];
    };
    Game.prototype.checkWinner = function (board) {
        var win = true;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (board[i][j] != "water" &&
                    board[i][j] != "miss" &&
                    board[i][j] != "hit") {
                    win = false;
                }
            }
        }
        // return something
    };
    Game.prototype.buttonToggle = function () {
        var curr = this.getScene();
        if (curr.view == "lobby") {
            curr.view = "game";
        }
        else {
            localStorage.clear();
            this.resetBoards(curr);
            curr.view = "lobby";
            curr.p0Turn = true;
        }
        this.props.setScene(curr);
    };
    Game.prototype.switchTurn = function (curr) {
        curr.p0Turn = !curr.p0Turn;
        this.props.setScene(curr);
    };
    Game.prototype.updateBoard = function (curr, bNum, i, j) {
        var sq = curr.boards[bNum][i][j];
        var val = "";
        if (sq == "hit" || sq == "miss") {
            val = sq;
        }
        // turn changes here:
        else {
            this.switchTurn(curr);
            if (sq == "water") {
                val = "miss";
            }
            else {
                val = "hit";
            }
        }
        curr.boards[bNum][i][j] = val;
    };
    Game.prototype.handleClick = function (boardNumber, i, j) {
        var curr = this.getScene();
        // update board more like update game/scene hehe
        this.updateBoard(curr, boardNumber, i, j);
        // check if ship sunk
        // get val from checkWinner
        this.checkWinner(curr.boards[boardNumber]);
        this.props.setScene(curr);
    };
    //renderBoards() // (there are two)
    Game.prototype.render = function () {
        var _this = this;
        // Render current scene
        var curr = this.getScene();
        return (React.createElement("div", { className: "game" },
            React.createElement("div", { className: "boards", id: curr.view },
                React.createElement(board_1.default, { turn: !curr.p0Turn, onClick: function (i, j) { return _this.handleClick(0, i, j); }, squares: curr.boards[0] }),
                React.createElement(board_1.default, { turn: curr.p0Turn, onClick: function (i, j) { return _this.handleClick(1, i, j); }, squares: curr.boards[1] })),
            React.createElement("div", { className: "game-info" },
                React.createElement("div", null, this.state.message),
                React.createElement("ol", null)),
            React.createElement("div", null,
                React.createElement("button", { onClick: function () { return _this.buttonToggle(); } }, curr.view == "lobby" ? "Start" : "Restart"))));
    };
    return Game;
}(React.Component));
function App() {
    var _a = preserve_state_1.default("game", defaultScene), scene = _a[0], setScene = _a[1];
    return (React.createElement(Game, { scene: scene, setScene: setScene }));
}
exports.default = App;
//# sourceMappingURL=app.js.map