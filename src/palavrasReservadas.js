const { decryptMedia } = require('@open-wa/wa-decrypt');
const wa = require('@open-wa/wa-automate');
const weather = require('weather-js');
const request = require('request');
const fs = require('fs');

require('dotenv/config');

async function getFundador(msg,cli){
    if(msg.isGroupMsg){
        Fundador =  msg.chat.groupMetadata.owner;
        await cli.sendTextWithMentions(msg.from, `Fundador Do Grupo : @${Fundador}`);
    }else{
        await cli.sendText(msg.from, "Este comando necessita que você e o fundador esteja em um grupo :(");
    }
}

/**
 * 
 * @param {Body} arquivo 
 */
function decodebase64(arquivo){
    // arquivo.().then(value => console.log(value));
    // var bytes = new Uint8Array(bitmap); // pass your byte response to this constructor

    // var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes

}

const params = {
    key: process.env.KEY,
    host: process.env.HOST
}

console.log(params.key);

const palavrasReservadas = {
    prefixo: "!",
    listaComandos: [
        {
            nome: "Add",
            descricao: "Adiciona um integrante do grupo(O bot precisa ser admin)!",
            exemplo: "!Add +55123456789"
        },
        {
            nome: "AnimFigurinha",
            descricao: "Cria uma figurinha animada do link enviado. Acesse www.giphy.com e copie e escolha um gif.(Funciona apenas nesse site)",
            exemplo: "!Animfigurinha https://media.giphy.com/media/p37zQEvmBhwLipmiqV/giphy.gif"
        },
        {
            nome: "Creditos",
            descricao: "Conheça quem são os responsáveis por me criarem =)",
            exemplo: "!Creditos"
        },
        {
            nome: "Fundador",
            descricao: "Mostra o criador do Grupo!",
            exemplo: "!Fundador"
        },
        {
            nome: "ImgFigurinha",
            descricao: "Transforma Imagem em Figurinha!",
            exemplo: "Envie uma foto e coloque como legenda o comando !ImgFigurinha"
        },
        {
            nome: "Kick",
            descricao: "Remove um integrante do grupo(O bot precisa ser admin)!",
            exemplo: "!kick @mention"
        },
        {
            nome: "Meme",
            descricao: "É enviado um Meme Aleatório!(Em Desenvolvimento)",
            exemplo: "!Meme"
        },
        {
            nome: "Mencionar Todos",
            descricao: "Menciona todos os membros do grupo.",
            exemplo: "!Mencionartodos"
        },
        {
            nome: "Temperatura",
            descricao: "Descubra a temperatura atual da sua cidade!",
            exemplo: "!Temperatura São Paulo"
        },
        {
            nome: "VidFigurinha",
            descricao: "Transforma Vídeo/Gif em Figurinha Animada!(Em Desenvolvimento)",
            exemplo: "Envie um vídeo/gif ou marque um vídeo/gif  do chat com o comando !VidFigurinha"
        },
        {
            nome: "YoutubeMP3",
            descricao: "Envia o link de download do video no youtube em formato MP3",
            exemplo: "Em breve..."
        }
    ],
    helpComandos: "",

    // Método ainda com alguns problemas.
    "ADD": async(client,mensagem,parametro)=>{
        // Verificar se o BOT é ADM e se o usuário que mandou a mensagem também é ADM.

        if(parametro!=null && mensagem.isGroupMsg){
            for(let i=0; i<parametro.length; i++){
                try{
                    // Preparando a ID do novo membro
                    const id = parametro[i] + "@c.us";
                    await client.addParticipant(mensagem.from, id).then(async adicionado =>{
                        if(adicionado){
                            await client.sendTextWithMentions(mensagem.from, `Bem vindo @${parametro[i]}`);
                        }else{
                            await client.sendText(mensagem.from, `O número *${parametro[i]}* não pode ser adicionado!`);
                        }
                    });
                   // await client.sendTextWithMentions(mensagem.from, `Bem vindo @${parametro[i]}`);
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

    "ANIMFIGURINHA": async(client,mensagem,parametro)=>{
        const STATUS_ARQUIVO_GRANDE = 413;
        for(let i=0; i<parametro.length; i++){
            let id = parametro[i].split('/')[4];
            console.log(id);
            try{
                const retorno = await client.sendGiphyAsSticker(mensagem.from, id);
                console.log(retorno.status);
                if(retorno.status==STATUS_ARQUIVO_GRANDE){
                    await client.sendText(mensagem.from,"Infelizmente o gif é muito grande para criar uma figurinha =(");

                }
            }catch(err){
                console.log(err);
                await client.sendText(mensagem.from,"Verifique se o gif é do site www.media.giphy.com.");
            }
        }
    },

    "CREDITOS": async(client,mensagem,parametro)=>{
        await client.sendText(mensagem.from, "Desenvolvido por: Herik Ramos & Marco Antônio Discord https://discord.gg/Y8vcyNEX28");
    },

    "FUNDADOR": async(client,mensagem,parametro)=>{
        await getFundador(mensagem,client);
    },

    "IMGFIGURINHA": async(client,mensagem,parametro)=>{
        console.log(mensagem.type);
        if(mensagem.type == "image"){
            console.log('Criando figurinha');
            await client.sendText(mensagem.from,"Trabalhando para fazer a figurinha =) , aguarde");
            const imagemDesencriptada = await decryptMedia(mensagem);
            const imagemNaBase64 = imagemDesencriptada.toString('base64');
            await client.sendImageAsSticker(mensagem.from,`data:${mensagem.mimetype};base64,${imagemNaBase64}`);
        }
    },

    "KICK": async(client,mensagem,parametro)=>{
        const ListaDeMensoes = mensagem.mentionedJidList;
        const GrupoDeAdmins = await client.getGroupAdmins(mensagem.chat.groupMetadata.id);
        const podeRemover = mensagem.isGroupMsg && await GrupoDeAdmins.includes(await client.getHostNumber() + '@c.us') && await GrupoDeAdmins.includes(mensagem.sender.id);

        //Verifica se está em um grupo / se é admin / se o bot é admin 
        if(podeRemover){
            for(let i=0; i<ListaDeMensoes.length; i++){
                //verifica se o usuário a ser removido não é um admin
                if(!await GrupoDeAdmins.includes(ListaDeMensoes[i])){
                    await client.sendTextWithMentions(mensagem.from,`@${ListaDeMensoes[i]} Cinzado bicho!`);
                    await client.removeParticipant(mensagem.from, ListaDeMensoes[i]);
                }else{
                    await client.sendTextWithMentions(mensagem.from,`@${mensagem.sender.id} Não pode remover o admin :)!`);
                }
            }
        }else{
            await client.sendTextWithMentions(mensagem.from,`@${mensagem.sender.id} não posso remover :( \n Requisitos(Esteja em um grupo, seja adm, dê adm para o bot)!`);
        }
    },

    /**
     * 
     * @param {wa.Client} client 
     * @param {wa.Message} mensagem 
     * @param {Array} paramentro 
     */
    "MENCIONARTODOS": async(client, mensagem, parametro)=>{
        const listaDeMembros = mensagem.chat.groupMetadata.participants;
        
        var mensagemPreparada = "|== MENCIONAR TODOS ==|\n";

        listaDeMembros.forEach(membro => {
            console.log(membro);
            const numero = membro.id.split('@c')[0];
            mensagemPreparada += `@${numero} \n`;
        });

        await client.sendTextWithMentions(mensagem.from, mensagemPreparada);
    },

    "TEMPERATURA": async(client,mensagem,parametro)=>{
        const cidade = parametro[0]; // Nome da cidade

        // Lista de emojis 4/?
        const emojis = {
            "Sunny": '🌤️',
            'Mostly Sunny': '☀️',
            'Cloudy': '⛅',
            'Mostly Cloudy': '☁️',
            'Rain': '🌧',
            'Snow': '❄'
        }

        // Configurações da busca
        const options = {
            search: cidade,
            degreeType: 'F'
        }
        
        // Realiza a busca e envia a mensagem com o resultado
        weather.find(options, async(err,result)=>{
            if(err){
                await client.sendText(mensagem.from, "Desculpe, essa cidade não está no meu banco de dados 😔");
            }
            else{
                const clima = result[0].current;
                console.log(clima.temperature + " " + emojis[clima.skytext]);
                const celsius = parseInt(5/9 * (parseInt(clima.temperature)-32));
                console.log(clima.skytext);
                
                await client.sendText(mensagem.from, `Temperatura em ${cidade}: ${emojis[clima.skytext]} ${celsius}°C`);
            }
        })

    },

    /**
     * 
     * @param {wa.Client} client 
     * @param {wa.Message} mensagem 
     * @param {Array} parametro 
     */
    "YOUTUBEMP3": async(client, mensagem, parametro)=>{
        if(mensagem.chat.isGroup){
            client.sendText(mensagem.from, "Não é possível realizar o Download em Grupos =(");
        }
        else{
            const parametro_dividido = parametro[0].split('/');
            var id_video = parametro_dividido[parametro_dividido.length-1];
    
            // Verifica se o link é o web.
            if(id_video.length > 11){
                id_video = id_video.split('v=')[1];
            }
        
            console.log(id_video);
    
            const options = {
                method: 'GET',
                url: 'https://youtube-to-mp32.p.rapidapi.com/yt_to_mp3',
                qs: {video_id: id_video},
                headers: {
                    'x-rapidapi-key': params.key,
                    'x-rapidapi-host': params.host,
                    useQueryString: true
                },
            };
    
            // Fazendo a requisição para API
            request(options, function (error, response, body) {
                if (error){
                    client.sendText(mensagem.from, "Não foi possível criar o link do vídeo =(");
                    throw new Error(error);
                }
    
                const resposta = JSON.parse(body);
                // client.sendText(mensagem.from,`Aqui está o link de download: ${resposta.Download_url}`);
                client.sendText(mensagem.from, 'Baixando música...');
                client.sendText(mensagem.from, `Se não quiser esperar ser enviado ou no caso de ser enviado um arquivo BIN, clique no link para baixar diretamente:${resposta.Download_url}` );
    
                client.sendFileFromUrl(mensagem.from, resposta.Download_url,'musica.mp3');
    
            });
        }

    },

}

for(let comando of palavrasReservadas.listaComandos){
    palavrasReservadas.helpComandos += `*${comando.nome}*\n${comando.descricao}\nComo usar: ${comando.exemplo}\n\n`;
}

module.exports = palavrasReservadas;