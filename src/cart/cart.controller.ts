import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(
        @InjectRepository(CartItem) private readonly cartRepo: Repository<CartItem>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    @Get()
    getCart(@CurrentUser() user: User) {
        return this.cartRepo.find({ where: { user: { id: user.id } }, relations: ['product'] });
    }

    @Post()
    async addToCart(@CurrentUser() user: User, @Body() dto: AddToCartDto) {
        const product = await this.productRepo.findOneBy({ id: dto.productId });

        if (!product) {
            throw new BadRequestException('El producto no existe');
        }

        if (product.stock < dto.quantity) {
            throw new BadRequestException('No hay suficiente stock disponible');
        }

        let item = await this.cartRepo.findOne({
            where: {
                user: { id: user.id },
                product: { id: dto.productId },
            },
            relations: ['user', 'product'],
        });

        if (item) {
            const nuevaCantidad = item.quantity + dto.quantity;
            if (nuevaCantidad > product.stock) {
                throw new BadRequestException('Cantidad excede el stock disponible');
            }
            item.quantity = nuevaCantidad;
        } else {
             /**
         * TypeORM te deja usar "referencias por ID" cuando creás una entidad relacionada.
        No necesitas pasar todo el objeto user o product, solo { id: ... } es suficiente y más limpio.
         */
            item = this.cartRepo.create({
                user: { id: user.id },
                product: { id: product.id },
                quantity: dto.quantity,
            });
        }

        return this.cartRepo.save(item);
    }


    @Put(':id')
    updateQuantity(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartDto) {
        return this.cartRepo.update(id, { quantity: dto.quantity });
    }

    @Delete(':id')
    removeItem(@Param('id', ParseIntPipe) id: number) {
        return this.cartRepo.delete(id);
    }
}