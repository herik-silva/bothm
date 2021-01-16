module.exports = {
    prefixo: "!",

    "AJUDA": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Olá");
    },
    "CRIADORES": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Criado por: Herik Ramos & Marco Antônio");
    },
    "TUDO BEM": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Tudo e com vc?");
    },
}