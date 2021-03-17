import { Client, Message, NonSerializedId } from "@open-wa/wa-automate";
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
            const mensagemClima = `Clima em *${cidade}*\nTemperatura: ${clima.temperatura}°C\nProbabilidade de Chuva: ${clima.probabilidadeChuva}\nUmidade: ${clima.umidade}\nVentos em: ${clima.velocidadeVento}`;
            if(response.statusCode==200){
                await client.sendText(mensagem.from, mensagemClima);
            }
            else{
                await client.sendText(mensagem.from, "Cidade não encontrada!\nTente adicionar o estado após o nome da cidade\nExemplo: !clima Salgado, SE");
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