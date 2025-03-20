import pino, { Logger } from 'pino';

export function setupLogger(): Logger {
  return pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });
}
