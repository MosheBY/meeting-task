import configJson from "./config.json";

interface Config {
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  dbFileEncoding: BufferEncoding;
}

export const config = configJson as Config;
