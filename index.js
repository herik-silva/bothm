const wa = require('@open-wa/wa-automate');
const start = require('./src/start');

wa.create().then(client => start(client,"Mensagem de teste"));