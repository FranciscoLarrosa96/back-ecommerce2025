import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 👉 Crea el decorador @CurrentUser(), para sacar fácil el req.user del token.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // user es lo que retorna JwtStrategy.validate()
  },
);