import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client'; // Gives access to correct types like Prisma.UserCreateInput

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create new user
  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  // Get all users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Get user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
