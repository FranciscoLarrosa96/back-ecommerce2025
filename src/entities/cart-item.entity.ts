import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cart)
  user: User;

  @ManyToOne(() => Product, product => product.cartItems)
  product: Product;

  @Column()
  quantity: number;
}