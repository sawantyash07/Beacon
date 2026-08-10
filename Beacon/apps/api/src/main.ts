import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import * as net from 'net';

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}

async function findAvailablePort(startPort: number, maxAttempts = 10): Promise<number> {
  let port = startPort;
  for (let i = 0; i < maxAttempts; i++) {
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }
  return port;
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  // Enable CORS securely
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:5174'];

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes('*') ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    optionsSuccessStatus: 204,
  });

  const desiredPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  let port = desiredPort;

  if (!(await isPortAvailable(port))) {
    logger.warn(`[Bootstrap] Port ${port} is currently in use.`);
    port = await findAvailablePort(port + 1);
    logger.warn(`[Bootstrap] Gracefully listening on fallback port ${port}`);
  }

  await app.listen(port);
  logger.log(`[NestJS] MongoDB Atlas connected successfully.`);
  logger.log(`[NestJS] Server is listening on http://localhost:${port}`);
  logger.log(`[NestJS] Auth Endpoints: http://localhost:${port}/auth/register, http://localhost:${port}/auth/login, http://localhost:${port}/auth/profile`);
}
bootstrap();
