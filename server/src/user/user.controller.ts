import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

@Get('profile')
  profile(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      nativeLanguage: user.nativeLanguage,
      learningLanguage: user.learningLanguage,
      isEmailVerified: user.isEmailVerified,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Put(':userId')
  updateUserProfile(@Param('userId') userId: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUserProfile(userId, data);

  };
}
