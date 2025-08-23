import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserDto } from './dto/created-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: CreatedUserDto) {
        const result = await this.authService.register(dto);
        return result;
    }
}
