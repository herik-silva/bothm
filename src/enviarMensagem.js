const palavrasReservadas = require('./palavrasReservadas');

// Envia a mensagem de acordo com a palavra reservada

module.exports = function enviarMensagem(client){
    client.onMessage(async mensagem =>{
        const comando = mensagem.body;
        
        const palavraReservada = comando.split(palavrasReservadas.prefixo)[1].toUpperCase();

        console.log(palavraReservada);

        const prefixoCorreto = palavrasReservadas.prefixo == comando.charAt(0);
        const comandoExiste = palavrasReservadas[palavraReservada] != undefined;

        console.log("Resultado do teste logico: " + prefixoCorreto + " && " + comandoExiste);
        
        if(comandoExiste && prefixoCorreto){
            console.log(palavraReservada);

            palavrasReservadas[palavraReservada](client,mensagem);
        }
    });
}