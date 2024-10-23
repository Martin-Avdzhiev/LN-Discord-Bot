import { zbd } from '@zbd/node';
import { zbdToken } from '../config/config';
// Instantiate ZBD client
async function createCharge() {
    if (zbdToken) {
        const ZBD = new zbd(zbdToken);
        
        // Creating a payload for the charge
        const payload = {
            expiresIn: 300, // seconds
            amount: '50000', // millisatoshis (1 satoshi = 1000 millisatoshis)
            internalId: '118304b8',
            description: 'My Charge Description',
            callbackUrl: 'https://your-app.com/zbd-callback',
        };

        // Creating a charge
        try {
            const response = await ZBD.createCharge(payload);
            console.log('Зарядът е създаден успешно:', response);
        } catch (error) {
            console.log({ error });
        }
    }
}

// Invoke the function
createCharge();