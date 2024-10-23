// User type for saving in DB
interface User {
    userId: string;
    payment: boolean;
    amount: number;
    role: Role;
}

// Type of Roles
type Role = "Satoshi Nakamoto" | "USDT" | "Bitcoin" | "Ethereum";

export { User }