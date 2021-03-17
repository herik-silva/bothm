const wa = require("@open-wa/wa-automate");
import Robo from "./Robo";
const robo = new Robo();

function ping(){
    const request = require("request");
    
    const options = {
        method: 'GET',
        url: 'https://bothm.herokuapp.com',
    };
    
    console.log("Rodando");
    
    request(options, function(error, response, body){
        console.log(body);
    });
    
    setInterval(()=>{
        request(options, function(error, response, body){
            console.log("Requisição feita!")
        });
    },1750000);
}

ping();


wa.create({headless: true,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.ouvirMensagens(client));