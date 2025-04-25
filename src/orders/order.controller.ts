import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
    ) { }

    @Get()
    @Roles('cliente', 'admin')
    async getOrders(@CurrentUser() user: User) {
        return this.orderRepo.find({
            where: { user: { id: user.id } },
            relations: ['items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
    }

    @Get('/admin/all')
    @Roles('admin')
    async getAllOrders() {
        return this.orderRepo.find({
            relations: ['user', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
    }

    /**
     * ✅ Con esto:
     - Las órdenes tienen un campo `status` con valor por defecto: `'pendiente'`
     - `PATCH /orders/:id/status` permite actualizarlo (solo admin)
     * @param id 
     * @param body 
     * @returns 
     */
    @Patch(':id/status')
    @Roles('admin')
    async actualizarEstado(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }) {
        const estadosValidos = ['pendiente', 'enviado', 'cancelado'];

        if (!estadosValidos.includes(body.status)) {
            throw new BadRequestException(`Estado inválido. Solo se permite: ${estadosValidos.join(', ')}`);
        }

        await this.orderRepo.update(id, { status: body.status });
        return { mensaje: 'Estado actualizado correctamente' };
    }


    /**
     * 📈 GET /orders/admin/stats para admins:

     Total de pedidos
     
     Ingresos totales 💸
     
     Top 5 productos más vendidos 🛒🔥
     * @returns 
     */
    @Get('/admin/stats')
    @Roles('admin')
    async getStats() {
        const totalOrders = await this.orderRepo.count();

        const revenueResult = await this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.items', 'item')
            .leftJoin('item.product', 'product')
            .select('SUM(item.quantity * product.price)', 'total')
            .getRawOne();

        const topProducts = await this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.items', 'item')
            .leftJoin('item.product', 'product')
            .select('product.name', 'name')
            .addSelect('SUM(item.quantity)', 'totalSold')
            .groupBy('product.name')
            .orderBy('totalSold', 'DESC')
            .limit(5)
            .getRawMany();

        return {
            totalOrders,
            totalRevenue: parseFloat(revenueResult.total || 0),
            topProducts,
        };
    }

}