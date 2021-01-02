import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entity/User.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    delete req.user.iat
    delete req.user.exp
    return req.user;
});