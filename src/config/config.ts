import * as dotenv from "dotenv";
import * as path from "path";
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
const botToken = process.env["bot-token"];
const zbdToken = process.env["zbd-token"];
const env = process.env;
export { botToken, zbdToken, env }