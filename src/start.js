module.exports = function start(client,resposta){
    client.onMessage(async mensagem =>{
        if(mensagem.body == 'Hi'){
            await client.sendText(mensagem.from, resposta);
        }
    });
}