
import * as React from 'react';
import { Square } from './square';

const size: number = 8;
const rows: number = size;
const cols: number = size;

interface MyProps {
    message: string;
    player: number;
    squares: Array<Array<string>>;
};

interface BoardState {
    s: any;
};

export default class Board extends React.Component<MyProps, BoardState> {
    constructor(props) {
        super(props);
        this.state = {
            s: []
        };
    }

    renderSquare(i, j) {
        const square_id = {
            player: this.props.player,
            x: i,
            y: j
        }

        let gameInProgress = true;
        if(this.props.message == "lobby") {
            gameInProgress = false;
        }
        return (
            <Square
                gameInProgress={gameInProgress}
                id={square_id}
                type={this.props.squares[i][j]}
            />
        );
    }

    renderRow(row) {
        return (
            <div className="board-row">
                {row}
            </div>
        );
    }

    render() {
        // board to view
        const board = new Array(size);
        for(let i = 0; i < cols; i++) {
            let row = new Array(size);
            for(let j = 0; j < rows; j++) {
                row[j] = this.renderSquare(i, j);
            }
            board[i] = this.renderRow(row);
        }

        return (
            <div className="game-board">
                {board}
            </div>
        );
    }
}
