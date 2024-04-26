import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContactEntity } from "./contact.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: "user"})
  role: string;

  @Column()
  phone_number: string;

  @OneToMany(()=>ContactEntity, (contact: ContactEntity)=>contact.user)
  contacts: ContactEntity[]



}