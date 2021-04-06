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
});

wa.create({headless: true, executablePath: process.env.CHROME_PATH, chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers', '--disable-setuid-sandbox']}).then(client => robo.ouvirMensagens(client));