import { Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn,
    UpdateDateColumn
 } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn({ type: "bigint" })
    user_id!: number;

    @Column({ type: "text" ,nullable: false})
    username!: string;

    @Column({ unique: true ,nullable: false})
    email!: string;

    @Column({ type: "text" ,nullable: false})
    password!: string;

    @Column({ type: "text" ,nullable: false, default: false})
    isAdmin!: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}
