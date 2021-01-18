const palavrasReservadas = require('./palavrasReservadas');

module.exports = function enviarMensagem(client){
    client.onMessage(async mensagem =>{
        if(mensagem.type != "image"){
            console.log(mensagem.type);
            const prefixoCorreto = palavrasReservadas.prefixo == mensagem.body.charAt(0);
            if(prefixoCorreto){
                const comando = mensagem.body.split(" ");
                // comando[0] -> !comando | comando[1...N] -> parametro

                const palavraReservada = comando[0].split(palavrasReservadas.prefixo)[1].toUpperCase();
                
                const comandoExiste = palavrasReservadas[palavraReservada] != undefined;
                
                if(comandoExiste){
                    var parametros = null;

                    // Verifica se no comando existe parâmetros.
                    if(comando.length > 1){
                        parametros = [];
                        for(let i=1; i<comando.length; i++){
                            parametros.push(comando[i]);
                        }
                    }

                    palavrasReservadas[palavraReservada](client,mensagem,parametros);
                }
                else{
                    await client.sendText(mensagem.from, "Comando inválido.\nPara visualizar os comandos existentes digite *!ajuda*");
                }
            }
        }else{
            console.log(mensagem.type);
            const prefixoCorreto = palavrasReservadas.prefixo == mensagem.caption.charAt(0);
            if(prefixoCorreto){
                const comando = mensagem.caption.split(" ");
                // comando[0] -> !comando | comando[1...N] -> parametro

                const palavraReservada = comando[0].split(palavrasReservadas.prefixo)[1].toUpperCase();
                
                const comandoExiste = palavrasReservadas[palavraReservada] != undefined;
                
                if(comandoExiste){
                    var parametros = null;

                    // Verifica se no comando existe parâmetros.
                    if(comando.length > 1){
                        parametros = [];
                        for(let i=1; i<comando.length; i++){
                            parametros.push(comando[i]);
                        }
                    }
                    console.log(palavrasReservadas[palavraReservada]);
                    palavrasReservadas[palavraReservada](client,mensagem,parametros);
                }
                else{
                    await client.sendText(mensagem.from, "Comando inválido.\nPara visualizar os comandos existentes digite *!ajuda*");
                }
            }
        }
    });
}