const palavrasReservadas = require('./palavrasReservadas');

module.exports = function enviarMensagem(client){
    const usuarios = [];
    client.onMessage(async mensagem =>{
        const usuarioEncontrado = usuarios.find(usuario => usuario == mensagem.from) || null;
        if(usuarioEncontrado == null){
            console.log("Adicionado o usuario: " + mensagem.from);
            usuarios.push(mensagem.from);
            palavrasReservadas.usuarios(usuarios);
        }

        const comandoCompleto = mensagem.caption || mensagem.body; // Caso caption estiver vazio, pegará o body.
        const prefixoCorreto = palavrasReservadas.comandos.prefixo == comandoCompleto.charAt(0);

        if(prefixoCorreto){
            const comando = comandoCompleto.split(" ");
            // comando[0] -> !comando | comando[1...N] -> parametro

            // Pega somente a palavra reservada já em caixa alta
            const palavraReservada = comando[0].split(palavrasReservadas.comandos.prefixo)[1].toUpperCase();
            
            // Verifica se o comando existe nas palavras reservadas
            const comandoExiste = palavrasReservadas.comandos[palavraReservada] != undefined;
            if(comandoExiste){
                var parametros = null;

                // Verifica se no comando existe parâmetros.
                if(comando.length > 1){
                    parametros = [];
                    for(let i=1; i<comando.length; i++){
                        parametros.push(comando[i]);
                    }
                }
                
                console.log(palavrasReservadas.comandos[palavraReservada]);
                palavrasReservadas.comandos[palavraReservada](client,mensagem,parametros);
            }
            else{
                await client.sendText(mensagem.from, "Comando inválido.\nPara visualizar os comandos existentes digite *!ajuda*");
            }
        }
    });
}