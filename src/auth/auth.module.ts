import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'secretoUltraSecreto123',
        signOptions: { expiresIn: '1h' },
    }),],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { 
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService
      ) {}      
}