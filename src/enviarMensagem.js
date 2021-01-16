const palavrasReservadas = require('./palavrasReservadas');

// Envia a mensagem de acordo com a palavra reservada
module.exports = function enviarMensagem(client){
    client.onMessage(async mensagem =>{
        if(palavrasReservadas[mensagem.body] != undefined){
            palavrasReservadas[mensagem.body](client,mensagem);
        }
    });
}