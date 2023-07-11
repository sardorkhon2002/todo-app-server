FROM node:16
WORKDIR /app
COPY package.json .
COPY *.sql /docker-entrypoint-initdb.d/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start_d"]
