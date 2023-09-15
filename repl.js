// read evaluate print loop
const repl=require("repl");
const local=repl.start("node console started");

local.on('exit',() => {
    console.log('exiting REPL');
    process.exit();
});

