#!/usr/bin/env node

const fs =  require('fs');
const { exec } = require('child_process');

const EXEC_COMMAND = `node ${process.argv[2]}`
const debounce = (fn, ms) => {
    let debounced = false;
    return () => {
        if (debounced) {
            return;
        }
        fn();
        debounced = true;
        setTimeout(() => {
            debounced = false
        }, ms)
    }
}
const execFn = () => {
    exec(EXEC_COMMAND, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            process.exit(0);
        }
        if (stderr) {
            console.log(stderr);
            process.exit(0);
        }
        console.log(stdout);
    })
}
const debouncedExecFn = debounce(execFn, 3000);

debouncedExecFn();
fs.watch(`./${process.argv[2]}`, (event) => {
    if (event === 'change') {
        debouncedExecFn()
    } 
})

