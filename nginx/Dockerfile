FROM nginx:alpine

# Install openssl to generate a self-signed cert for origin TLS
RUN apk add --no-cache openssl \
  && mkdir -p /etc/nginx/ssl \
  && openssl req -x509 -nodes -days 3650 \
       -subj "/CN=localhost" \
       -newkey rsa:2048 \
       -keyout /etc/nginx/ssl/privkey.pem \
       -out /etc/nginx/ssl/fullchain.pem

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
