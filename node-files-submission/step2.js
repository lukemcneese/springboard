const arg = process.argv;
let path;
let out;
let type;
if (arg[2] === '--out'){
    out = arg[3];
    path = arg[4];
    type = arg[5];
}
else{
    path = arg[2]
    type = arg[3];
};

if (type == 'file'){
    console.log()
    const fs = require('fs');
    fs.readFile(path,'utf-8', (error,data) =>{
        if(error){
            console.log.error(error);
            process.exit(1);
        };
        output(data,out)
    });
}
else if (type == 'url'){
    console.log("processing a url")
    const axios = require('axios')
    axios.get(path)
      .then(response =>{
        output(response,out)
      })
      .catch(response =>{
        output(response,out)
      });
};

function output(data, out){
    if (out){
        fs.writeFile(out,data,'utf-8',error =>{
            if(error){
                console.log('Unable to write to file');
                console.log(error)
                process.exit(1);
            }
            else{
                console.log(data)
            }
        })
    }
}
