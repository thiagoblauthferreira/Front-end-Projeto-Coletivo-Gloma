FROM nginx:stable

COPY ./build /usr/share/nginx/html

COPY ./certificados/chave-privada.pem /etc/nginx/ssl/chave-privada.pem
COPY ./certificados/certificado.crt /etc/nginx/ssl/certificado.crt
RUN echo "gloma" > /etc/nginx/ssl/senha.txt

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
