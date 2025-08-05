import { IsString, IsNumber, IsOptional, IsNotEmpty, IsPositive, MinLength, IsUrl, IsObject } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    description?: string;

    @IsObject()
    @IsOptional()
    specifications?: Record<string, any>;

    @IsString()
    @IsOptional()
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    imageUrl?: string;

    @IsString()
    @IsOptional()
    @IsUrl({}, { message: 'La miniatura debe ser una URL válida' })
    thumb?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser mayor a 0' })
    price: number;

    @IsNumber({}, { message: 'El precio original debe ser un número' })
    @IsOptional()
    @IsPositive({ message: 'El precio original debe ser mayor a 0' })
    originalPrice?: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @IsPositive({ message: 'El stock debe ser mayor a 0' })
    stock: number;

    @IsNumber({}, { message: 'El ID de categoría debe ser un número' })
    @IsPositive({ message: 'El ID de categoría debe ser mayor a 0' })
    categoryId: number;

    @IsNumber({}, { message: 'El ID de subcategoría debe ser un número' })
    @IsOptional()
    @IsPositive({ message: 'El ID de subcategoría debe ser mayor a 0' })
    subcategoryId?: number;

    @IsNumber({}, { message: 'El ID de marca debe ser un número' })
    @IsPositive({ message: 'El ID de marca debe ser mayor a 0' })
    brandId: number;
}
  