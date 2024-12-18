import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Class } from '../class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    throw new Error('Method not implemented.');
    return await this.studentRepository.find({ relations: ['class'] });
  }

  async getStudentById(id: number): Promise<Student> {
    const exitedStudent = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['class'],
    });
    if (!exitedStudent) {
      throw new Error(`Student ${id} not found`);
    }
    return exitedStudent;
  }

  async getStudentByName(name: string): Promise<Student[]> {
    console.log(name);
    const exitedStudent: Student[] = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.class', 'class')
      .where('student.name ILIKE :name', { name: `%${name}%` })
      .getMany();
    if (!exitedStudent) {
      throw new Error(`Student ${name} not found`);
    }
    return exitedStudent;
  }

  async getStudentByClass(studentClass: string): Promise<Student[]> {
    const classofStudent = await this.classRepository.findOne({
      where: { name: studentClass },
    });
    if (!classofStudent) {
      throw new Error('Class not found');
    }
    return this.studentRepository.find({
      where: { class: { name: studentClass } },
      relations: ['class'],
    });
  }

  async createStudent(createData: {
    name: string;
    className: string;
  }): Promise<Student> {
    const { name, className } = createData;
    console.log(className);
    const classofStudent = await this.classRepository.findOne({
      where: { name: className },
    });
    console.log(classofStudent);
    if (!classofStudent) {
      throw new Error('Class not found');
    }
    const existedStudent = await this.studentRepository.findOne({
      where: { name: name },
    });
    if (existedStudent) {
      throw new Error(`Student ${name} existed`);
    }
    const newStudent = this.studentRepository.create({
      name,
      class: classofStudent,
    });
    return await this.studentRepository.save(newStudent);
  }

  async updateStudent(
    id: number,
    updateData: { name?: string; className?: string },
  ): Promise<Student> {
    console.log(updateData);
    const studentToUpdate = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['class'],
    });
    if (!studentToUpdate) {
      throw new Error(`Student ${id} not found`);
    }
    console.log(updateData.className);
    if (updateData.className) {
      const classofStudent = await this.classRepository.findOne({
        where: { name: updateData.className },
      });
      if (!classofStudent) {
        throw new Error('Class not found');
      }
      studentToUpdate.class = classofStudent;
    }
    studentToUpdate.name = updateData.name || studentToUpdate.name;
    return await this.studentRepository.save(studentToUpdate);
  }

  async deleteStudent(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['class'],
    });
    if (!student) {
      throw new Error(`Student ${id} not found`);
    }
    return await this.studentRepository.remove(student);
  }
}
