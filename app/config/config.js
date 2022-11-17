import { dataEnv } from './env.config.js';


export const db = {
    user: dataEnv.parsed.USERDB,
    host: dataEnv.parsed.HOSTDB,
    database: dataEnv.parsed.DATABASEDB,
    password: dataEnv.parsed.PASSWORDDB,
    portdb: dataEnv.parsed.PORTDB,
    key_email: dataEnv.parsed.SENDGRID_API_KEY,
};

export const api = {
    port: dataEnv.parsed.PORT,
};

export const awsKeys = {
    accessKeyId: dataEnv.parsed.ACCESSKEYID,
    secretAccessKey: dataEnv.parsed.SECRETACCESSKEY,
    awsBucketName: dataEnv.parsed.AWS_BUCKET_NAME
}