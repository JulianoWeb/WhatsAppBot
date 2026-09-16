Bot para WhatsApp desenvolvido em JavaScript usando `whatsapp-web.js`.

## Funcionalidades

* Sistema de boas-vindas para novos membros
* Comandos personalizados
* Menu de comandos
* Sistema de regras
* Ativar e desativar boas-vindas
* Identificação de grupos
* Logs de mensagens e comandos
* Autenticação pelo QR Code
* Sessão persistente do WhatsApp

## Comandos

```text
/menu
/regras
/link
/dono
/welcome on
/welcome off
```

## Instalação

```bash
git clone https://github.com/JulianoWeb/WhatsAppBot.git
cd WhatsAppBot
npm install
```

## Executar

```bash
node main.js
```

Depois, escaneie o QR Code exibido no terminal com o WhatsApp.

## Tecnologias

* JavaScript
* Node.js
* whatsapp-web.js
* qrcode-terminal
* Puppeteer

## Estrutura

```text
WhatsAppBot/
├── main.js
├── package.json
├── package-lock.json
└── session/
```
