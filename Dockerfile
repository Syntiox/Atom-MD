FROM node:20-bullseye-slim

RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    git \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .


CMD ["node", "start.js"]
