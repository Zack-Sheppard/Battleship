
import * as React from 'react';

enum square {
    water = 0,
    ship,
}

// hold on this
export class SquareSpace {
    marked: boolean;
    type: square;

    getMark() {
        if(this.marked) {

        }
    }
}

export function Square(props) {
    let mark = "";
    if(props.value == "hit" || props.value == "miss") {
        mark = "X";
    }
    return (
        <button 
            className="square"
            id={props.value}
            onClick={() => props.onClick()}
        >
            {mark}
        </button>
    );
}
