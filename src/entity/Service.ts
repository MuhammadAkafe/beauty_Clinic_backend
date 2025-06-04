import { Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
 } from "typeorm";
import { Items } from "./Items";

@Entity("services")
export class Services {
    @PrimaryGeneratedColumn({ type: "integer" })
    service_id!: number;

    @Column({ type: "text" })
    title!: string;

    @Column({ type: "text" })
    sub_title!: string;

    @OneToMany(() => Items, (item) => item.service,{
        orphanedRowAction:"delete"
    })
    items!: Items[];

    @Column({type:"text",default:"جلسه"})
    status!: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}
