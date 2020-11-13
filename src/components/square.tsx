
import * as React from 'react';
import PreserveState from "../preserve_state";

export function Square(props) {
    let [val, setVal] = ['', (s: string) => {}];
    if(props.gameInProgress) {
        const key = JSON.stringify(props.id);
        [val, setVal] = PreserveState(key, '');
    }
    else {
        localStorage.clear();
    }
    return (
        <button className="square" id={props.type} onClick={() => setVal('X')}>
            {val}
        </button>
    );
}
