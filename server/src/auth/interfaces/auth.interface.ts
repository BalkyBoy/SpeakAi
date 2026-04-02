import type { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
export interface AuthenticatedRequest extends ExpressRequest {
  user: User;
}
