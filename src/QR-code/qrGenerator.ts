import QRCode from 'qrcode';

/**
 * Generate QR code from given text.
 * @param text Text which will be generated QR code.
 * @returns Promise, which return Data URL from the QR code.
 */
export async function generateQRCode(text: string): Promise<string> {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(text);
        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Не успяхме да генерираме QR код.');
    }
}

