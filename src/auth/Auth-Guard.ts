import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  import * as jwt from 'jsonwebtoken';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      if (request) {
        if (!request.headers.authorization) {
          return false;
        }
        request.user = await this.validateToken(request.headers.authorization);
        return true;
      }
    }
  
    async validateToken(auth: string) {
      const l = ['Bearer', 'bearer'];
      if (!l.includes(auth.split(' ')[0])) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      const token = auth.split(' ')[1];

      try {
        const decoded: any = await jwt.verify(
          token,
          process.env.JWT ,
        );
  
        return decoded;
      } catch (err) {
        const message = 'Token error: ' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.UNAUTHORIZED);
      }
    }
  }