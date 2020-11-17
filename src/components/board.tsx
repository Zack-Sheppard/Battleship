
import * as React from 'react';
import { Square } from './square';

const size: number = 8;
const rows: number = size;
const cols: number = size;

interface BoardProps {
    turn: boolean;
    onClick: any;
    squares: Array<Array<string>>;
};

interface BoardState {
    s: any;
};

export default class Board extends React.Component<BoardProps, BoardState> {
    constructor(props) {
        super(props);
        this.state = {
            s: []
        };
    }

    renderSquare(i: number, j: number) {
        return (
            <Square
                value={this.props.squares[i][j]}
                onClick={() => {if(this.props.turn) {
                                    this.props.onClick(i, j);
                                }
                }}
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
        const board = new Array<any>(size);
        for(let i = 0; i < rows; i++) {
            let row = new Array<any>(size);
            for(let j = 0; j < cols; j++) {
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
