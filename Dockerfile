FROM node:18-alpine

WORKDIR /src/app

COPY package*.json ./

# installs the application dependencies
RUN npm install

COPY . .

# build nestjs application
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]