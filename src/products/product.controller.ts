import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.service.findAll();
    return {
      message: 'Productos obtenidos exitosamente',
      statusCode: HttpStatus.OK,
      data: products
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.findOne(id);
    return {
      message: 'Producto encontrado',
      statusCode: HttpStatus.OK,
      data: product
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto) {
    const product = await this.service.create(dto);
    return {
      message: 'Producto creado exitosamente',
      statusCode: HttpStatus.CREATED,
      data: product
    };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    const product = await this.service.update(id, dto);
    return {
      message: 'Producto actualizado exitosamente',
      statusCode: HttpStatus.OK,
      data: product
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
    return {
      message: 'Producto eliminado exitosamente',
      statusCode: HttpStatus.OK
    };
  }
}