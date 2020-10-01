import { Length, IsEmail, IsString } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import bcrypt from "bcrypt";
const RANDAM_PASSWORD = 10;
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: Number;

  @Column({ type: "text", unique: true })
  email: string;
  @IsEmail()
  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;
  @Column({ type: "text", nullable: false })
  @Length(5, 20)
  firstName: string;
  @Column({ type: "text", nullable: false })
  @Length(5, 20)
  lastName: string;
  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text" })
  @IsString()
  password: string;

  @Column({ type: "string", nullable: true })
  phoneNumber: string;
  @Column({ type: "string", default: false })
  verifiedPhone: boolean;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;
  @Column({ type: "boolean", default: false })
  iRiding: boolean;
  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;
  @Column({ type: "double precision", default: 0 })
  lastLat: number;
  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  get fullName(): string {
    return `{this.firstName} ${this.lastName}`;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, RANDAM_PASSWORD);
  }

  public comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
  @CreateDateColumn({ type: "date", default: new Date() })
  createdAt: Date;
  @UpdateDateColumn() updatedAt: string;
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hash = await this.hashPassword(this.password);
      this.password = hash;
    }
  }
}
