import { Client, Message } from "@open-wa/wa-automate";
import fs from "fs";
import request from "request";

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
                await client.sendText(mensagem.from, "Cidade não encontrada!\nTente adicionar o estado após o nome da cidade\nExemplo: !clima Salgado, SE");
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
            const mensagemMoeda = `💸====Cotação Monetária====💸\n${moeda.valorMoedaBase} ${moeda.moedaBase} igual a\n*${moeda.valorMoedaFinal} ${moeda.moedaFinal}*\n${moeda.ultimaAtualizacao}💸=========================💸`;
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
}

export default PalavrasReservadas;