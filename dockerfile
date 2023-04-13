FROM node:16.0.0

WORKDIR /tmp/react

COPY . .

RUN npm i 



RUN chmod a+x /tmp/react/node_modules/.bin/react-scripts 


# criamos a versão otimizada de produção
RUN npm run build

# cria todo o caminho (-p) da pasta que será servida pelo nginx
RUN mkdir -p /var/www/html

# move o conteúdo
RUN mv build/* /var/www/html

# sai da pasta
WORKDIR /

# remove todo o diretório de desenvolvimento
RUN rm -rf /tmp/react