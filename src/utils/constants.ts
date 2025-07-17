import dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST;
const port = parseInt(process.env.PORT);
const jwtSecret = process.env.JWT_SECRET_KEY;
const rpcKey = process.env.RPC_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const nodeEnv = process.env.NODE_ENV;
const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT);
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const corsOrigin = process.env.CORS_ORIGIN;

export {
  contractAddress,
  corsOrigin,
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUsername,
  host,
  jwtSecret,
  nodeEnv,
  port,
  privateKey,
  rpcKey,
};
