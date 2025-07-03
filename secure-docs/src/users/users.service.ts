import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserInput.email,
        password: hashedPassword,
        role: createUserInput.role ?? 'user',
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
