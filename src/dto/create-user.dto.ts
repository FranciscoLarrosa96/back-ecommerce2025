// src/dto/create-user.dto.ts
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: string; // opcional si querés que se asigne
  }
  