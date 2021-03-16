const wa = require("@open-wa/wa-automate");
import Robo from "./src/Robo";
const robo = new Robo();


wa.create({headless: true,chromiumArgs: ['--no-sandbox','--ignore-google-port-numbers']}).then(client => robo.ouvirMensagens(client));