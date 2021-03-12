const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

wa.create({chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.enviarMensagem(client)).catch(err => console.log(err));