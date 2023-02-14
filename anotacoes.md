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

# executando o servidor nodejs
- Para executar rodamos o comando node src/server.js
- Para testar se o servidor está funcionando basta abrir o browser e acessar a porta que definimos.clea.

# node --watch
- O node não fica de forma nativa verificando todas as mudanças feitas no nosso arquivo 
e estatando o servidor de forma automatizada, sempre será necessário rodar o servidor 
novamente.

- Antes para poder fazer com que o servidor ficasse monitorando essas mudanças e rodando o servidor de forma automatica era necessário instalar libs externas porém com as novas versões 
do node podemos fazer isso de forma nativa. rodando o comando    node --watch src/server.js

# Rotas de criação e Listagem (Métodos HTTP)

## Rotas
- Aqui vemos um pouco de rotas http dentro do servidor node as rotas são caminhos 
de entrada dentro da aplicação, quando a aplicação é desenvolvida e está pronta 
ser consumida por um front end, uma api publica ou qualquer coisa do tipo, vamos 
ter várias rotas dentro da nossa api, as rotas são meios de entrada ou formas 
de quem está consumindo a api executar diferentes operações dentro do nosso back end.

exemplos de rotas: Criar usuáeios, Listagem de usuários, Edição de usuario, Remoção de 
usuários.

## Requisição HTTP 
- Uma requisição HTTP é composta de dois recursos príncipais o Método HTTP e URL quando o front end faz essa requisição obtemos essas duas informações através do req. 

## Métodos HTTP
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

# Salvando usuários em memória (Headers)

- Aqui salvamos usuários dentro da memoria da aplicação.

## Stateful

- Até que o projeto seja parado utilizando um crtl + c por ex tudo que for declarado 
de variavel dentro do projeto, vaificar salvo em memória, esse conceito é chamado de 
Stateful, ela sempre vai ter um tipo de informação tendo guardada em memoria ou seja 
a aplicação depende de informações que são salvas em memoria para que ela continue 
funcionando, a partir do momento que a aplicação for derrubada e perder seus dados em 
memoria ela pode funcionar de uma maneira diferente que antes.

## Stateless 

- Esse tipo não salva nada em memoria geralmente salva essas informações em dispositivos
externos como banco de dados, arquivos de texto ou qualquer coisa do tipo
indenpendente se aplicação for parada os dados, os arquivos vão se manter igual sem ter 
qualquer tipo de problema. 

- PS Quando criamos um servidor em node e devolve uma resposta, essa resposta que vai 
para o front end não pode ser um array, ela precisa ter 3 formatos no máximo, ele pode 
ser uma string, um buffer, ou um Uint8Array. 

- No exemplo a gente precisou enviar um array por isso convertemos esse array para 
string utilizando JSON. 

## JSON (JavaScript Object Notation)

É uma estrutura de dados bastante utilizada na transição de dados entre front end e 
back end, também de back end para back end, essa estrutura de dados se assemelha muito 
a como  as estruturas de dados são dentro do JavaScript.
Com essa estrutura conseguimos transitar dados de todos os tipos dentro de uma string.

- Utilizamod o JSON.stringify 

- A aplicação Stateful é problemática caso coloque em produção por que sempre que o 
servidor for restartado as informações se perdem. Por isso é necessário utilizar 
banco de dados.

## Cabeçalhos (Requisição/resposta)

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

# Conhecendo HTTP status code 

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

# Entendendo Streams no Node 

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

## Readable Streams / Writable Streams
- Tesmos dois exemplos diferentes de streams Readable Streams (Streams de leitura)
e Writable Streams (streams de escrita) nos exemplos da Netfliz e Spotify onde enviamos
pro front end aos poucos uma informação do video e da musica isso se chama 
Writable Streams significa que estamos enviando uma informação aos poucos, no exemplo 
do  upload usuario envia um arquivo de 1Gb por exemplo e estamos lendo esse arquivo 
aos poucos uma Readable Streams.

# Criando Streams de leitura

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

## Construindo uma stream

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

## Buffer
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

# Stream de escrita e transformação

- A stream de escrita diferente da de leitura ela recebe dados da stream de leitura 
e vai fazer algo com esses dados. 

- Para trabalhar com essa stream importamos o Writable de dentro de node:stream 
e em seguida criamos a nossa stream de escrita na qual chamo de MultiplyByTenStream 
o objetivo dela é pegar um número de uma stream de leitura e vai multiplicar por 10 
nesse tipo de Stream utilizamod o método _write e esse método recebe 3 paramtros 
chunk, encoding e callback. 

- O chunk é o pedaço da strem de leitura que foi lido, é tudo que foi passado em 
this.push() na outra stream de leitura, O encoding é como essa informação está codificada,
callback é uma função que a stream de escrita precisa chamar quando ela terminar de fazer o 
que precisa fazer com a informação. 

- Dentro da Stream de escrita não retornamos nada por que ela processa dados ela nunca vai 
transformar um dado em alguma outra coisa.

- O chunk é um buffer e precisamos converter ele para string e por isso utilzamos o metodo 
toString(), como no exemplo eu quiz trabalhar com um number eu também elém de converter para string utilizei o Number() para converter para número.

- Em seguida eu estou lendo os dados de uma stream utilizando o  new OneToHoundreStream() 
que me retorna numeros de 1 a 100 e em seguida eu estou escrevendo esses dados dentro de 
uma stream de escrita nesse trecho   .pipe(new MultiplyByTenStream())

- REcapitulando estamos lendo dados que está retornando de segundo em segundo na nossa 
primeira stream e em seguida eu já estou trabalhando com esses dados na outra stream de 
forma gradativa ou seja enquanto o arquivo ainda está sendo lido eu já estou trabalhando 
com ele.

## Streams de Transformação 

- Essas streams transformam dados para exemplificar eu escrevi uma stream que vai pegar 
todos os numeros e vai converte-los para negativos, vou chamar essa stream de 
InverseNumberStream.

- Eu devo também fazer a importação do Transform de dentro de node:stream, nessa stream 
é utilizado o método _transform e os parametros são também o chunk, encoding, callback 
na função callback eu devo enviar como primeiro parametro null, o primeiro parametro de 
um callback é o erro por isso eu envio esse primeiro parametro como nulo caso não 
tenha dado erro nenhum, caso tenha dado algum erro dentro da minha stream, o segundo 
parametro do callback é a conversão ou seja o valor transformado por isso eu envio 
o dado transformado, lembrando que esse dado tem que ser enviado como Buffer.from().
e também como String.

- Em seguida eu crio mais um pipe passando minha straam. 

- O Buffer é um meio de transitar dados entre Streams é um modelo utilizado pelo node
para transicionar informações entre streams.

# Aplicando Streams no módulo HTTP 

- Aqui criamos um servidor HTTP a parte para ver como o conceito de Stream se conecta 
com o mundo real. 

- Para esse exemplo eu criei um novo arquivo chamado stream-http-server.js e dentro desse 
arquivo foi criado um servidor.

- Também foi criado um outro arquivo chamado fake-upload-to-http-stream.js nesse arquivo 
é criado um upload ficticio como se fosse o front end chamando o servidor http enviando 
alguma informação pesada que precisa ser enviada aos poucos e enquanto isso o back end 
já vai conseguir processar essas informações aos poucos de forma gradativa e transformando 
essas informações.

- Eu utilizei o metodo fetch passando o endereço do meu back end e dentro eu envio 
através do metodo POST , no body da minha requisição http que é o conteúdo da minha 
requisição eu passei a minha stream no exemplo foi enviada a new OneToHoundreStream()

- Dentro do meu servidor http eu posso utilizar a minha stream InverseNumberStream 

## Impostante Streams no servidor Node.js

- PS - É importante lembrar e entender que tudo no node são streams todas as portas 
de entrada e saída no node são streams, o meu req e res são streams. 

- O req é uma ReadableStream eu consigo ler dados da minha requisição 
- O res é uma WritableStream eu consigo escrever dados na minha resposta

- Quando eu executo o meu servidor e quando eu executo o meu fake-upload-to-http-stream
ele consegue dentro do servidor http da um log aos poucos conforme a informação está 
sendo enviada do front end , o meu arquivo fake abriu uma conexão com o back end e ele
não fechou essa conexão, ele abriu essa conexão e está enviando dados aos poucos para
o servidor http.

- Isso é a base de tudo que o node é capaz , é a base da arquitetura do node, da para
abrir um canal de inpu de dados ou seja de envio de dados para dentro do servidor http
e não fechar esse canal.

# Consumindo uma stream completa 

- Em alguns casos queremos ler todas os dados da stream antes de processar esses dados
existe uma sintaxe para se trabalhar com isso no node que é criar um array de buffers 
em seguida percorre a stream populando esses buffers e depois trabalha com o array de 
forma completa. 

- No node existe uma sintaxe que é utilizar o await para se trabalhar com streams 
o await dentro de uma stream aguarda cada pedaço da stream ser retornado, veja o exemplo

const buffers = []  

for await (const chunk of req) {
        buffers.push(chunk)
    }

- Essa sintaxe permite percorrer cada pedaço da stream e adicionar esse pedaço dentro 
do array de buffers que foi criado. 

- Essa sintaxe de for await permite percorrer toda a stream e enquanto ela não for 
percorrida por completa nada abaixo dessa linha de código será executado.

- Depois para ver o conteúdo completo eu crio uma const fullStreamContent e utilizo 
o Buffer utilizando concat que é para juntar todos os pedaços em um só, passando o
array de buffers convertendo para string. 

- Também devo retornar o res.end enviando minha variavel fullStreamContent

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

- Eu volto ao meu arquivo de fake upload e pego esse retorno que estou devolvendo do
servidor.

        fetch('http://localhost:3334', {
            method: 'POST',
            body: new OneToHoundreStream(),
        }).then(response => {
            return response.text()
        }).then(data => {
            console.log(data)
        })

# Corpo da requisição em JSON (Stream & Buffers)

- Aqui eu utilizei o mesmo trecho de código do exemplo passado no meu arquivo server
e utilizei o Insommia para simular uma requisiçõo real vinda de um front end. 
- Eu subistituir o nome da minha const por body pois é o corpo da minha requisição.

- Também foi necessário converter esses dados vindos da requisição em Json e para 
isso eu utilizei o JSON.parse() ou seja eu transformei um json já criado em uma 
estrutura JavaScript um objeto, um array, algm tipo primitivo do JavaScript.

- Com isso eu consigo utilizar esse dados do body fazendo uma desestruturação e 
utilzar no meu push.

            if (method == 'POST' && url == '/users') {
                const { name, email } = body

                users.push({
                    id: 1,
                    name,
                    email,
                })

- quando não se tem o corpo da requisição elel irá retornar um erro no terminal 
isso por que esse código ele tenta executar até mesmo quando o corpo da requisição 
está vazio, uma das técnias que podemos utilizar é colocar o nosso body em um bloco 
try para ele tentar executar o código se der erro eu vou utilizar o catch ele vai 
retornar null mas para isso é necessário utilizar o req no body.

# Entendendo Buffers no Node 

- O Buffer é uma representação no espaço da memoria do computador, utilizado para 
transitar dados de uma maneira muito rápida, os dados armazenados no buffer são 
armazenados para logo serem tratados ou seja enviados para outro lugar, e em seguida
serem removidos, é uma maneira de salvar e ler na memória de uma maneira muito 
performática.

- O node ler essa informação de forma binária e isso deixa muito mais performatico 
e o buffer guarda na memoria os dados de forma binária. 

- O Buffer foi uma api criada no node especificamente pela incapacidade do JavaScript 
de trabalhar com dados binários de maneira eficiênte.

- Para exemplificar eu criei um arquivo chamado buffer.js no qual eu criei um buffer 
e utilizei o Buffer.from passando uma string, note que após dá um console ele irá 
retornar essa string convertida em hexadecimal que é um tipo de arquivo binário.

# Criando middleware de JSON 

- Toda a parte que consome o corpo da requisição e que transforma o corpo da requisição 
em um JSON salvando dentro do req.body isso pode ficar em outro arquivo que chamei de
json.js e coloquei em uma pasta que criei e chamei de middlewares.

- Dentro desse arquivo json eu exporto uma função assincrona chamada json essa função 
recebe req e res do servidor e basicamente executa o código que copiei do server.js.

export async function json(req, res) {
    const buffers = [] 

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
}

- Dentro do meu server.js eu posso chamar meu json devo fazer a importação, eu 
passo req e res como parametro, como estou trabalhando com uma função assincrona eu 
devo chamar minha função json com um await. 

- Como estou utilizando o modules é importante colocar a extensão dos arquivos 
quando for importar. 
    import { json } from './middlewares/json.js'

# Middlewares

- É um interceptador que dentro do node nada mais é que uma função que vai interceptar 
a requisição, são fáceis de se reconhecer por que sempre recebem como parametros o 
req e o res 

# Criando banco de dados JSON

- Como aqui na aplicação ainda não integramos a algum banco de dados como sql ou outro
estamos trabalhando com os dados da aplicação em memoria, foi criado um array de
usuários. Mas dessa forma toda vez que aplicação for reiniciada os dados serão perdidos.

- Aqui vamos criar um banco de dados baseados em arquivos físicos assim os dados não 
são perdidos. 

- Para fazer isso eu criei um arquivo chamado database.js, dentro desse arquivo eu criei
uma classe chamada Database, eu criei um objeto chamado database e isso faz com que eu 
consiga salvar nessa base de dados mais de um tipo de informações. 

- Eu criei um  método chamado insert que recebe como argumento a tabela e os dados que 
se quer fazer a inserção, eu também criei um metodo chamado select que vai retornar a 
tabela com todos os dados inseridos dentro dela.

- O select ele procura se existe uma chave dentro do meu objeto database chamada table 
se não existir ele irá retornar um array vazio, no final ele retorna data. 

- O insert vai verificar se existe algum registro inserido na table, se sim ele adiciona
se não ele cria um array, foi criado um if que se já existe um array inserido nessa 
tabela ele irá pegar essa tabela e fazer um push adicionando data que é o novo item
se não (else) ele vai criar um novo array com o item dentro o data. Eu retorno o item 
que foi inserido o data.

export class Database {
    database = {} 

    select(table) {
        const data = this.database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }

        return data;
    }
}

- Aplicando o banco de dados dentro do nosso server.js para isso eu crio uma const 
database que recebe new Database e eu devo importar meu Database, ao invés de fazer 
um users.push  eu transformo isso em uma constante chamada user, abaixo eu executo 
database.insert passando como argumento o nomde da tabela e a informação que quero 
inserir que é meu user, na listagem eu eu busco meus users de database.select 
passando users que é o nome da tabela.

const database = new Database

const server = http.createServer(async (req, res) => {
    const { method, url } = req 

    await json(req, res)

    if (method == 'GET' && url == '/users') {
        const users = database.select('users')

        return res     
            .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users') {
        const { name, email } = req.body

        const user = {
            id: 1,
            name,
            email,
        }

        database.insert('users', user) 

        return res.writeHead(201).end()
    }
    
    return res.writeHead(404).end()
})

server.listen(3333)

# #database
- Eu posso tornar meu database uma propriedade privada adicionando o # 

# Persistindo banco de dados 

- Aqui salvamos os dados para que quando parar e rodar a aplicação novamente 
os dados persistirem armazenados. 

- Para trabalhar com arquivos físicos dentro do node é necessário trabalhar com o
modulo interno do node de file sistem exixtem dois o node:fs e o node:fs/promises 
que esse permite trabalhar com o novo formato de asincronismo do JavaScript que 
são as promises. 

    import fs from 'node:fs/promises'; 

- Eu criei um médoto dentro da minha classe chamado #perist que será responsável em 
escrever o banco de dados em um arquivo físico. Eu devo chamar esse método toda vez 
que uma nova informação for inserida no banco de dados por isso devo chamar esse método 
no meu insert.

- Dentro do meu metodo eu utilizo o fs.writeFile passando um nome do arquivo, como vou 
salvar um objeto eu salvo como arquivo .json , em seguida eu utilizo o JSON.stringifi 
para converter esses dados de #database em uma estrutura json, isso por que o writeFile
só aceita dados como string.

- Reiniciando o projeto note que quando uma nova inserção for feita ele vai criar o 
arquivo db.json e vai armazenar os dados inseridos lá nesse arquivo. 

import fs from 'node:fs/promises'; 

export class Database {
    #database = {} 

    #persist() {
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }
}


- Note que o node criou esse arquivo na raiz do projeo por que o node leva em 
consideração o local em que o projeto é executado, podemos modificar o local 
de criação desse arquivo. 

- A maneira mais atual de se trabalhar com caminhos no node, podemos utilizar uma 
classe interna do node chamada URL que posso enviar dois paramtros, primeiro o 
nome do arquivo que eu quero, e em seguida o caminho relativo onde quero criar 
esse arquivo. 

const databasePath = new URL('db.json', import.meta.url)

- Em seguida eu coloco meu databasePath como primeiro parametro do meu writeFile

fs.writeFile(databasePath, JSON.stringify(this.#database))

- Com isso a localização do arquivo do banco de dados está relativa ao arquivo 
database.js.

- Agora é necessário recuperar esses dados quando a aplicação inicializa eu crio 
um  constructor que será executado quando o banco de dados for instanciado, dentro 
do constructor eu utilizo o readFile passando databasePath para ele ler esse arquivo
como segundo paramtro eu passo qual encoding estou utilizando como utf-8 que é o padrão
em seguida eu utilizo o .then pegando os dados desse arquivo e salvando dentro do 
banco de dados this.#database = JSON.paeser(data). 

 constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
    }

Caso meu arquivo não exista eu posso utilizar um catch escrevendo para ele persistir 
mesmo que vazio.

 constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

# Criando ID único e universal (UUID)

- Note que toda vez que fazemos uma nova inserção ele sempre está gerando com id: 1 
existem várias formas de resolver isso, no caso aqui ao invés de criar com id: 1 
podemos criar sempre com id aleatório e único. 

- Dentro do node:crypto conseguimos importar uma função chamada randomUUID, essa função
sempre vai retornar um id único toda vez que uma inserção for feita, vou  utilizar essa
função dentro de user, subistituindo o valor 1 que estava no id.

- Quando queremos dentro do node criar uma informação única é muito comum se utilizar o 
Math.random do JavaScrit porém não é interessante, é melhor utilizar o randomUUID().

const user = {
    id: randomUUID(),
    name,
    email,
}

# Separando rotas da aplicação 

- Criamos mais Rotas para a aplicação, para isso foi criado um arquivo chamado routes.js 
dentro desse arquivo foi criado um array de rotas que irá conter todas as rotas da 
aplicação, cada rota na aplicação será um objeto, esse método é composto pelo metodo que 
vai chamar aquela rota, o caminho para chamar a rota, e o que que vai acontecer quando a 
rota for chamada.

O meu banco de dados também vem para esse arquivos de rotas.Também importei o randomm. 

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    }
]

- Agora dentro do server.js é necessário verificar se dentro do array de rotas existe 
alguma entrada que bate com a operação que se quer fazer , para fazer isso eu crio 
uma const chamada route que recebe routes e ele vai importar, vou utilizar o find() para
encontrar uma rota que retorne o método que seja igual ao metodo que está sendo requisitado
e também o caminho seja igual a url que está sendo requisitada. 

 const route = routes.find(route => {
        return route.method == method && route.path == url
    })

Em seguida eu crio um if caso tenha encontrado alguma rota ele retorna route.handler que 
é a função handle que existe na rota passando o req e o res.

 if (route) {
        return route.handler(req, res) 
    }

- Feito essa validação, quando for necessário ter mais rotas basta apenas criar la dentro do
objeto em routes.js

# Route e Query parameters 

 - Existem 3 formas do front end ou qualquer aplicação que estaja consumindo a api  enviar 
 informações para a api, essas 3 formas são Query Parameters, Route Parameters e temos o 
 Request Body. 

 ## Query Parameters 
 
 - São parametros nomeados que são enviados no próprio endereço da requisição por ex 
 http://localhost:3333/users?userId=1 o userId é chamado de query parameter isso  por que
 cada parametro enviado na url tem um nome (chave) e o valor que no caso do exemplo é 1 
 também é possivelconcatenar com o & e colocar mais parametros. 

 - São utilizados quando é necessário ter uma url que é Statefull , esse tipo de parametro 
 é utilizado na url para enviar informações que não são sensiveis, que servem mais para 
 modificar a resposta que o back end vai retornar, são muito utilizados para filtros, 
 paginação, para essas coisas que modificam a resposta mas que muitas vezes não são 
 obrigatórias. 

 ## Route Parameters 

 - São paramtros não nomeados que também ficam na rota http://localhost:3333/users/1 
 note que tem um 1 e mais nenhum simbolo é como se fosse parte da rota, são usados 
 para a identificação de recurso , int se eu uso essa rota com um get por ex eu entendo 
 que estou buscando um usuario com id 1, note que fazemos uma combinação de método, recurso 
 e Router Parameter para entender exatamente o quer que a rota quer dizer. 

## Importante

- Note que ambos os parameters que foram citados a cima NÃO  podem ser utilizados para 
envio de informações sensiveis, como senhas ou dados sigilosos, por que nenhuma informação 
enviada na url da requisição não é criptografado e por isso é muito fácil de interceptar. 

## Request Bady 

- Diferente dos outros dois é utilizado para envio de informações de um formulario epode 
ser utilizado para envio de quantas informações forem necessárias, os dados enviados 
no Request Bady passam pelo protocolo HTTPs e são muito mais dificeis de serem 
descriptografados e interceptados. Ele não fica na url.

- Entendendo esses conceitos é possivel agora criar as demais rotas para edição e remoção 
du usuario.  

- dentro do meu routes.js eu criei um novo registro de rota para a remoção de usuario. 
Note que com esses conceitos conseguimos identificar que se queremos identificar um 
usuario para deletar devemos utilizar o Route Paramters por que é necessário identificar
um recurso através da rota. 

 {
    method: 'DELETE',
    path: '/users/ID',
    handler: (req, res) => {
        return res.end()
    },
}


