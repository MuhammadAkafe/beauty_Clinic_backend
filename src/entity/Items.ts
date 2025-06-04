import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Services } from "./Service";

@Entity("items")
export class Items {
    @PrimaryGeneratedColumn({ type: "integer" })
    item_id!: number;

    @ManyToOne(() => Services, (service) => service.items,{
        onDelete: "CASCADE",
        orphanedRowAction:"delete"
    })
    @JoinColumn({ name: "service_id" })
    service!: Services;

    @Column({ type: "text" })
    type!: string;

    @Column({ type: "integer" })
    price!: number;
}
