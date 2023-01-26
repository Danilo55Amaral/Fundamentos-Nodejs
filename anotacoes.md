# Criando um projeto NodeJs

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

## Modulo de http 
- Para importar esse modulo de http utilizamos      const http = require('http')

- Esse modulo de http possue varias funcionalidades para construir aplicações HTTP 
que são as api que serão construidas.

## CommonJs / ESModules
- Para fazer essa importação utilizamos um padrão chamado CommonJS esse padrão de 
importação utiliza o require porém hoje em dia utiliza-se muito um outro padrão que 
são os ESModules que as importações e exportações utilizam o padrão import/export 

- Por padrão o node não suporta ESModule para que o node suporte dentro do package.json
é necessário colocar o "type": "module",  feito isso da para substituir minha importação 
do http para     import http from 'http'

- Para importação dos modulos internos do node é interessante utilizar o prefixo node: para 
que as importações se diferencia de importações externas.    import http from 'node:http'

## Criando servidor
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

## node --watch
- O node não fica de forma nativa verificando todas as mudanças feitas no nosso arquivo 
e estatando o servidor de forma automatizada, sempre será necessário rodar o servidor 
novamente.

- Antes para poder fazer com que o servidor ficasse monitorando essas mudanças e rodando o servidor de forma automatica era necessário instalar libs externas porém com as novas versões 
do node podemos fazer isso de forma nativa. rodando o comando    node --watch src/server.js

## Rotas de criação e Listagem (Métodos HTTP)

# Rotas
- Aqui vemos um pouco de rotas http dentro do servidor node as rotas são caminhos 
de entrada dentro da aplicação, quando a aplicação é desenvolvida e está pronta 
ser consumida por um front end, uma api publica ou qualquer coisa do tipo, vamos 
ter várias rotas dentro da nossa api, as rotas são meios de entrada ou formas 
de quem está consumindo a api executar diferentes operações dentro do nosso back end.

exemplos de rotas: Criar usuáeios, Listagem de usuários, Edição de usuario, Remoção de 
usuários.

# Requisição HTTP 
- Uma requisição HTTP é composta de dois recursos príncipais o Método HTTP e URL quando o front end faz essa requisição obtemos essas duas informações através do req. 

# Métodos HTTP
- Dentro do modulo http temos varios métodos, vamos ver os principais, GET, POST, PUT, 
PATCH, DELETE. esses são os metodos que comumente utilizamos em nas api. 
GET => Buscar um recurso do back-end
POST => Criar um recurso 
PUT => Atualizar um recurso np back-end
PATCH => Atualizar uma informação especifica de um recurso no back-end
DELETE => Deletar um recurso do back-end

PS- tem como ter duas rotas no back end ambas serem a mesma url porém com métodos 
distintos um GET e um POST por ex.
EX: 
GET /users => Buscando usuários do back-end
POST /users => Criar um usuario no back-end 

- O Conjunto de método http mais o recurso ou url é o que da a rota e o resultado final
que vai ser executado dentro do back end.

- Eu posso fazer testes utilizando o method e url e fazer requisições.

import http from 'node:http'

const server = http.createServer((req, res) => {
    const { method, url } = req 

    if (method == 'GET' && url == '/users') {
        return res.end('Listagem de usuários')
    }

    if (method == 'POST' && url == '/users') {
        return res.end('Criação de usuário')
    }
    
    return res.end('Hello')
})

server.listen(3333)

## Salvando usuários em memória (Headers)

- Aqui salvamos usuários dentro da memoria da aplicação.

# Stateful

- Até que o projeto seja parado utilizando um crtl + c por ex tudo que for declarado 
de variavel dentro do projeto, vaificar salvo em memória, esse conceito é chamado de 
Stateful, ela sempre vai ter um tipo de informação tendo guardada em memoria ou seja 
a aplicação depende de informações que são salvas em memoria para que ela continue 
funcionando, a partir do momento que a aplicação for derrubada e perder seus dados em 
memoria ela pode funcionar de uma maneira diferente que antes.

# Stateless 

- Esse tipo não salva nada em memoria geralmente salva essas informações em dispositivos
externos como banco de dados, arquivos de texto ou qualquer coisa do tipo
indenpendente se aplicação for parada os dados, os arquivos vão se manter igual sem ter 
qualquer tipo de problema. 

- PS Quando criamos um servidor em node e devolve uma resposta, essa resposta que vai 
para o front end não pode ser um array, ela precisa ter 3 formatos no máximo, ele pode 
ser uma string, um buffer, ou um Uint8Array. 

- No exemplo a gente precisou enviar um array por isso convertemos esse array para 
string utilizando JSON. 

# JSON (JavaScript Object Notation)

É uma estrutura de dados bastante utilizada na transição de dados entre front end e 
back end, também de back end para back end, essa estrutura de dados se assemelha muito 
a como  as estruturas de dados são dentro do JavaScript.
Com essa estrutura conseguimos transitar dados de todos os tipos dentro de uma string.

- Utilizamod o JSON.stringify 

- A aplicação Stateful é problemática caso coloque em produção por que sempre que o 
servidor for restartado as informações se perdem. Por isso é necessário utilizar 
banco de dados.

# Cabeçalhos (Requisição/resposta)

- São Metadados são quase que informações para que tanto o back como o front saibam 
lidar com a requisição da melhor forma.
- São informações adicionais que não tem haver com o dados retornado do back end
para o front end mas como aquele dado pode ser interpretado pelo front end.

- Por isso utilizamos o setHeader que significa que eu quero setar um cabeçalho 
colocamos o nome do cabeçalho, se pesquisar no gogole headers mdn podemos ver varios 
tipos que podemos utilizar, podemos também dá o nome que que quisermos, mas existem 
alguns cabeçalhos que são padrões em api, utilizamos no nosso exemplo o Content-type
como segundo parametro informamos qual que é o tipo de conteudo que está sendo 
retornado, como estamos retornando um Json a gente coloca que retorna um application/json

## Conhecendo HTTP status code 

- Quando devolvemos uma resposta para o front end ou seja após o front end executar 
alguma rota da aplicação como uma listagem de usuarios, uma criação de usuario, uma 
remoção de uauraio, existem vários tipos de códigos númericos que pode ser enviados 
para o front end para informar não só pelo texto que enviamos mas para comunicar ao 
front end se aquela requisiçao deu certo, se deu erro qual foi o tipo de erro.

- O HTTP status code tem muita importancia semantica na comunicação back end e front
end. Podemos pesquisar por    mdn http status code   e ver uma listagem desses códigos;

- Como exemplo eu retornei uma resposta vazia informando o status code utilizando o 
metodo writeHead passaando 201 esse status code simboliza umasresposta de sucesso 
porém falando que conseguimos criar alguma coisa de forma bem sussedida.

## Entendendo Streams no Node 

- Foi criada uma pasta só para exemplificar um dos conceitos que fez o node ser o 
que ele é hoje.

- As Streams foi a funcionalidade que fez o node ser quem é hoje, e fez com que o 
node conseguisse resolver problemas que na época outras tecnologias ou não resolviam 
ou resolviam de uma forma muito complexa, o node trouxe isso com muita simplicidade 
e performance que hoje é utilizada em várias empresas para fazer esse tipo de 
funcionalidade. 

- Exemplo quando vamos ver um filme ou ouvir uma musica em um serviço de stream 
conseguimos ver mesmo que não esteja totalmente carregado por completo e esse 
é o conceito de stream é conseguir ler pequenas partes de alguma coisa e já 
conseguir trabalhar com aqueles dados mesmo antes de ler o arquivo por completo. 

- O node permite que isso seja feito de uma maneira simples, de uma maneira extremamente performatica

- Para exemplificar imagine uma importação de clientes  via CSV (Excel) muito 
utilizado em sistema ERP, CRM, sistema de gestão financeira, sistema de faturamento 
em ecommerce.

- O conceito de stream eu consigo ler os dados provindos da requisição HTTP aos poucos
lendo esse arquivo e processando ele enquanto o arquivo ainda está sendo feito o upload
ou seja enquando o arquivo está sendo enviado para o servidor eu já consigo processar 
os dados as informações contidas dentro desse arquivo

# Readable Streams / Writable Streams
- Tesmos dois exemplos diferentes de streams Readable Streams (Streams de leitura)
e Writable Streams (streams de escrita) nos exemplos da Netfliz e Spotify onde enviamos
pro front end aos poucos uma informação do video e da musica isso se chama 
Writable Streams significa que estamos enviando uma informação aos poucos, no exemplo 
do  upload usuario envia um arquivo de 1Gb por exemplo e estamos lendo esse arquivo 
aos poucos uma Readable Streams.

## Criando Streams de leitura

- No node toda porta de entrada e saída é uma stream e isso é um conceito muito 
importante dentro do server que criamos por exemplo o req e o res são streams 
ou seja quando se faz uma requisição HTTP para um servidor node da para manter essa
requisição HTTP aberta e enviar dados para ela aos poucos assim como quando se devolve
uma resposta do node para o front end do back end devolvendo uma resposta aos poucos 
não necessáriamente se tem que devolver uma resposta de uma vez só.

- Dentro do Node temos várias portas de entrada e saída uma bem comum é req e res 
quando se trabalha com um servidor HTTP, Para exemplificar vamos ver outro modelo de 
entradas e saídas no node que é o processo do node o stdin que nada mais é que tudo 
que o usuario digita no terminal do node, isso é uma string readable, utilizamos 
também o pipe() que é conhecido como encanamento , é muito comum se fazer com streams 
dentro do node é conectar essas streams ins se podemos ler dados aos poucos também 
podemos enviar esses poucos dados que temos para uma string que vai tratar esses dados
da meneira que precisa ser tratado. Eu vou utilizar em seguida o process.stdout que é 
o retorno a aplicação no terminal para mostrar como isso funciona.

- Dentro do process.stdin tudo que estou recebendo como entrada eu estou encaminhando 
através do pipe() para uma saída ==> process.stdout.

- process.stdin -- Stream de leitura 
- process.stdout -- stream de escrita

# Construindo uma stream

- Primeiro importamos de dentro de node:stream    import { Readable } from 'node:stream'

- Em seguida eu crio uma classe que extende Readable de dentro do mode.
- Toda stream Readable tem um método obrigatorio que é o _read esse metodo 
retorna quais são os dados dessa stream.

- PS- Uma stream de leitura tem como proposito enviar dados, fornecer informações.
 - Dentro da minha classe eu criei uma variavel index que recebe 1 e dentro do 
 _read eu criei uma variavel i que basicamente vai somando esse index mais 1 cada 
 vez que o metodo for executado.

 - Em seguida eu crio uma condição que se o meu i for maior  a 100  eu vou executar 
 um push que é o metodo utilizado para uma Readable stream fornecer informações 
 para quem estiver consumindo ela, quando eu envio null eu estou informando que 
 não possuo mais informações para serem enviadas de dentro dessa string , se não 
 ou seja se o i ainda não chegou a 100 eu quero enviar de dentro dessa string o i 

 - Em seguida eu utilizo o new chamando minha classe que é a minha stream e utilizo um  pipe passando o process.stdout para enquanto ele ler a minha estream elejá 
 vai escrevendo no terminal.

# Buffer
- Se eu executar essa stream dessa forma em que ela está o terminal do node irá
retornar um erro por que dentro de stream não se pode trabalhar com dados primitivos 
como strings ou number, é necessário trabalhar com outro formato especifico do node 
que é o formato de buffer. 

-Para resolver o problema no meu código eu criei uma variavel buf que recebe 
Buffer.from() passando qual informação eu quero converter nesse formato. Em 
seguida eu envio meu buf no push.

- Node que ainda vai dar um erro por que o Buffer é uma string e estamos enviando um 
number por isso é necessário converter também para string.

    const buf = Buffer.from(String(i)) 

- Eu posso melhorar inda mais o exemplo utilizando a função setTimeout() e passando um
um intervalo de tempo para executar o código, note que a stream diferente de um modelo
de dados tradicional da para aos poucos a cada um segundo como definimos trabalhar com 
os dados retornados de dentro de uma stream, eu já consigo mostrar esses dados no
stdout dados de dentro da stream mesmo antes da stream está completada ou seja eu já 
consigo trabalhar com esses dados mesmo antes de chegar no final que é o 100 que 
foi definido na condição.







