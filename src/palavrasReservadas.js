const palavrasReservadas = {
    prefixo: "!",
    listaComandos: [
        {
            nome: "Creditos",
            descricao: "Conheça quem são os responsáveis por me criarem =)",
            exemplo: "!Creditos"
        },
        {
            nome: "Enem",
            descricao: "Fique por dentro das novidades sobre o ENEM!",
            exemplo: "!Enem"
        }
    ],
    helpComandos: "",

    "AJUDA": async(client,mensagem)=>{

        await client.sendText(mensagem.from, `*LISTA DE COMANDOS*\n${palavrasReservadas.helpComandos}`);
    },

    "CREDITOS": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "Desenvolvido por: Herik Ramos & Marco Antônio");
    },

    "ENEM": async(client,mensagem)=>{
        await client.sendText(mensagem.from, "*O participante deve ingressar no local de prova entre 11h30 e 12h59. O portão fecha às 13h e o edital é claro: nenhuma pessoa pode entrar após este horário. Todos os participantes devem se dirigir para as suas salas de aplicação designadas no Cartão de Confirmação do Enem. A prova será iniciada às 13h30.*")
    }

}

for(let comando of palavrasReservadas.listaComandos){
    palavrasReservadas.helpComandos += `*${comando.nome}*\n${comando.descricao}\nComo usar: ${comando.exemplo}\n\n`;
}

module.exports = palavrasReservadas;