# Usamos Node 20 como base (mais estável e já vem com npm/curl/git)
FROM node:20-bullseye

# Evita prompts interativos durante a instalação
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências básicas do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Instala o OpenCode usando o script oficial
RUN curl -fsSL https://opencode.ai/install | bash

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de pacotes primeiro (otimiza o cache do Docker)
COPY package.json ./
RUN npm install

# Copia o restante do código
COPY server.js index.html ./

# A porta que o Railway vai usar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
