async function getFundador(msg,cli){
    if(msg.isGroupMsg){
        Fundador =  msg.chat.groupMetadata.owner;
        await cli.sendTextWithMentions(msg.from, `Fundador Do Grupo : @${Fundador}`);
    }else{
        await cli.sendText(msg.from, "Este comando necessita que você e o fundador esteja em um grupo :(");
    }
}

const palavrasReservadas = {
    prefixo: "!",
    listaComandos: [
        {
            nome: "Add",
            descricao: "Adiciona um integrante do grupo(O bot precisa ser admin)!",
            exemplo: "!Add +55123456789"
        },
        {
            nome: "Creditos",
            descricao: "Conheça quem são os responsáveis por me criarem =)",
            exemplo: "!Creditos"
        },
        {
            nome: "Enem",
            descricao: "Fique por dentro das novidades sobre o ENEM!",
            exemplo: "!Enem"
        },
        {
            nome: "Fundador",
            descricao: "Mostra o criador do Grupo!",
            exemplo: "!Fundador"
        },
        {
            nome: "ImgFigurinha",
            descricao: "Transforma Imagem em Figurinha!",
            exemplo: "Envie uma foto ou marque uma imagem do chat com o comando !ImgFigurinha"
        },
        {
            nome: "Kick",
            descricao: "Remove um integrante do grupo(O bot precisa ser admin)!",
            exemplo: "!kick +55123456789"
        },
        {
            nome: "Meme",
            descricao: "É enviado um Meme Aleatório!",
            exemplo: "!Meme"
        },
        {
            nome: "VidFigurinha",
            descricao: "Transforma Vídeo/Gif em Figurinha Animada!",
            exemplo: "Envie um vídeo/gif ou marque um vídeo/gif  do chat com o comando !VidFigurinha"
        },
    ],
    helpComandos: "",

    "ADD": async(client,mensagem,parametro)=>{
        // Verificar se o BOT é ADM e se o usuário que mandou a mensagem também é ADM.

        if(parametro!=null && mensagem.isGroupMsg){
            for(let i=0; i<parametro.length; i++){
                try{
                    // Preparando a ID do novo membro
                    const id = parametro[i] + "@c.us";
                    
                    await client.addParticipant(mensagem.from, id);
                    await client.sendTextWithMentions(mensagem.from, `Bem vindo @${parametro[i]}`);
                }catch(err){
                    console.log("ERRO: " + err);
                    await client.sendText(mensagem.from, `O número *${parametro[i]}* não pode ser adicionado!`);
                }
            }
        }
        else{
            console.log("Sem parametros ou não veio de um grupo!");
            await client.sendText(mensagem.from, `Esse comando requer parâmetros. Ex: ${palavrasReservadas.listaComandos[0].exemplo}`);
        }
    },

    "AJUDA": async(client,mensagem,parametro)=>{
        await client.sendText(mensagem.from, `*LISTA DE COMANDOS*\n${palavrasReservadas.helpComandos}`);
    },

    "CREDITOS": async(client,mensagem,parametro)=>{
        await client.sendText(mensagem.from, "Desenvolvido por: Herik Ramos & Marco Antônio");
    },

    "ENEM": async(client,mensagem,parametro)=>{
        await client.sendText(mensagem.from, "*O participante deve ingressar no local de prova entre 11h30 e 12h59. O portão fecha às 13h e o edital é claro: nenhuma pessoa pode entrar após este horário. Todos os participantes devem se dirigir para as suas salas de aplicação designadas no Cartão de Confirmação do Enem. A prova será iniciada às 13h30.*")
    },

    "FUNDADOR": async(client,mensagem,parametro)=>{
        await getFundador(mensagem,client);
    },

}

for(let comando of palavrasReservadas.listaComandos){
    palavrasReservadas.helpComandos += `*${comando.nome}*\n${comando.descricao}\nComo usar: ${comando.exemplo}\n\n`;
}

module.exports = palavrasReservadas;