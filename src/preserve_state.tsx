
import * as React from 'react';

/* 
    Author: selbekk:
    using code from dev.to tutorial
*/
export default function preserveState(key, defaultValue) {
    const [state, setState] = React.useState(
        JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    React.useEffect(
        () => 
            {
                localStorage.setItem(key, JSON.stringify(state));
            }, 
        [key, state]
    );
    return [state, setState];
}
