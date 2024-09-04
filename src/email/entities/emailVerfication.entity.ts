import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmailVerification{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    verificationToken:string

    @Column({nullable:false})
    expiryDate:Date

    @OneToOne(()=>UserEntity)
    @JoinColumn()
    user:UserEntity
}