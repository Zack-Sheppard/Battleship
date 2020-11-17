
// Battleship Game - SMART interview project
// Author - Zack Sheppard

import * as React from 'react';
import Board from './components/board';
import { Ship, Ship_I, Ship_L, Ship_O } from './components/ship';
import PreserveState from "./preserve_state";

const size: number = 8;
const rows = size;
const cols = size;

// ship name consts?
// 2D array of ships kind of overkill
// but pretty optimal

interface GameProps {
    scene: Scene
    setScene: any;
};

interface Scene {
    view: string,
    p0Turn: boolean,
    boards: Array<Array<Array<string>>>;
}

// enum for gameViews: lobby, inGame, victory
// for now just string

const defaultScene: Scene = {
    view: "lobby",
    p0Turn: true,
    boards: [ 
        [ [],[],[],[],[],[],[],[] ], 
        [ [],[],[],[],[],[],[],[] ] 
    ]
}

interface GameState {
    message: string;
};

class Game extends React.Component<GameProps, GameState> {
    constructor(props) {
        super(props);
        if(props.scene.view == "lobby") {
            // rebuild board if loaded from lobby view
            this.resetBoards(props.scene);
            props.setScene(props.scene);
        }
        this.state = {
            message: "Welcome to Battleship!"
        };
    }

    getScene() {
        const scene: Scene = {
            view: this.props.scene.view,
            p0Turn: this.props.scene.p0Turn,
            boards: [this.props.scene.boards[0], this.props.scene.boards[1]]
        }
        return scene;
    }

    //setScene(s: Scene) is a built in Game property

    updateScene(params) {
        // todo
    }

    // pass in scene, sets two new boards in that scene
    resetBoards(curr: Scene) {
        const p0_board = [ [], [], [], [], [], [], [], [] ];
        const p1_board = [ [], [], [], [], [], [], [], [] ];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                p0_board[i][j] = "water";
                p1_board[i][j] = "water";
            }
        }
        this.populateShips(p0_board);
        this.populateShips(p1_board);
        curr.boards = [p0_board, p1_board];
    }

    populateShips = (board) => {
        // add const ship names, or something better
        this.addShip(board, new Ship_I("I1"));
        this.addShip(board, new Ship_I("I2"));
        this.addShip(board, new Ship_O("O1"));
        this.addShip(board, new Ship_L("L1"));
    };

    // Randomly adds ship to board
    addShip = (board, ship: Ship) => {
        let overlappingShip: boolean = true;
        let x: number = 0;
        let y: number = 0;
        while(overlappingShip) {
            x = Math.floor(Math.random() * Math.floor(size - ship.width));
            y = Math.floor(Math.random() * Math.floor(size - ship.height));
            overlappingShip = false;
            // check
            for(let i = 0; i < ship.height; i++) {
                for(let j = 0; j < ship.width; j++) {
                    if(board[y + i][x + j] !== "water") {
                        overlappingShip = true;
                    }
                }
            }
        }
        // fill
        for(let i = 0; i < ship.height; i++) {
            for(let j = 0; j < ship.width; j++) {
                if(ship.space[i][j]) {
                    board[y + i][x + j] = ship.name;
                }
            }
        }
    };

    playerWon(oppBoard) {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if(oppBoard[i][j] != "water" && 
                    oppBoard[i][j] != "miss" && 
                    oppBoard[i][j] != "hit") {
                    return false;
                }
            }
        }
        return true;
    }

    buttonToggle() {
        const curr: Scene = this.getScene();
        if(curr.view == "lobby") {
            curr.view = "game";  
        }
        else {
            localStorage.clear();
            this.resetBoards(curr);
            curr.view = "lobby";
            curr.p0Turn = true;
            this.setState({message: "Welcome back!"});
        }
        this.props.setScene(curr);
    }

    switchTurn(curr) {
        curr.p0Turn = !curr.p0Turn;
        this.props.setScene(curr); 
    }

    updateBoard(curr, bNum, i: number, j: number) {
        const sq = curr.boards[bNum][i][j];
        let val = "";
        if(sq == "hit" || sq == "miss") {
            val = sq;
        }
        // turn changes here:
        else {
            this.switchTurn(curr);
            if(sq == "water") {
                val = "miss";
            }
            else {
                val = "hit";
            }
        }
        curr.boards[bNum][i][j] = val;
    }

    //victoryScreen() //etc

    handleClick(boardNumber: number, i: number, j: number) {
        let curr = this.getScene();
        this.updateBoard(curr, boardNumber, i, j);
        // check if ship sunk
        if(this.playerWon(curr.boards[boardNumber])) {
            let winner = "";
            if(boardNumber === 0) {
                winner = "1";
            }
            else if(boardNumber === 1) {
                winner = "0";
            }
            this.setState({message: `Player ${winner} wins!`});
        }
        this.props.setScene(curr); 
    }

    //renderBoards() // (there are two)

    render() {
        // Render current scene
        const curr = this.getScene();
        return (
            <div className="game">
                <div className="boards" id={curr.view}>
                    <Board
                        turn={!curr.p0Turn}
                        onClick={(i, j) => this.handleClick(0, i, j)}
                        squares={curr.boards[0]}
                    />
                    <Board
                        turn={curr.p0Turn}
                        onClick={(i, j) => this.handleClick(1, i, j)}
                        squares={curr.boards[1]}
                    />
                </div>
                <div className="game-info">
                    <div>{this.state.message}</div>
                    <div className="stats">{/* todo */}</div>
                </div>
                <div className="button">
                    <button onClick={() => this.buttonToggle()}>
                        {curr.view == "lobby" ? "Start": "Restart"}
                    </button>
                </div>
            </div>
        );
    }
}

export default function App() {
    const [scene, setScene] = PreserveState("game", defaultScene);
    return (
        <Game scene={scene} setScene={setScene}/>
    );
}
