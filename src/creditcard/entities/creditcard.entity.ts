import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreditCard{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false , default:0.0})
    balance:number

    @Column({nullable:false})
    cardNumber:string

    @Column({nullable:false})
    nameOnCard:string

    @Column({nullable:false})
    expiryDate:string

    @Column({nullable:false})
    cvv:string

    @ManyToOne(() => UserEntity)
    @JoinColumn({name:"user_id" , referencedColumnName:"id"})
    user:UserEntity
}