import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateProductDto): Promise<Product> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  update(id: number, data: UpdateProductDto): Promise<Product> {
    return this.repo.save({ id, ...data });
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}