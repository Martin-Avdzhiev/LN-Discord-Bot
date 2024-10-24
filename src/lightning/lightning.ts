import { zbd } from '@zbd/node';
import { zbdToken } from '../config/config';
import { generateQRCode } from '../QR-code/qrGenerator';
// Instantiate ZBD client
async function createCharge() {
    if (zbdToken) {
        const ZBD = new zbd(zbdToken);



        // Creating a payload for the charge
        const payload = {
            expiresIn: 300, // seconds
            amount: '50000', // millisatoshis (1 satoshi = 1000 millisatoshis)
            internalId: '311176904726282242', // Discord User ID
            description: 'Paymen for role',
            callbackUrl: 'https://your-app.com/zbd-callback'
        };

        // Options for the request
        const options = {
            method: 'POST',
            headers: {apikey: zbdToken, 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
          };
          

        // Creating a charge
        try {
            const response = await ZBD.createCharge(payload);
            console.log('The charge is created successfully:', response);
        } catch (error) {
            console.log({ error });
        }
    }
}

// Invoke the function
createCharge();