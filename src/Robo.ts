import { Client, Message } from "@open-wa/wa-automate";
import PalavrasReservadas from "./PalavrasReservadas";

class Robo {
    private usuarios: Array<string>;
    public palavrasReservadas: PalavrasReservadas;

    constructor(){
        this.usuarios = [];
        this.palavrasReservadas = new PalavrasReservadas();
    }

    /**
     * Adiciona o usuário na lista de usuários se não estiver
     * na lista.
     * @param idUsuario
     */
    private adicionarUsuario(idUsuario: string): void {
        const usuarioEncontrado = this.usuarios.find(usuario => usuario === idUsuario);

        if(!usuarioEncontrado){
            this.usuarios.push(idUsuario);
        }
    }

    private separarComando(mensagem: string): Array<string> { 
        return mensagem.split(" ");
    }

    private verificarPrefixo(mensagem: string): boolean {
        return mensagem.charAt(0) === this.palavrasReservadas.getPrefixo();
    }

    private verificarComando(comando: string): boolean {
        return this.palavrasReservadas[comando] != undefined;
    }

    /**
     * Responsável por ouvir as mensagens/comandos que o bot recebe.
     * @param client 
     */
    public ouvirMensagens(client: Client): void {
        client.onMessage(async (mensagem: Message) => {
            // Adiciona o usuário na lista de usuários se não estiver.
            this.adicionarUsuario(mensagem.from);

            // Captura o comando completo da legenda ou mensagem.
            const comandoCompleto: string = mensagem.caption || mensagem.body;

            const comandoSeparado: Array<string> = this.separarComando(comandoCompleto);
            const comando: string = comandoSeparado[0]; // Recebe !comando

            // Remove !comando ficando vazio ou com parâmetros.
            comandoSeparado.shift();
    
            // Verifica se o prefixo utilizado é o correto.
            const prefixoValido: boolean = this.verificarPrefixo(comando);
            if(prefixoValido){
                const comandoSemPrefixo = comando.slice(1,comando.length).toUpperCase();
                
                // Verifica se o comando existe nas palavras reservadas.
                const comandoExiste: boolean = this.verificarComando(comandoSemPrefixo);
                if(comandoExiste){
                    await this.palavrasReservadas[comandoSemPrefixo](client, mensagem, comandoSeparado); // Executa o comando.
                }
                else{
                    client.sendText(mensagem.from, "🚫 Comando inválido 🚫\nDigite *!Ajuda* para visualizar os comandos.");
                }
            }
        });
    }
}

export default Robo;