/**
 * MongoDB Configuration
 * Auto-switch between local and production based on NODE_ENV
 */

export const getMongoURI = (): string => {
  const env = process.env.NODE_ENV || 'development';

  if (env === 'production') {
    return process.env.MONGO_URI_PRO || process.env.DATABASE_URL || '';
  }

  return process.env.MONGO_URI || process.env.DATABASE_URL || '';
};

export const mongoConfig = {
  uri: getMongoURI(),
  options: {
    retryWrites: true,
    w: 'majority',
  },
};

// Log current MongoDB URI (hide credentials)
const maskUri = (uri: string) => {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
};

if (process.env.NODE_ENV !== 'production') {
  console.log(`[MongoDB] Environment: ${process.env.NODE_ENV}`);
  console.log(`[MongoDB] Using: ${maskUri(mongoConfig.uri)}`);
}
