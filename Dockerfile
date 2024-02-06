FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3001

CMD [ "yarn",  "dev" ]