import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, userRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { registerDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    private async verifyPasswordPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }

    private async generateAccessToken(user: User): Promise<string> {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        };
        return this.jwtService.sign(
            payload, {
            secret: "jwt_secret",
            expiresIn: '15m'
        }
        )
    }

    private async generateRefreshToken(user: User): Promise<string> {
        const payload = {
            sub: user.id
        }

        return this.jwtService.sign(
            payload, {
            secret: "refresh_secret",
            expiresIn: "7d"
        }
        )
    }

    private async generateToken(user: User) {
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user)
        }
    }

    async getUserById(userId: number) {
        const user = await this.UserRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new UnauthorizedException('user not found')
        }

        const { password, ...result } = user;

        return result;
    }

    async createUser(registerDto: registerDto) {
        const emailExist = await this.UserRepository.findOne({
            where: { email: registerDto.email }
        });

        if (emailExist) {
            throw new ConflictException('User already exist')
        }

        const hashedPassword = await this.hashPassword(registerDto.password);

        const newlyCreatedUser = this.UserRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: userRole.USER
        });

        const saveUser = await this.UserRepository.save(newlyCreatedUser);

        const { password, ...result } = saveUser;

        return {
            user: result,
            message: "user created successfully"
        }
    }

    async loginUser(userInfo: loginDto) {
        const userExist = await this.UserRepository.findOne({
            where: { email: userInfo.email }
        });

        if (!userExist || !(await this.verifyPasswordPassword(userInfo.password, userExist.password))) {
            throw new UnauthorizedException('user does not exist')
        }

        const { password, ...result } = userExist;
        const tokens = await this.generateToken(userExist);

        return {
            user: result,
            message: "user logged in successfuly",
            tokens
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: "refresh_secret",
            });

            const user = await this.UserRepository.findOne({
                where: { id: payload.sub }
            });

            if (!user) {
                throw new UnauthorizedException('invalid token')
            }

            const accessToken = this.generateAccessToken(user);

            return accessToken
        } catch (error) {
            throw new UnauthorizedException('invalid token')
        }
    }
}
