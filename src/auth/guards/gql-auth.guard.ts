import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@prisma/client';
import { IncomingHttpHeaders } from 'http';
import { PrismaService } from 'src/prisma/prisma.service';
// import { SessionService } from 'src/session/session.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly session: SessionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const execCtx = GqlExecutionContext.create(context);
    const ctx = execCtx.getContext();
    const authToken = ctx.authToken;

    const user = await this.session.getUserFromAuthToken({
      authToken: authToken,
      roles: [UserType.APP_USER],
    });
    ctx.user = user;
    return true;
  }
}

/* extract bearer token */
export function extractBearerToken(headers: IncomingHttpHeaders) {
    if (headers?.authorization) {
      const tokenArray = headers.authorization.split(' ');
      return tokenArray[0] === 'Bearer' ? tokenArray[1] : null;
    } else return null;
  }

  
  @Injectable()
  export class SessionService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService
    ) {}
  
    async getUserFromAuthToken({ authToken, roles }: { authToken: string; roles: UserType[] }): Promise<any> {
      try {
        // Verify the JWT token
        const payload = await this.jwtService.verifyAsync(authToken);
  
        // Fetch the user from the database
        const user = await this.prisma.user.findUnique({
          where: { id: payload.sub },
        });
  
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
  
        // Check if the user has the required role
        if (roles.length > 0 && !roles.includes(user.userType)) {
          throw new UnauthorizedException('User does not have the required role');
        }
  
        return user;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }