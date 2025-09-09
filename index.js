const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { loadKeywordsAndResponsesFromCSV } = require('./fonte.js');
const { registrarInteracao, registrarKeyword, registrarResposta } = require('./estatistica.js');

console.log('[index] estatistica.js path =', require.resolve('./estatistica.js'));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const DEFAULT_REPLY =
  "Olá, sou a Juju 🙎🏽, atendente virtual da SJBA.\n\n" +
  "Se quiser falar comigo, digite Ju.\n\n" +
  "Se quiser falar com o atendente virtual do Juizado Especial Federal, digite JEF.\n\n" +
  "🤷🏽‍♀️Não encontrou a informação que precisa? Sugira no formulário de avaliação https://forms.gle/YtRdy7jMzBQaM87n6\n\n" +
  "Obrigada!🥰";

const client = new Client({ authStrategy: new LocalAuth() });

let keywordsAndResponses = [];

(async () => {
  try {
    keywordsAndResponses = await loadKeywordsAndResponsesFromCSV();
    console.log(`[index] CSV carregado: ${keywordsAndResponses.length} entradas`);
  } catch (error) {
    console.error('Erro ao carregar palavras-chave:', error);
  }
})();

client.on('qr', (qr) => { qrcode.generate(qr, { small: true }); });
client.on('ready', () => { console.log('Tudo pronto,meu chapa!'); });

client.on('message', async (message) => {
  registrarInteracao(message.from);

  const receivedMessage = String(message.body || '').toLowerCase().trim();
  let responseSent = false;

  try {
    if (message.hasQuotedMsg) {
      const quotedMsg = await message.getQuotedMessage().catch(() => null);


      registrarResposta(DEFAULT_REPLY, { userId: message.from, keyword: null });
      console.log('[index] registrarResposta -> DEFAULT_REPLY (quoted)');

      if (quotedMsg) {
        await message.reply(DEFAULT_REPLY, quotedMsg.id._serialized);
      } else {
        await message.reply(DEFAULT_REPLY);
      }
      responseSent = true;

    } else {
      for (const entry of keywordsAndResponses) {
        const kws = Array.isArray(entry.keywords) ? entry.keywords : [];
        for (const keyword of kws) {
          const normalizedKeyword = String(keyword || '').toLowerCase().trim();
          if (normalizedKeyword && receivedMessage.includes(normalizedKeyword)) {

            await delay(2000);

            registrarKeyword(normalizedKeyword);
            registrarResposta(entry.response, { userId: message.from, keyword: normalizedKeyword });
            console.log('[index] registrarKeyword ->', normalizedKeyword);
            console.log('[index] registrarResposta -> CSV');

            await message.reply(entry.response);

            responseSent = true;
            await delay(2000);
            break;
          }
        }
        if (responseSent) break;
      }
    }

    if (!responseSent) {
      await delay(3500);

      registrarResposta(DEFAULT_REPLY, { userId: message.from, keyword: null });
      console.log('[index] registrarResposta -> DEFAULT_REPLY (fallback)');

      await message.reply(DEFAULT_REPLY);
    }
  } catch (error) {
    console.error('Erro ao obter a mensagem citada ou ao enviar a resposta:', error);
  }
});

client.initialize();
