const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { loadKeywordsAndResponsesFromCSV } = require('./fonte.js'); // Importa a função do fonte.js

// Função para criar um delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Inicializa o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Armazenar as palavras-chave e respostas
let keywordsAndResponses = [];

// Carrega as palavras-chave assim que o script é iniciado
(async () => {
    try {
        keywordsAndResponses = await loadKeywordsAndResponsesFromCSV(); // Aguarda o carregamento
        //console.log('Palavras-chave carregadas:', JSON.stringify(keywordsAndResponses, null, 2));
    } catch (error) {
        //console.error('Erro ao carregar palavras-chave:', error);
    }
})();

// Evento de QR code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Evento que dispara quando o cliente está pronto
client.on('ready', () => {
    console.log('Tudo pronto,meu chapa!');
});

// Evento para lidar com as mensagens recebidas
client.on('message', async (message) => {
    const receivedMessage = message.body.toLowerCase().trim(); // Converte a mensagem para minúsculas e remove espaços extras
    let responseSent = false; // Variável para controlar se a resposta foi enviada

    // Percorre todas as palavras-chave e verifica se a mensagem recebida corresponde a alguma
    for (const entry of keywordsAndResponses) {
        for (const keyword of entry.keywords) {
            const normalizedKeyword = keyword.toLowerCase().trim(); // Normaliza a palavra-chave
            //console.log(`Verificando: "${normalizedKeyword}" na mensagem: "${receivedMessage}"`); // Debug
            if (receivedMessage === normalizedKeyword) { // Verifica igualdade
                await delay(3000); // delay de 3 segundos
                await message.reply(entry.response); // Envia a resposta correspondente
                responseSent = true; // Marca que uma resposta foi enviada
                break; // Sai do loop após enviar a resposta
            }
        }

        if (responseSent) break; // Para de verificar se a resposta já foi enviada
    }

    // Se a mensagem não corresponder a nenhuma palavra-chave
    if (!responseSent) {
        await delay(3000); // delay de 3 segundos
        await message.reply("Olá, sou a Juju 🙎🏽, atendente virtual da SJBA.\n\nSe quiser falar comigo, digite Ju.\n\nSe quiser falar com o atendente virtual do Juizado Especial Federal, digite JEF.\n\n🤷🏽‍♀️Não encontrou a informação que precisa? Sugira no formulário de avaliação https://forms.gle/YtRdy7jMzBQaM87n6\n\nObrigada!🥰"); // Mensagem de desculpa
    }
});

// Inicializa o cliente WhatsApp
client.initialize();
