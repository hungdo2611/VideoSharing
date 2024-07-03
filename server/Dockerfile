FROM node:18

WORKDIR /server
COPY package*.json .
COPY . .
RUN npm i

CMD ["npm", "start"]