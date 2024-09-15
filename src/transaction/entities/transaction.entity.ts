import { Service } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    price:number

    @ManyToOne(()=>Service)
    @JoinColumn()
    service:Service

    @ManyToOne(()=>UserEntity)
    @JoinColumn()
    user:UserEntity

    // one to one with refundRequest
}