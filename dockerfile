FROM node:20.18.0
WORKDIR /app

COPY . .
EXPOSE 3000
CMD npm install &&\
    npm run build &&\
    npx serve -s build