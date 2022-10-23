/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");
const process = require("process");

function generateText(text){
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function makeFileText(path){
    fs.readFile(path,'utf8', (err,data) =>{
        if (err){
            console.error("Cannot read file");
            console.error(err);
            process.exit(1);
        }
        else{
            generateText(data);
        }
    });
}

async function makeURLText(url){
    let resp;
    try{
        resp = await axios.get(url);
    }
    catch (err){
        console.error("Cannot read url");
        console.error(err)
        process.exit(1);
    }
}

let [method, path] = process.argv.slice(2);

if (method === "file"){
    makeFileText(path)
}
else if (method === "url"){
    makeURLText(path);
}