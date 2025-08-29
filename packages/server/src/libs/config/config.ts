import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseURL: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

function requireEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`${key} is required but not defined in environment variables`);
  }
  return value;
}

const config: Config = {
  databaseURL: requireEnv(process.env.DATABASE_URL, 'DATABASE_URL'),
  cloudinary: {
    cloudName: requireEnv(process.env.CLOUDINARY_CLOUD_NAME, 'CLOUDINARY_CLOUD_NAME'),
    apiKey: requireEnv(process.env.CLOUDINARY_API_KEY, 'CLOUDINARY_API_KEY'),
    apiSecret: requireEnv(process.env.CLOUDINARY_API_SECRET, 'CLOUDINARY_API_SECRET'),
  },
};

export default config;
