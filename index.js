const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

wa.create().then(client => robo.enviarMensagem(client));
