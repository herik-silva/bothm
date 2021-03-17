const wa = require("@open-wa/wa-automate");
import Robo from "./Robo";
const robo = new Robo();

const express = require('express');
const app = express();
const http = require('http').createServer(app);

console.log(__dirname);
app.use(express.static(__dirname+"/../page/"));

app.get('/', (req,res)=>{
    res.sendFile(`index.html`)
})

http.listen(process.env.PORT || 3000, ()=>{
    console.log("Rodando...");
})

function ping(){
    const request = require("request");
    
    const options = {
        method: 'GET',
        url: 'https://bothm.herokuapp.com',
    };

    const optionsApi = {
        method: 'GET',
        url: 'https://apibothm.herokuapp.com/'
    }
    
    console.log("Rodando");
    
    request(options, function(error, response, body){
        console.log("Requisição Bot");
    });

    request(optionsApi, function(error, response, body){
        console.log("API Requisição");
    });
    
    setInterval(()=>{
        request(options, function(error, response, body){
            console.log("Requisição feita!");

            request(optionsApi, function(error, response, body){
                console.log("API Requisição");
            });
        });
    },1750000);
}

ping();

const path = `${__dirname}/../node_modules/puppeteer/.local-chromium/linux-818858/chrome-linux/chrome`;

wa.create({headless: true,executablePath: path,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.ouvirMensagens(client));