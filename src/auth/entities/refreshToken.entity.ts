import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false , unique:true})
    refreshToken:string

    @Column({nullable:false})
    expiryDate:Date

    @OneToOne(()=>UserEntity)
    @JoinColumn()
    user:UserEntity
}