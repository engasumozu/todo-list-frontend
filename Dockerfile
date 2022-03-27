FROM node:16.14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

RUN npm install -g rimraf

RUN npm install ansi-styles -g

COPY . .

RUN npm run build