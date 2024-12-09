import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { authRoute } from './routes/auth';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app.basePath('/api').route('/', authRoute);

app.get('*', serveStatic({ root: '.rontend/dist' }));
app.get('*', serveStatic({ path: '../frontend/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;
