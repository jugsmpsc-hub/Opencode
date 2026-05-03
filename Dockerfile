# Usa a imagem oficial do OpenCode
FROM ghcr.io/anomalyco/opencode:latest

# Instala Node.js para rodar o servidor
RUN apt-get update && apt-get install -y nodejs npm

# Copia arquivos do servidor
WORKDIR /app
COPY package.json server.js ./
RUN npm install

# Porta exposta
EXPOSE 3000

# Comando de inicialização
CMD ["node", "server.js"]