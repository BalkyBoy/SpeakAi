import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class CreatedUserDto{
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsNotEmpty()
    nativeLanguage: string;

    @IsNotEmpty()
    learningLanguage: string;

}