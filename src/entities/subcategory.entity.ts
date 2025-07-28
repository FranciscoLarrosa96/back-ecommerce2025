import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "./category.entity";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, cat => cat.id)
  category: Category;

  @OneToMany(() => Product, product => product.subcategory)
  products: Product[];
}
