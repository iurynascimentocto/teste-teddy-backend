# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

# Copia todos os arquivos para dentro do container
COPY . .

# Expõe a porta do backend NestJS
EXPOSE 3000

# Comando para rodar o backend
CMD ["npm", "run", "start:dev"]
