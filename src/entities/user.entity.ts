import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { CartItem } from './cart-item.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => CartItem, cart => cart.user)
  cart: CartItem[];

  @Column({ default: 'cliente' }) // valor por defecto si no se define
  role: string;
}