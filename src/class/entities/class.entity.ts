import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, type: 'varchar' })
  name: string;
  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
