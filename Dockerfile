FROM debian:bullseye-slim

# Instala Node.js e npm
RUN apt-get update && apt-get install -y nodejs npm git curl

# Instala OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

WORKDIR /app
COPY package.json server.js ./
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
