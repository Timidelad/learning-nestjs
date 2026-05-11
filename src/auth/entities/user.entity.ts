import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum userRole {
    USER = "user",
    ADMIN = "admin"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    name!: string

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.USER
    })
    role!: userRole

    @OneToMany(() => Post, (post) => post.authorName)
    posts!: Post[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}