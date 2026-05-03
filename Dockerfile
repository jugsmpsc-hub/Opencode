FROM debian:bullseye-slim

# Instala Node.js e npm
RUN apt-get update && apt-get install -y nodejs npm git curl

# Instala OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

# 3. Definir diretório de trabalho
WORKDIR /app

# 4. Copiar arquivos de dependências
COPY package.json ./

# 5. Instalar dependências (express, cors)
RUN npm install

# 6. Copiar código do servidor e interface
COPY server.js index.html ./

# 7. Railway expõe a porta via variável PORT
EXPOSE 3000

# 8. Rodar o servidor
CMD ["node", "server.js"]
