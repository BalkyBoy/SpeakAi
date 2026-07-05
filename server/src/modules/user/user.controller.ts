import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('profile')
  profile(@CurrentUser() user: User) {
    console.log('Current user:', user);
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
  @Put(':userId')
  updateUserProfile(
    @Param('userId') userId: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUserProfile(userId, data);
  }
}
