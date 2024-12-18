import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'classid' })
  class: Class;
}
