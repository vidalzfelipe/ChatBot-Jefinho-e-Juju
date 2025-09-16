# ChatBot Jefinho e Juju

Este é um bot de WhatsApp simples, desenvolvido usando a biblioteca [whatsapp-web.js](https://docs.wwebjs.dev/) para responder automaticamente a mensagens baseadas em um arquivo CSV com palavras-chave e respostas predefinidas.

## 📋 Requisitos

- **Node.js** (versão 16 ou superior)
- Conexão com **WhatsApp Web** (através do [whatsapp-web.js](https://docs.wwebjs.dev/)))
- **Celular** disponível para autenticar a conexão
- *(Opcional)* **WhatsApp Business** para utilização do telefone fixo do JEF

## 📦 Dependências

Este projeto utiliza as seguintes bibliotecas:

- [whatsapp-web.js](https://docs.wwebjs.dev/) – Comunicação com o WhatsApp
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) – Geração de QR code para login
- [csv-parser](https://www.npmjs.com/package/csv-parser) – Leitura das palavras-chave e respostas do arquivo CSV
- [puppeteer](https://github.com/puppeteer/puppeteer) – Automação via navegador (caso necessário)
- [exceljs](https://github.com/exceljs/exceljs) e [xlsx](https://github.com/SheetJS/js-xlsx) – Manipulação de planilhas (se aplicável)

## 🗂 Estrutura de Arquivos

A estrutura do projeto é a seguinte:

   ├── index.js # Arquivo principal que inicializa o bot

   ├── fonte.js # Script para carregar a base de conhecimento (CSV) 

   ├── package.json # Definição das dependências do projeto 

   ├── etl_jefinho_juju.py # Script para tratar a base de dados (se necessário) 

   └── fonte_dados/ # Diretório contendo o arquivo CSV com as palavras-chave e respostas

## ⚙️ Como Rodar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/vidalzfelipe/ChatBot-Jefinho-e-Juju.git
   cd ChatBot-Jefinho-e-Juju

2. **Instale as dependências:**
    ```bash
    npm install

3. **Inicie o bot:**
    ```bash
    node index.js

4. **Autenticação no WhatsApp:**
   - Ao iniciar o bot, um QR Code será gerado.
   - Escaneie o código com o WhatsApp no seu celular para autenticar a conexão.

## 🔄 Fluxo de Funcionamento
  1 - O bot carrega as palavras-chave e respostas do arquivo CSV.
  
  2 - O usuário envia uma mensagem no WhatsApp.
  
  3 - O bot verifica se há uma resposta correspondente no CSV.
  
  4 - Se encontrar uma resposta, ele responde automaticamente.
  
  5 - Se não encontrar uma resposta, ele envia uma mensagem padrão informando como interagir.

## 📈 Armazenamento de Dados
  A base de conhecimento do bot, contendo as palavras-chave e respostas, é armazenada em um arquivo CSV.

## 🔗 Links

- [ChatBOT Juju e Jefinho](http://wa.me/557136164656)


