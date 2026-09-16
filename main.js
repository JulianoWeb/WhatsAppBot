const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const LINK = 'https://www.xvideos.com';
const DONO = 'Juliano.web';

const welcomeStatus = new Map();
const processedMessages = new Set();

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session'
    }),
    puppeteer: {
        headless: true,
        protocolTimeout: 120000,
        timeout: 120000,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote'
        ]
    }
});

function separador() {
    console.log('==============================================');
}

function obterGrupoId(message) {
    if (message.to && message.to.endsWith('@g.us')) {
        return message.to;
    }

    if (message.from && message.from.endsWith('@g.us')) {
        return message.from;
    }

    return null;
}

function obterAutorId(message) {
    if (message.author) {
        return message.author;
    }

    if (message.from) {
        return message.from;
    }

    return null;
}

function obterIdMensagem(message) {
    if (message.id?._serialized) {
        return message.id._serialized;
    }

    if (message.id?.id) {
        return message.id.id;
    }

    return [
        message.from || '',
        message.to || '',
        message.author || '',
        message.body || '',
        message.timestamp || ''
    ].join('|');
}

function mensagemJaProcessada(id) {
    if (!id) {
        return false;
    }

    if (processedMessages.has(id)) {
        return true;
    }

    processedMessages.add(id);

    setTimeout(() => {
        processedMessages.delete(id);
    }, 5000);

    return false;
}

async function responder(message, texto) {
    try {
        console.log('[BOT] Enviando resposta...');

        await message.reply(texto);

        console.log('[BOT] Resposta enviada com sucesso.');

    } catch (erro) {
        console.log('[ERRO AO ENVIAR RESPOSTA]');
        console.log(erro);
    }
}

async function comandoMenu(message) {
    const menu = `
╔════════════════════════════╗
        BOT JULIANO.WEB
╚════════════════════════════╝

COMANDOS

/menu
/regras
/link
/dono

WELCOME

/welcome on
/welcome off
`;

    await responder(message, menu);
}

async function comandoRegras(message) {
    const regras = `
╔════════════════════════════╗
            REGRAS
╚════════════════════════════╝

1. Respeite os membros.
2. Não envie spam.
3. Não envie links suspeitos.
4. Respeite os outros membros.
5. Não abuse do bot.
6. Mantenha o grupo organizado.
`;

    await responder(message, regras);
}

async function comandoLink(message) {
    await responder(
        message,
        `🔗 Link:\n${LINK}`
    );
}

async function comandoDono(message) {
    await responder(
        message,
        `👑 Dono do bot: ${DONO}`
    );
}

async function comandoWelcome(
    message,
    grupoId,
    ativar
) {
    welcomeStatus.set(
        grupoId,
        ativar
    );

    console.log(
        `[WELCOME] Grupo: ${grupoId}`
    );

    console.log(
        `[WELCOME] Status: ${ativar ? 'ATIVADO' : 'DESATIVADO'}`
    );

    if (ativar) {
        await responder(
            message,
            '✅ Boas-vindas ativadas neste grupo.'
        );
    } else {
        await responder(
            message,
            '❌ Boas-vindas desativadas neste grupo.'
        );
    }
}

async function processarMensagem(
    message,
    origem
) {
    try {
        const id =
            obterIdMensagem(message);

        if (
            mensagemJaProcessada(id)
        ) {
            return;
        }

        const texto =
            typeof message.body === 'string'
                ? message.body.trim()
                : '';

        separador();

        console.log(
            `[MENSAGEM - ${origem}]`
        );

        console.log(
            'FROM:',
            message.from
        );

        console.log(
            'TO:',
            message.to
        );

        console.log(
            'AUTHOR:',
            message.author
        );

        console.log(
            'AUTOR FINAL:',
            obterAutorId(message)
        );

        console.log(
            'ID:',
            message.id?._serialized ||
            message.id?.id ||
            'undefined'
        );

        console.log(
            'TIPO:',
            message.type
        );

        console.log(
            'TEXTO:',
            texto
        );

        const grupoId =
            obterGrupoId(message);

        if (grupoId) {
            console.log(
                '[GRUPO IDENTIFICADO]:',
                grupoId
            );
        } else {
            console.log(
                '[CHAT PRIVADO]'
            );
        }

        separador();

        if (!texto) {
            return;
        }

        if (!texto.startsWith('/')) {
            return;
        }

        const partes =
            texto.split(/\s+/);

        const comando =
            partes[0].toLowerCase();

        console.log(
            `[COMANDO DETECTADO]: ${comando}`
        );

        if (comando === '/menu') {
            await comandoMenu(message);
            return;
        }

        if (comando === '/regras') {
            await comandoRegras(message);
            return;
        }

        if (comando === '/link') {
            await comandoLink(message);
            return;
        }

        if (comando === '/dono') {
            await comandoDono(message);
            return;
        }

        if (comando === '/welcome') {
            if (!grupoId) {
                await responder(
                    message,
                    '❌ Este comando só pode ser usado em grupos.'
                );

                return;
            }

            const opcao =
                partes[1]?.toLowerCase();

            if (opcao === 'on') {
                await comandoWelcome(
                    message,
                    grupoId,
                    true
                );

                return;
            }

            if (opcao === 'off') {
                await comandoWelcome(
                    message,
                    grupoId,
                    false
                );

                return;
            }

            await responder(
                message,
                'Use:\n/welcome on\n/welcome off'
            );

            return;
        }

        console.log(
            `[COMANDO DESCONHECIDO]: ${comando}`
        );

        await responder(
            message,
            `❌ Comando não encontrado: ${comando}\n\nDigite /menu para ver os comandos.`
        );

    } catch (erro) {
        console.log('');
        separador();

        console.log(
            '[ERRO AO PROCESSAR MENSAGEM]'
        );

        console.log(erro);

        separador();
        console.log('');
    }
}

client.on(
    'qr',
    qr => {
        console.log('');
        separador();

        console.log(
            '[QR CODE] Escaneie o código abaixo:'
        );

        separador();

        qrcode.generate(
            qr,
            {
                small: true
            }
        );

        separador();
    }
);

client.on(
    'authenticated',
    () => {
        console.log(
            '[AUTH] WhatsApp autenticado.'
        );
    }
);

client.on(
    'ready',
    () => {
        console.log('');
        separador();

        console.log(
            'BOT CONECTADO COM SUCESSO!'
        );

        console.log(
            `Dono: ${DONO}`
        );

        console.log(
            `Link: ${LINK}`
        );

        separador();
        console.log('');
    }
);

client.on(
    'auth_failure',
    mensagem => {
        console.log(
            '[AUTH FAILURE]',
            mensagem
        );
    }
);

client.on(
    'disconnected',
    motivo => {
        console.log(
            '[DESCONECTADO]',
            motivo
        );
    }
);

client.on(
    'group_join',
    async notification => {
        try {
            console.log('');
            separador();

            console.log(
                '[NOVO MEMBRO]'
            );

            console.log(
                'GRUPO:',
                notification.chatId
            );

            console.log(
                'USUÁRIO:',
                notification.recipientIds
            );

            separador();

            const grupoId =
                notification.chatId;

            const ativo =
                welcomeStatus.get(
                    grupoId
                );

            if (ativo === false) {
                console.log(
                    '[WELCOME] Desativado neste grupo.'
                );

                return;
            }

            const usuarios =
                notification.recipientIds;

            if (
                !Array.isArray(usuarios) ||
                usuarios.length === 0
            ) {
                console.log(
                    '[WELCOME] Nenhum usuário encontrado.'
                );

                return;
            }

            for (
                const usuario of usuarios
            ) {
                const nome =
                    usuario.split('@')[0];

                const mensagem =
                    `Seja bem-vindo(a), @${nome}!\n\n` +
                    'É um prazer ter você aqui.';

                try {
                    await client.sendMessage(
                        grupoId,
                        mensagem,
                        {
                            mentions: [
                                usuario
                            ]
                        }
                    );

                    console.log(
                        `[WELCOME] Boas-vindas enviadas para ${usuario}`
                    );

                } catch (erro) {
                    console.log(
                        `[ERRO AO ENVIAR WELCOME PARA ${usuario}]`
                    );

                    console.log(erro);
                }
            }

        } catch (erro) {
            console.log(
                '[ERRO NO WELCOME]'
            );

            console.log(erro);
        }
    }
);

client.on(
    'message',
    async message => {
        await processarMensagem(
            message,
            'message'
        );
    }
);

client.on(
    'message_create',
    async message => {
        await processarMensagem(
            message,
            'message_create'
        );
    }
);

console.log('');
separador();

console.log(
    'INICIANDO BOT...'
);

console.log(
    'Aguardando conexão com WhatsApp...'
);

separador();
console.log('');

client.initialize();
