FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN npm install && \
    npm run alias && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/America/Guayaquil /etc/localtime
EXPOSE 3000
CMD ["npm","start"]