# filepath: /Users/pranavr/emarket/campus-backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["node", "dist/index.js"]