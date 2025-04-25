import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Controller('perfil')
@UseGuards(JwtAuthGuard)
export class PerfilController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * 👉 Es el guardia de seguridad que protege rutas con JWT.
    Lo usás con @UseGuards(JwtAuthGuard)
    Solo deja pasar si hay un token válido.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getPerfil(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async actualizarPerfil(@CurrentUser() user: User, @Body() body: Partial<User>) {
    await this.userRepo.update(user.id, body);
    return { mensaje: 'Perfil actualizado correctamente' };
  }
}
