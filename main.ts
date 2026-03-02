import { startREPL } from "./repl.js"
import { initState } from "./state.js";



function main() {
    let state = initState()
    try {
        startREPL(state);
    } catch (err) {
        console.error(err)
    }

}

main();
