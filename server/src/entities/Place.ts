import { User } from "./index";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "text" })
  name: string;
  @Column({ type: "text" })
  address: string;
  @Column({ type: "double precision", default: 0 })
  lat: number;
  @Column({ type: "double precision", default: 0 })
  lag: number;
  @Column({ type: "boolean", default: false })
  isFav: boolean;
  @Column({ nullable: true })
  userId: number;
  @ManyToOne((type) => User, (user) => user.places)
  user: User;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
