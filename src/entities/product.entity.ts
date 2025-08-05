import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { CartItem } from './cart-item.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';
import { Brand } from './brand.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  thumb: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  originalPrice: number;

  @Column()
  stock: number;


  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  @ManyToOne(() => Subcategory, sub => sub.products, { nullable: true })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @Column({ nullable: true })
  subcategoryId?: number;

  @ManyToOne(() => Brand, brand => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: number;

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, cart => cart.product)
  cartItems: CartItem[];
}