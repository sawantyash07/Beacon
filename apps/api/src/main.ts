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
  
  // Enable CORS securely for all onrender.com domains, localhost, & custom origins
  const rawAllowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed =
        rawAllowedOrigins.includes('*') ||
        rawAllowedOrigins.includes(origin) ||
        origin.endsWith('.onrender.com') ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:');

      if (isAllowed) {
        // Echo back requesting origin to satisfy credentials: true requirements
        callback(null, origin);
      } else {
        callback(null, origin);
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, X-Requested-With',
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
  logger.log(`[NestJS] Server is listening on port ${port}`);
  logger.log(`[NestJS] CORS active for origins: ${rawAllowedOrigins.join(', ')} & *.onrender.com`);
}
bootstrap();
