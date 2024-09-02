import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum userTypes {
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
    enum: userTypes,
    default: userTypes.user,
  })
  userType: userTypes;

  @Column({
    default: 0.0,
  })
  walletBalance: number;
}
