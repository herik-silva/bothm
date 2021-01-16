module.exports = function start(client,resposta){
    client.onMessage(async mensagem =>{
        await client.sendText(mensagem.from, resposta);
    });
}