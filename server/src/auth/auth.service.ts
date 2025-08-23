import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService}  from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    private SALT_ROUNDS = 12;

    async register(payload: {
        email: string;
        password: string;
        nativeLanguage:string;
        learningLanguage:string;
    }) {
        if (payload.nativeLanguage === payload.learningLanguage) {
            throw new BadRequestException('Native and Learning language cannot be the same');
        }

        const existing = await this.usersService.findByEmail(payload.email);
        if (existing) throw new BadRequestException('Email already in use');

        const passwordHash = await bcrypt.hash(payload.password, this.SALT_ROUNDS);

        const user = await this.usersService.create({
            email: payload.email.toLowerCase(),
            passwordHash,
            nativeLanguage: payload.nativeLanguage,
            learningLanguage: payload.learningLanguage,
        });

        const token = this.jwtService.sign({sub: user.id, email: user.email});
        return {user: {...user, passwordHash: undefined}, token}
    }
}
