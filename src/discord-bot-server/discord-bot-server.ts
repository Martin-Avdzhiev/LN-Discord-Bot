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
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Returns if the message is from the bot
    const userId = message.author.id; // Get unique ID from author
    console.log(`${userId}-------------123`)
    // Generating QR code
    if (message.content.startsWith('!qr ')) {
        const textToEncode = message.content.slice(4); // Get the desired link after the command
        if (!textToEncode) {
            return message.channel.send('Моля, предоставете текст или URL за генериране на QR код.');
        }
        try {
            const qrCodeDataUrl = await generateQRCode(textToEncode);
            // Convert Data URL to Buffer
            const base64Data = qrCodeDataUrl.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64'); // Create Buffer from Base64
            const attachment = new AttachmentBuilder(buffer, { name: 'qrcode.png' }); // Create an attachment

            await message.channel.send({ content: 'Ето вашият QR код: ', files: [attachment] });
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
