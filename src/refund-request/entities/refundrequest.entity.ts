import { Transaction } from "src/transaction/entities/transaction.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefundRequest{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    reason:string

    @OneToOne(()=>Transaction)
    @JoinColumn()
    transaction:Transaction
}