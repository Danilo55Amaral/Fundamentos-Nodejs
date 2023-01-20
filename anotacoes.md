## Criando um projeto NodeJs

- A primeira configuração que deve ser feita é rodando o comando npm init -y 
o -y é para ele responder sim para todas as perguntas e instalar diretamente.

- npm --> package manage -> gerenciameno de pacotes.

- Esse comando cria o arquivo package.json que é o arquivo principal que existe 
em toda aplicação JS, esse arquivo contém nomes, versão, descrição, alguns scripts
principais para se automatizar tarefas, o mais importante é que esse arquivo vai 
armazenar as dependencias que o projeto tem de códigos de terceiros. 

- Eu posso criar uma pasta src, para testar meu servidor eu criei uma pasta server.js
dentro do arquivo eu posso colocar qualquer código JavaScript e ele vai executar ao rodar 
o servidor node.

- Dentro do servidor node não vamos ter acesso a coisas restritas dos Browsers como window, document.query por que essas coisas são api especificas do proprio navegador, dentro do node 
vamos criar aplicações rest , api.

- O node vem automaticamente com modulos internos para facilitar o trabalho com coisas que 
que são muito comuns em aplicações back end, uma delas é o modulo de http.

# Modulo de http 
- Para importar esse modulo de http utilizamos      const http = require('http')

- Esse modulo de http possue varias funcionalidades para construir aplicações HTTP 
que são as api que serão construidas.

# CommonJs / ESModules
- Para fazer essa importação utilizamos um padrão chamado CommonJS esse padrão de 
importação utiliza o require porém hoje em dia utiliza-se muito um outro padrão que 
são os ESModules que as importações e exportações utilizam o padrão import/export 

- Por padrão o node não suporta ESModule para que o node suporte dentro do package.json
é necessário colocar o "type": "module",  feito isso da para substituir minha importação 
do http para     import http from 'http'

- Para importação dos modulos internos do node é interessante utilizar o prefixo node: para 
que as importações se diferencia de importações externas.    import http from 'node:http'

# Criando servidor
- criando o servidor http, note que utilizamos uma função arow anonima , eu utilizo o 
server.listen() passando a porta que eu quero rodar o servidor, com isso toda vez que eu 
for acessar essa porta ele vai cair nessa  função que vai lidar com as chamadas http, 
essa função tem dois parametros o req ou request e o res ou response, dentro desse req da 
para conseguir todas as informações da requisição que está chegando dentro do servidor, imagine 
uma rota para criar um usuario que é necessário enviar uma informação para o servidor como nome,
email,senha ou seja através do req é possivel obter todas as informações de quem está chamando 
o servidor o res é utilizado para devolver uma resposta para quem chama o servidor. 

## executando o servidor nodejs
- Para executar rodamos o comando node src/server.js
- Para testar se o servidor está funcionando basta abrir o browser e acessar a porta que definimos.clea.