import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserType{
  user,
  admin,
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique:true
  })
  email: string;

  @Column({ 
    nullable: false , unique:true
 })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    default: false,
  })
  isActive: boolean;

  @Column({
    nullable: false,
    enum: UserType,
    default: UserType.user,
  })
  userType: UserType;

  @Column({
    default: 0.0,
  })
  walletBalance: number;
}
