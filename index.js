const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

wa.create({headless: true,chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']}).then(client => robo.enviarMensagem(client));