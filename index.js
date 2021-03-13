const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

const path = `${__dirname}/node_modules/puppeteer/.local-chromium/linux-818858/chrome-linux/chrome`

wa.create({headless: true, executablePath: path,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.enviarMensagem(client));