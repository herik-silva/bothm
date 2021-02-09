const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

const express = require('express');
const app = express();
const http = require('http').createServer(app);


app.use(express.static(__dirname+"/page/"));

app.get('/', (req,res)=>{
    res.sendFile(`index.html`)
})

http.listen(process.env.PORT, ()=>{
    console.log("Rodando...");
})

const path = `${__dirname}/node_modules/puppeteer/.local-chromium/linux-818858/chrome-linux/chrome`

wa.create({headless: true, executablePath: path,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.enviarMensagem(client));