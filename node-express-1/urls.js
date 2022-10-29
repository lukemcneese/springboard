const arg = process.argv;
const fs = require('fs');
const axios = require('axios');

let urls = [];

fs.readFile(arg[2],'utf-8', (error,data) =>{
    if(error){
        console.log.error(error);
        process.exit(1);
    };
    readURLS(data.toString().split("\n"));
});


function readURLS(urls){
    for (const url of urls){
        axios.get(url)
            .then(response =>{
                data = response.data
                writeFile(url,data)
            })
            .catch(response =>{
                console.log(`Couldn't downlaod ${url}`)
            });
    };
}


function writeFile(filename,data){
    filename = removeHttp(filename)
    filename = getBaseURL(filename)
    fs.writeFile(`${filename}.txt`,data,{encoding:'utf-8',flag:"w+"},error =>{
        if(error){
            console.log('Unable to write to file');
            //console.log(error)
        }
        else{
            console.log(`Wrote to ${filename}`)
        }
    });
}
//https://bobbyhadz.com/blog/javascript-remove-http-https-from-url#:~:text=To%20remove%20http%3A%2F%2F%20or,http%3A%2F%2F%20part%20is%20removed.&text=Copied!
function removeHttp(url) {
    if (url.startsWith('https://')) {
      const https = 'https://';
      return url.slice(https.length);
    }
  
    if (url.startsWith('http://')) {
      const http = 'http://';
      return url.slice(http.length);
    }
  
    return url;
  }
function getBaseURL(url){
    if(url.indexOf('/') != -1){
        return url.substring(0,url.indexOf('/'))
    }
    return url
}