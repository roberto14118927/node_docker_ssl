import { createServer } from 'http';
import { api } from './config/config.js';
import swaggerDocs from './config/swagger.config.js';

import express from 'express';
import cors from 'cors';
import apicache from 'apicache';

import onboarding from './routes/onboarding.routes.js';
import user from './routes/user.routes.js';
import admin from './routes/admin.routes.js';

const cache = apicache.middleware;
const app = express();

const httpServer = createServer(app);

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/api/boarding', onboarding);
app.use('/api/user', user);
app.use('/api/admin', admin);


// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});