import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceProvider {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

}