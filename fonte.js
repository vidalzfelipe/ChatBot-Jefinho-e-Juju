const fs = require('fs');
const csv = require('csv-parser');

async function loadKeywordsAndResponsesFromCSV() {
    const data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('C:/Users/BA80793PS/Desktop/ChatBot/fonte_dados/FALE COM JEFINHO E JUJU.csv')
            .pipe(csv({ headers: false })) // headers: false para que as linhas sejam arrays
            .on('data', (row) => {
                const keywords = row[0]; // Pega o primeiro valor
                const response = row[1]; // Pega o segundo valor

                if (keywords && response) {
                    const keywordsArray = keywords.split(',')
                        .map(k => k.trim())
                        .filter(k => k);

                    if (keywordsArray.length > 0) {
                        data.push({ keywords: keywordsArray, response });
                    }
                }
            })
            .on('end', () => {
                console.log('Palavras-chave e respostas carregadas!');
                resolve(data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = {
    loadKeywordsAndResponsesFromCSV
};
