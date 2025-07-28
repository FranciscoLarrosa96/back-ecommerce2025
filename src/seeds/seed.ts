import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { Category } from '../entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { Brand } from '../entities/brand.entity';
import { Product } from '../entities/product.entity'; // si después seedás productos
import { OrderItem } from '../entities/order-item.entity';
import { CartItem } from '../entities/cart-item.entity';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: false,

    entities: [
        Category,
        Subcategory,
        Brand,
        Product,
        OrderItem,
        CartItem,
        User,
        Order
    ],
    synchronize: true, // debe estar en false en prod
});

async function seed() {
    await AppDataSource.initialize();

    const filePath = path.join(__dirname, 'seed-data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const categoryRepo = AppDataSource.getRepository(Category);
    const subcategoryRepo = AppDataSource.getRepository(Subcategory);
    const brandRepo = AppDataSource.getRepository(Brand);

    // CATEGORÍAS
    for (const cat of data.categories) {
        const exists = await categoryRepo.findOne({ where: { name: cat.name } });
        if (!exists) {
            await categoryRepo.save(categoryRepo.create({ name: cat.name }));
        }
    }

    // SUBCATEGORÍAS
    for (const sub of data.subcategories) {
        const category = await categoryRepo.findOne({ where: { name: sub.categoryName } });
        if (!category) {
            console.warn(`Categoría no encontrada para subcategoría: ${sub.name}`);
            continue;
        }
        const exists = await subcategoryRepo.findOne({ where: { name: sub.name } });
        if (!exists) {
            await subcategoryRepo.save(subcategoryRepo.create({
                name: sub.name,
                category,
            }));
        }
    }

    // MARCAS
    for (const brand of data.brands) {
        const exists = await brandRepo.findOne({ where: { name: brand.name } });
        if (!exists) {
            await brandRepo.save(brandRepo.create({ name: brand.name }));
        }
    }

    console.log('✅ Seed completado');
    process.exit();
}

seed().catch(err => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
});
