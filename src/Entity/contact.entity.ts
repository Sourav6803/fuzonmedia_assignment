import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('contacts')
export class ContactEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  
  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  postalCode: string;

  @ManyToOne(()=>UserEntity, (user: UserEntity)=>user.contacts)
  user: UserEntity

  @Column()
  userId: number
}