FROM node:18-alpine

RUN apk add --no-cache git python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli

RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["expo", "start", "--tunnel"]
