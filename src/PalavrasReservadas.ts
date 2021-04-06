import { Client, Message, decryptMedia } from "@open-wa/wa-automate";
import fs from "fs";
import request from "request";
import resizeImg from "resize-img";

class PalavrasReservadas {
    private prefixo: string = "!";
    private comandoAjuda: string = "";

    constructor(){
        const comandos = JSON.parse(fs.readFileSync(__dirname+"/../comandos.json",{encoding: "utf-8"}));
        
        for(const comando of comandos.comandos){
            this.comandoAjuda += `*${comando.nome}*\n${comando.descricao}\nComo usar: ${comando.exemplo}\n\n`
        }
    }

    getPrefixo(): string {
        return this.prefixo;
    }

    setPrefixo(novoPrefixo: string) {
        this.prefixo = novoPrefixo;
    }

    async AJUDA(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        await client.sendText(mensagem.from, this.comandoAjuda);
    }

    async CLIMA(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        const cidade = parametros.join(" ");

        console.log("Cidade: ", cidade);

        const options = {
            method: 'GET',
            url: 'https://apibothm.herokuapp.com/clima/' + cidade
        }

        request(options, async(error, response, body)=>{
            console.log(body);
            const clima = JSON.parse(body);
            const mensagemClima = `==========Info Clima==========\nCidade: 🏙️ *${cidade}*\nTemperatura: 🌡️ ${clima.temperatura}°C\nProbabilidade de Chuva: 🌧️ ${clima.probabilidadeChuva}\nUmidade: 💧 ${clima.umidade}\nVelocidade do Vento: 🌬️ ${clima.velocidadeVento}\n===========================`;
            if(response.statusCode==200){
                await client.sendText(mensagem.from, mensagemClima);
            }
            else{
                await client.sendText(mensagem.from, "Cidade não encontrada!");
            }
        });
    }

    async COTACAO(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        const [moedaBase, moedaFinal] = parametros;
        console.log(`Moeda Base: ${moedaBase}\nMoeda Final: ${moedaFinal}`);

        // Configurações para acessar a API.
        const options = {
            method: 'GET',
            url: 'https://apibothm.herokuapp.com/moeda',
            qs: {
                moedaBase: moedaBase,
                moedaFinal: moedaFinal
            }
        }

        // Realiza a requisição na API de Cotação Monetária.
        request(options, async(error, response, body)=>{
            console.log(body);

            const moeda = JSON.parse(body);
            const mensagemMoeda = `💸====Cotação Monetária====💸\n${moeda.valorMoedaBase} ${moeda.moedaBase} igual a\n*${moeda.valorMoedaFinal} ${moeda.moedaFinal}*\n${moeda.ultimaAtualizacao}\n💸=======================💸`;
            if(response.statusCode==200){
                await client.sendText(mensagem.from, mensagemMoeda);
            }
            else{
                await client.sendText(mensagem.from, "Moeda não encontrada.");
            }
        });
    }

    async DESENVOLVEDORES(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        await client.sendText(mensagem.from, "Desenvolvido por Herik Ramos e Marco Antônio!");
    }

    async PARAIMAGEM(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        const mensagemSelecionada: Message = mensagem.quotedMsg;

        const imagem: Buffer = await decryptMedia(mensagemSelecionada);
        const imagemBase64: string = imagem.toString("base64");
        const imagemPreparada: string = `data:image/gif;base64,${imagemBase64}`;

        await client.sendImage(mensagem.from, imagemPreparada, "imagem",":D");
    }

    async TESTE(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        console.log("Testando -> ", __dirname);
        const imagem: Buffer = fs.readFileSync(__dirname+"/imagem.png");
        console.log(imagem);
        const imagemRedimensionada: Buffer = await resizeImg(imagem, {width: 550, height: 550});
        const imagemBase64: string = imagemRedimensionada.toString("base64");
        const imagemPreparada: string = `data:image/png;base64,${imagemBase64}`;

        await client.sendMp4AsSticker(mensagem.from, imagemPreparada);
    }

    /**
     * Menciona todos os membros do grupo. É possível passar uma
     * mensagem.
     * @param client 
     * @param mensagem 
     * @param parametros 
     */
    async MENCIONARTODOS(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        // Se existir parametros, serão juntadas em uma única string.
        const msgEnviada: string = parametros != null ? parametros.join(' ') : null;

        // Pegando a lista de membros do grupo.
        const listaDeMembros: any = mensagem.chat.groupMetadata.participants;
        
        var mensagemPreparada: string = "|== MENCIONAR TODOS ==|\n";

        // Juntando todos os membros para mencioná-los.
        listaDeMembros.forEach((membro: any)=>{
            const numero: string = membro.id.split('@c')[0];
            mensagemPreparada += `@${numero} \n`;
        });

        // Verifica se foi enviada uma mensagem. Se sim, então insira na resposta do bot.
        if(msgEnviada != null){
            mensagemPreparada += `\nMensagem de @${mensagem.author} para todos: ${msgEnviada}`;
        }

        // Enviando mensagem.
        await client.sendTextWithMentions(mensagem.from, mensagemPreparada);
    }

    async STICKER(client: Client, mensagem: Message, parametros: Array<string>): Promise<void> {
        await client.sendText(mensagem.from,"Aguarde um pouco, estou fazendo sua figurinha 😉");

        const mensagemSelecionada: Message = mensagem.quotedMsg || mensagem;
        console.log(mensagemSelecionada);
        // Imagem decriptada
        if(mensagemSelecionada.type == "image"){
            console.log("Imagem")
            const imagem: Buffer = await decryptMedia(mensagemSelecionada);
            const imagemRedimensionada: Buffer = await resizeImg(imagem, { width: 550, height: 550});
    
            const imagemBase64: string = imagemRedimensionada.toString("base64");
            const imagemPreparada: string = `data:${mensagemSelecionada.mimetype};base64,${imagemBase64}`;
    
            await client.sendImageAsSticker(mensagem.from, imagemPreparada);
        }
        else if(mensagemSelecionada.type == "video"){
            console.log("Vídeo")
            const imagem: Buffer = await decryptMedia(mensagemSelecionada);
            const imagemRedimensionada: Buffer = await resizeImg(imagem, { width: 550, height: 550});
    
            const imagemBase64: string = imagemRedimensionada.toString("base64");
            const imagemPreparada: string = `data:${mensagemSelecionada.mimetype};base64,${imagemBase64}`;
    
            await client.sendMp4AsSticker(mensagem.from, imagemPreparada);
        }
    }
}

export default PalavrasReservadas;