import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { User } from "@prisma/client";
import { ClsService } from 'nestjs-cls'
import { Observable } from "rxjs";
@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (user) {
      this.cls.set('user', user);
    }

    return next.handle();
  }
}
