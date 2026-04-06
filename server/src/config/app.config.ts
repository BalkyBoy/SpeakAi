
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
}));