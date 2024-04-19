import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  import { ROLES_KEY } from '../decorators/role.decorator';
  import { Roles } from '../enums/roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
  
      const req = context.switchToHttp().getRequest();
      const { user } = req;
      if (!user || !requiredRoles.some((role) => user.role === role)) {
        throw new UnauthorizedException('У вас недостаточно прав');
      }
  
      return true;
    }
  }