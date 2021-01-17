const wa = require('@open-wa/wa-automate');
const palavrasReservadas = require('./palavrasReservadas');

// Envia a mensagem de acordo com a palavra reservada
/**
 * 
 * @param {wa.Client} client 
 */
module.exports = function enviarMensagem(client){
    client.group
    client.onMessage(async mensagem =>{
        console.log(client.getGroupInfo(mensagem.chatId).then((value)=>{console.log(value)}));
        console.log(typeof mensagem);
        const palavraReservada = comando.split(palavrasReservadas.prefixo)[1].toUpperCase();

        const prefixoCorreto = palavrasReservadas.prefixo == comando.charAt(0);
        const comandoExiste = palavrasReservadas[palavraReservada] != undefined;
        
        if(comandoExiste && prefixoCorreto){
            palavrasReservadas[palavraReservada](client,mensagem);
        }
        else{
            await client.sendText(mensagem.from, "Comando inválido.\nPara visualizar os comandos existentes digite *!ajuda*");
        }
    });
}