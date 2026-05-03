FROM node:20-bullseye

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Instala o OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

WORKDIR /app

COPY package.json ./
RUN npm install

COPY server.js index.html ./

EXPOSE 3000

CMD ["node", "server.js"]
