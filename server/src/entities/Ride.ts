import { StatusState } from "../types/type";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User, Chat } from "./index";
@Entity()
export class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "enum", enum: StatusState, default: StatusState.REQUESTING })
  status: StatusState;

  @Column({ type: "text" })
  pickUpAddress: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;

  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;

  @Column({ type: "text" })
  dropOffAddress: string;

  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;

  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text" })
  distance: string;

  @Column({ type: "text" })
  duration: string;

  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne((type) => User, (user) => user.ridesAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne((type) => User, (user) => user.ridesAsDriver, { nullable: true })
  driver: User;

  @Column({ nullable: true })
  chatId: number;

  @OneToOne((type) => Chat, (chat) => chat.ride, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
