module.exports = {
    prefixo: "!",

    "CRIADORES": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Criado por: Herik Ramos & Marco Antônio");
    },
    "AJUDA": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Olá");
    },
    "TUDO BEM": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Tudo e com vc?");
    },
}