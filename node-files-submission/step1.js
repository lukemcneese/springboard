const arg = process.argv;
const fs = require('fs');
fs.readFile(arg[2],'utf-8', (error,data) =>{
    if(error){
        console.log.error(error);
        process.exit(1);
    };
    console.log(data);
});
