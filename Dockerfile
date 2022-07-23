FROM node:latest

COPY . /app

ENV REACT_APP_BASE_URL=https://secondhand-2-binar-final.herokuapp.com

WORKDIR /app

RUN npm install && \
    npm run build


# SERVE SERVER
FROM nginx:latest

COPY --from=0 /app/build /usr/share/nginx/html

RUN sed -i 's|index.htm;|;\n try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf
