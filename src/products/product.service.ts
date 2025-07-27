import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    try {
      const product = this.repo.create(data);
      return await this.repo.save(product);
    } catch (error) {
      if (error.code === '23505') { // Código de error de PostgreSQL para unique constraint
        throw new ConflictException(`Ya existe un producto con el nombre "${data.name}"`);
      }
      throw error;
    }
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id); // Verifica que existe
    try {
      return await this.repo.save({ ...product, ...data });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Ya existe un producto con el nombre "${data.name}"`);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const product = await this.findOne(id); // Verifica que existe
    await this.repo.delete(id);
  }
}