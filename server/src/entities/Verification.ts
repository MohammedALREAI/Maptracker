import { TargetType } from "../types/type";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

@Entity()
export class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text" })
  key: string;
  @Column({ type: "boolean", default: false })
  verified: boolean;
  @Column({ type: "enum", enum: TargetType, default: TargetType.Email })
  target: TargetType;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  createKey(): void {
    ///this to genarate random nummber fro key
    //     to genarate  four number to varification ex key =5487
    if (this.target === TargetType.Phone) {
      this.key = Math.floor(Math.random() * Math.pow(10, 5)).toString();
    } else if (this.target === TargetType.Email) {
      //email
      //   this to genarate more the five number for key
      this.key = Math.random().toString(36).substr(2);
    }
  }
}
