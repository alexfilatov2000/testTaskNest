import { Config } from '@src/interfaces/configuration';

const getEnvVar = (name: string, defaultValue?: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is not set`);
    }
    return defaultValue;
  }
  return value;
};

const getEnvVarAsNumber = (name: string, defaultValue?: number): number => {
  const value = getEnvVar(name, defaultValue?.toString());
  return parseInt(value, 10);
};

export default (): Config => ({
  port: getEnvVarAsNumber('PORT', 3000),
  database: {
    host: getEnvVar('DB_HOST'),
    port: getEnvVarAsNumber('DB_PORT', 5432),
    username: getEnvVar('DB_USERNAME'),
    password: getEnvVar('DB_PASSWORD'),
    database: getEnvVar('DB_DATABASE'),
    dialect: 'postgres',
    logging: false,
  },
  rootUser: {
    email: getEnvVar('ADMIN_EMAIL'),
    password: getEnvVar('ADMIN_PASSWORD'),
  },
});
