
// (not actually a component)
// 3 different kinds ([], |, L) call (O, I, L)

// this was to test testing
export function sum(num1, num2) {
    return num1 + num2;
}

interface shipState {
    alive: boolean;
}

enum orientation {
    Vertical = 0,
    Horizontal = 1
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export class Ship {

    name: string;
    // "2D space" in which they reside
    space: Array<Array<number>>;
    height: number;
    width: number;

    constructor(name: string) {
        this.name = name;
    }

}

export class Ship_I extends Ship {

    or: orientation;

    constructor(name: string) {
        super(name);
        this.or = randInt(1);
        // space is dependent on orientation
        this.space = [
            [1],
            [1],
            [1],
            [1]
        ];
        // maybe a fn to calc these for each ship
        this.width = 1;
        this.height = 4;
    }
}

export class Ship_L extends Ship {
    // this one will have reflection
    reflected: boolean;
    or: orientation;

    constructor(name: string) {
        super(name);
        this.reflected = randInt(1) == 1;
        this.or = randInt(1);
        this.space = [
            // first 2 rows cond'n
            [1, 0],
            [1, 0],
            [1, 1],
        ];
        this.width = 2;
        this.height = 3;
    }
}

export class Ship_O extends Ship {
    constructor(name: string) {
        super(name);
        this.space = [
            [1, 1],
            [1, 1],
        ];
        this.width = 2;
        this.height = 2;
    }
}
