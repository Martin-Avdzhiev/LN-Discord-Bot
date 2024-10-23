import { Client, GatewayIntentBits, AttachmentBuilder } from 'discord.js';
import { botToken } from "../config/config"
import { generateQRCode } from '../QR-code/qrGenerator';

// Giving permissions to the bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Console log when the bot is started
client.once('ready', () => {
    console.log(`Logged as ${client.user?.tag}`);
});

// Command example
// Command example
client.on('messageCreate', async (message) => {
    // Команда за генериране на QR код
    if (message.content.startsWith('!qr ')) {
        const textToEncode = message.content.slice(4); // Взимаме текста след командата
        if (!textToEncode) {
            return message.channel.send('Моля, предоставете текст или URL за генериране на QR код.');
        }
        try {
            const qrCodeDataUrl = await generateQRCode(textToEncode);
            // Конвертиране на Data URL в Buffer
            const base64Data = qrCodeDataUrl.split(',')[1]; // Вземи частта след запетаята
            const buffer = Buffer.from(base64Data, 'base64'); // Създаване на Buffer от Base64 данните
            const attachment = new AttachmentBuilder(buffer, { name: 'qrcode.png' }); // Създаване на attachment

            await message.channel.send({ content: 'Ето вашият QR код:', files: [attachment] });
        } catch (error) {
            console.error('Error sending QR code:', error);
            message.channel.send('Не успяхме да генерираме QR код. Моля, опитайте отново.');
        }
    }

    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

// Starting the bot
client.login(botToken);
