import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'pendiente' })
  status: string;
}