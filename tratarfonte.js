const fs = require('fs');
const csv = require('csv-parser');

// Cria um array para armazenar os resultados
const resultados = [];

// Lê o arquivo CSV
fs.createReadStream('C:/Users/BA80793PS/Desktop/ChatBot/fonte_dados/FALE COM JEFINHO E JUJU.csv')
  .pipe(csv({ headers: false })) // Sem cabeçalho
  .on('data', (row) => {
    // Separa as palavras-chave
    const palavras = row[0].split(',').map(p => p.trim());
    const resposta = row[1].trim(); // Certifique-se de que a resposta esteja limpa

    // Adiciona uma nova entrada para cada palavra-chave, mantendo a resposta intacta
    palavras.forEach(palavra => {
      resultados.push({ 'Palavra-Chave': palavra, 'Respostas': resposta });
    });
  })
  .on('end', () => {
    // Cria um CSV a partir dos resultados
    const csvResultado = resultados
      .map(r => `${r['Palavra-Chave']},${r['Respostas']}`)
      .join('\n');

    // Escreve o novo CSV em um arquivo
    fs.writeFileSync('resultado.csv', 'Palavra-Chave,Respostas\n' + csvResultado);
    console.log('Arquivo resultado.csv foi criado com sucesso!');
  });
