import { ServiceProvider } from "src/serviceprovider/entities/serviceprovider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ServiceType{
    mobileRecharge,
    internetPayment,
    landline,
    donation
}

@Entity()
export class Service{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    code:string

    @Column({nullable:false , enum: ServiceType})
    serviceType:ServiceType

    @ManyToOne(()=> ServiceProvider)
    @JoinColumn({name:"provider_id" , referencedColumnName:"id"})
    serviceProvider:ServiceProvider
}