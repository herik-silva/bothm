const palavrasReservadas = require('./palavrasReservadas');

// Envia a mensagem de acordo com a palavra reservada
module.exports = function enviarMensagem(client){
    client.onMessage(async mensagem =>{
        
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