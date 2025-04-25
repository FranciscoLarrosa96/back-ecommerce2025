import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>,private jwtService: JwtService) {}

  async register(data: CreateUserDto): Promise<User> {
    const existing = await this.repo.findOneBy({ email: data.email });
    if (existing) throw new BadRequestException('Email ya está registrado');
  
    // 🚨 Evitamos que se autoasigne como admin
    if (data.role && data.role === 'admin') {
      throw new BadRequestException('No podés asignarte como admin');
    }
  
    const hashed = await bcrypt.hash(data.password, 10);
  
    const user = this.repo.create({
      ...data,
      password: hashed,
      role: data.role || 'cliente', // 👈 default a cliente si no se pasa
    });
  
    return this.repo.save(user);
  }
  

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.repo.findOneBy({ email });
    if (!user) throw new BadRequestException('Usuario no encontrado');
  
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new BadRequestException('Contraseña incorrecta');
  
    const payload = { sub: user.id, email: user.email, role: user.role }; // 👈 Agregamos el role
    const token = await this.jwtService.signAsync(payload);
  
    return { token };
  }
  
}