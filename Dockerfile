FROM docker.io/caddy
WORKDIR /usr/share/caddy
COPY ./dist/azure-challenge/browser/* ./
#COPY ./Caddyfile /etc/caddy/
EXPOSE 80
CMD [ "caddy", "run" ]