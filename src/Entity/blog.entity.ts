import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

}