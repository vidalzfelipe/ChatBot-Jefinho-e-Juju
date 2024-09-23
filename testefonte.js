const { loadKeywordsAndResponsesFromXLSX } = require('./fonte.js');

(async () => {
    try {
        const keywordsAndResponses = await loadKeywordsAndResponsesFromXLSX();
        console.log('Dados carregados com sucesso:');
        console.log(keywordsAndResponses);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
})();
