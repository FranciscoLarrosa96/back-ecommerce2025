import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { CartItem } from './cart-item.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, cart => cart.product)
  cartItems: CartItem[];
}