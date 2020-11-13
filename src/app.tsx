
// Battleship Game - SMART interview project
// Author - Zack Sheppard

import * as React from 'react';
import Board from './components/board';
import { Ship, Ship_I, Ship_L, Ship_O } from './components/ship';
import PreserveState from "./preserve_state";

const size: number = 8;
const rows = size;
const cols = size;

interface MyProps {
    message: string;
    update: any;
};

interface GameState {
    board1: Array<Array<string>>;
    board2: Array<Array<string>>;
    p1Turn: boolean;
};

class Game extends React.Component<MyProps, GameState> {
    constructor(props) {
        super(props);
        this.resetBoards();
    }

    updateGameState(gs: string) {
        this.props.update(gs);
    }

    resetBoards() {
        // fill boards with "water" first
        const arr1 = new Array<Array<string>>(cols).fill(null);
        for(let i = 0; i < cols; i++) {
            arr1[i] = new Array<string>(rows).fill("water");
        }
        const arr2 = new Array<Array<string>>(cols).fill(null);
        for(let i = 0; i < cols; i++) {
            arr2[i] = new Array<string>(rows).fill("water");
        }
        this.state = {
            board1: arr1,
            board2: arr2,
            p1Turn: true
        };
        this.populateShips = this.populateShips.bind(this);
        this.populateShips(this.state.board1);
        this.populateShips(this.state.board2);
    }

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
                    if(board[x + i][y + j] !== "water") {
                        overlappingShip = true;
                    }
                }
            }
        }

        // fill
        for(let i = 0; i < ship.height; i++) {
            for(let j = 0; j < ship.width; j++) {
                if(ship.space[i][j]) {
                    // this only throws error for 0-3
                    board[x + i][y + j] = ship.name;
                }
            }
        }
    };

    populateShips = (board) => {
        this.addShip(board, new Ship_I("I1"));
        this.addShip(board, new Ship_I("I2"));
        this.addShip(board, new Ship_O("O1"));
        this.addShip(board, new Ship_L("L1"));
    };

    // calculateWinner() {}

    render() {
        if(this.props.message == "lobby") {
            this.resetBoards();
        }
        const b1 = this.state.board1;
        const b2 = this.state.board2;
        return (
          <div className="game">
              <Board message={this.props.message} player={0} squares={b1}/>
              <Board message={this.props.message} player={1} squares={b2}/>
              <div className="game-info">
                  <div>{/* status */}</div>
                  <ol>{/* TODO */}</ol>
              </div>
              <div>
                  <button onClick={() => this.updateGameState("game")}>
                      Start
                  </button>
                  <button onClick={() => this.updateGameState("lobby")}>
                      Restart?
                  </button>
              </div>
          </div>
        );
    }
}

export default function App() {
    const [game, setGame] = PreserveState("game", "lobby");
    return (
        <Game message={game} update={setGame}/>
    );
}
