# WhatsAppBot

Bot para WhatsApp desenvolvido em **Node.js** utilizando `whatsapp-web.js`.

O projeto foi desenvolvido como prática de **JavaScript, Node.js, automação, eventos e integração com o WhatsApp Web**, com foco em criar um bot simples, funcional e fácil de expandir.

## Funcionalidades

* Sistema automático de boas-vindas em grupos
* Comandos personalizados
* Menu de comandos
* Regras do grupo
* Envio de link configurável
* Identificação do dono do bot
* Ativação e desativação das boas-vindas
* Logs das mensagens recebidas
* Identificação de grupos e usuários
* Tratamento de erros
* Persistência de sessão com `LocalAuth`

## Comandos

| Comando        | Função                        |
| -------------- | ----------------------------- |
| `/menu`        | Exibe o menu de comandos      |
| `/regras`      | Mostra as regras do grupo     |
| `/link`        | Envia o link configurado      |
| `/dono`        | Mostra o responsável pelo bot |
| `/welcome on`  | Ativa as boas-vindas          |
| `/welcome off` | Desativa as boas-vindas       |

## Tecnologias

* Node.js
* JavaScript
* whatsapp-web.js
* Puppeteer
* qrcode-terminal
* WhatsApp Web

## Estrutura

```text
WhatsAppBot/
├── main.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── session/
└── .wwebjs_cache/
```

As pastas `session/` e `.wwebjs_cache/` são utilizadas localmente e estão protegidas pelo `.gitignore`.

## Instalação

Clone o projeto:

```bash
git clone git@github.com:JulianoWeb/WhatsAppBot.git
```

Entre na pasta:

```bash
cd WhatsAppBot
```

Instale as dependências:

```bash
npm install
```

Execute o bot:

```bash
node main.js
```

Depois, escaneie o QR Code exibido no terminal com o WhatsApp.

## Configuração

Algumas informações podem ser alteradas diretamente no `main.js`.

Exemplo:

```js
const LINK = 'SEU_LINK';
const DONO = 'SEU_NOME';
```

## Logs

O bot possui logs no terminal para facilitar o acompanhamento e a identificação de problemas.

Exemplo:

```text
[MENSAGEM - message_create]

FROM: usuario@lid
TO: grupo@g.us
AUTHOR: usuario@lid
ID: XXXXXXXX
TIPO: chat
TEXTO: /menu

[GRUPO IDENTIFICADO]: grupo@g.us
[COMANDO]: /menu
```

Esses registros ajudam durante o desenvolvimento e testes do bot.

## Segurança

Arquivos e diretórios que podem conter dados sensíveis ou informações locais não devem ser enviados para o GitHub.

O `.gitignore` inclui:

```text
node_modules/
session/
.wwebjs_cache/
.env
.env.*
*.log
*.key
*.pem
credentials.json
config.json
```

A pasta `session/` é especialmente importante, pois armazena dados relacionados à sessão do WhatsApp.

## Objetivo do projeto

Este projeto faz parte dos meus estudos em:

* Node.js
* JavaScript
* Automação
* Desenvolvimento de bots
* Integração com APIs e serviços
* Desenvolvimento de aplicações
* Conceitos de segurança

A ideia é continuar evoluindo o projeto adicionando novas funcionalidades e melhorando sua estrutura.

## Autor

**Juliano Almeida**

GitHub: [@JulianoWeb](https://github.com/JulianoWeb)

---

Projeto desenvolvido para estudos, prática e evolução em desenvolvimento de software.
