#!/usr/bin/env node

const fs =  require('fs');
const { exec } = require('child_process');

const EXEC_COMMAND = `node ${process.argv[2]}`;

const debounce = (fn, ms) => {
    let debounced = false;
    return () => {
        if (debounced) {
            return;
        };
        fn();
        debounced = true;
        setTimeout(() => {
            debounced = false
        }, ms);
    };
};
const execFn = () => {
    const execProcess = exec(EXEC_COMMAND);
    execProcess.stdout.pipe(process.stdout);
    execProcess.stderr.pipe(process.stderr);
};
const debouncedExecFn = debounce(execFn, 3000);

debouncedExecFn();
fs.watch(`./${process.argv[2]}`, (event) => {
    if (event === 'change') {
        debouncedExecFn();
    }; 
});
