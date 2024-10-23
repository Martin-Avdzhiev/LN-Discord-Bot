import * as fs from 'fs';

// User type for saving in DB
interface User {
    userId: string;
    payment: boolean;
    amount: number;
    role: Role;
}

// Type of Roles
type Role = "Satoshi Nakamoto" | "USDT" | "Bitcoin" | "Ethereum";

// Read data from JSON DB
function readJsonFile(filePath: string): User[] {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData: User[] = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

// Write data to JSON DB
function writeJsonFile(filePath: string, data: User[], user:User): void {
    try {
        if(data.length == 0) return // If in reading returns empty array to avoid deleting all the DB
        const userIndex = data.findIndex((x) => x.userId == user.userId);
        if( userIndex == -1){
            data.push(user);
        }
        else{
            data[userIndex] = user;
        }
        const jsonData = JSON.stringify(data, null, 2); // Format the data in DB
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log('File successfully written!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

// Path to DB
const filePath = '../../db-users.json';

// Read data
const users = readJsonFile(filePath);
console.log('Users:', users);

// Add user to DB

writeJsonFile(filePath, users,  {
    "userId": "311176904726282242",
    "payment": true,
    "amount": 30000,
    "role": "Satoshi Nakamoto"
});
