const wa = require("@open-wa/wa-automate");
import Robo from "./Robo";
const robo = new Robo();

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


wa.create({headless: true,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.ouvirMensagens(client));