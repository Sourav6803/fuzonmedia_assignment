FROM  node:20-alpine
WORKDIR /fff/assignment/src
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start:dev"]