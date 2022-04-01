FROM node:16.14-alpine As build
ARG REACT_APP_API_ENDPOINT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT} \
    npm run build

FROM nginx:1.12-alpine as deploy

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]