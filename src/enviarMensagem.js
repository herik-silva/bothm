const palavrasReservadas = require('./palavrasReservadas');

module.exports = function enviarMensagem(client){
    client.onMessage(async mensagem =>{
        var parametros = null;

        const comando = mensagem.body.split(" ");
        // comando[0] -> !comando | comando[1...N] -> parametro

        const palavraReservada = comando[0].split(palavrasReservadas.prefixo)[1].toUpperCase();

        // Verifica se o comando existe parâmetros.
        if(comando.length > 1){
            parametros = [];
            for(let i=1; i<comando.length; i++){
                parametros.push(comando[i]);
            }
        }

        console.log(parametros);
        
        const prefixoCorreto = palavrasReservadas.prefixo == comando[0].charAt(0);
        const comandoExiste = palavrasReservadas[palavraReservada] != undefined;

        console.log(palavraReservada);

        if(comandoExiste && prefixoCorreto){
            palavrasReservadas[palavraReservada](client,mensagem,parametros);
        }
        else{
            await client.sendText(mensagem.from, "Comando inválido.\nPara visualizar os comandos existentes digite *!ajuda*");
        }
    });
}