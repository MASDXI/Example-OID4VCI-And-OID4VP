import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as mockUser from './mocks/mock-data-holder.json';

interface MockUser {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = mockUser as MockUser;

    if (user.email === email && user.password === password) {
      // Check if holder exists
      let holder = await this.prisma.holder.findUnique({
        where: { id: email },
      });

      if (holder) {
        return holder.email;
      }

      const newHolder = await this.prisma.holder.create({
                data: {
                    id: email,
                    email: email,
                },
            });

      console.log(newHolder);
      return newHolder.email;
    } else {
      return null;
    }
  }
}
