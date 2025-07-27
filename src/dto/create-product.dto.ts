import { IsString, IsNumber, IsOptional, IsNotEmpty, IsPositive, MinLength, IsUrl } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    description?: string;

    @IsString()
    @IsOptional()
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    image?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser mayor a 0' })
    price: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @IsPositive({ message: 'El stock debe ser mayor a 0' })
    stock: number;
  }
  