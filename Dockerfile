FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install --force
COPY . ./
RUN npm run build
EXPOSE 8080
CMD [ "node", "server.js" ]
