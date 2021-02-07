const wa = require('@open-wa/wa-automate');

const robo = {
    enviarMensagem: require('./src/enviarMensagem'),
}

wa.create({headless: true, executablePath:'/home/sagar/workplace/scraping-demo/node_modules/puppeteer/.local-chromium/linux-599821/chrome-linux/chrome',chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']}).then(client => robo.enviarMensagem(client));