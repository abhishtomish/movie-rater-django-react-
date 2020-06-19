FROM node:latest as builder
RUN npm install webpack -g
ADD package.json /tmp/
ADD webpack.config.js /tmp/
RUN cd /tmp && npm install --silent
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
COPY . /opt/app
WORKDIR /opt/app/
RUN ls -al
RUN npm start 
RUN ls -al
FROM nginx:latest as nginx
COPY conf.d/nginx.conf /etc/nginx/nginx.conf
RUN rm /usr/share/nginx/html/*
COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY --from=builder /opt/app/src/assets /usr/share/nginx/html/assets
COPY --from=builder /opt/app/src/index.html /usr/share/nginx/html/
workdir /usr/share/nginx/html
RUN ls -al
CMD ["nginx", "-g", "daemon off;"]
