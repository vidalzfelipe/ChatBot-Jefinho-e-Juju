import pandas as pd

# Leia o CSV sem cabeçalho
df = pd.read_csv('C:/Users/BA80793PS/Desktop/ChatBot/fonte_dados/FALE COM JEFINHO E JUJU.csv', header=None)

# Defina os cabeçalhos
df.columns = ['Palavra-Chave', 'Respostas']

# Crie uma nova lista para armazenar os resultados
resultados = []

# Itere pelas linhas do DataFrame original
for index, row in df.iterrows():
    # Verifique se a coluna 'Palavra-Chave' não é nula ou vazia
    if isinstance(row['Palavra-Chave'], str) and row['Palavra-Chave']:
        # Separe as palavras-chave por vírgula
        palavras = row['Palavra-Chave'].split(',')
        # Verifique se a coluna 'Respostas' é uma string ou se é nula
        resposta = row['Respostas'] if isinstance(row['Respostas'], str) else ''

        # Remova espaços em branco e crie uma nova linha para cada palavra
        for palavra in palavras:
            palavra_strip = palavra.strip()
            if palavra_strip:  # Adiciona uma verificação para ignorar palavras-chave vazias
                resultados.append({'Palavra-Chave': palavra_strip, 'Respostas': resposta.strip()})

# Crie um novo DataFrame a partir da lista de resultados
df_resultado = pd.DataFrame(resultados)

# Verifique se o DataFrame não está vazio antes de salvar
if not df_resultado.empty:
    df_resultado.to_csv('C:/Users/BA80793PS/Desktop/ChatBot/fonte_dados/FALE COM JEFINHO E JUJU.csv', index=False, encoding='utf-8')
    print('Arquivo FALE COM JEFINHO E JUJU.csv foi criado com sucesso!')
else:
    print('Nenhuma palavra-chave válida foi encontrada.')
