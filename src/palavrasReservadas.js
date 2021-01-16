module.exports = {
    "Hello": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Olá");
    },
    "Tudo Bem": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Tudo e com vc?");
    }
}