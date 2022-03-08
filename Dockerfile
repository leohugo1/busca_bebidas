FROM node
WORKDIR /usr/app
COPY package.json ./
RUN npm install
FROM node:16-slim
RUN apt-get update
RUN apt-get install -y openssl
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]