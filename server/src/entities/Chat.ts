import { User, Message, Ride } from "./index";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany((type) => Message, (message) => message.chat, { nullable: true })
  messages: Message[];

  @Column({ nullable: true, type: "number" })
  passengerId: number;

  @ManyToOne((type) => User, (user) => user.chatsAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  rideId: number;

  @OneToOne((type) => Ride, (ride) => ride.chat)
  ride: Ride;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne((type) => User, (user) => user.chatsAsDriver)
  driver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
