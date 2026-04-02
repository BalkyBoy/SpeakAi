import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { User } from "@prisma/client";
import { ClsService } from 'nestjs-cls'
import { Observable } from "rxjs";
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (user) {
      this.cls.set('user', user);
    }

    return next.handle();
  }
}
