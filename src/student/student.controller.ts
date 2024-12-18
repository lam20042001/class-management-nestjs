import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { DeleteStudentDto } from './dtos/delete-student.dto';
import { GetStudentByIdDto } from './dtos/get-student-id.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('student')
@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Roles('admin', 'principal')
  @Get('/')
  async getAllStudents(): Promise<any> {
    return this.StudentService.getAllStudents();
  }

  @Roles('admin', 'principal')
  @Post('/id')
  async getStudentById(
    @Body() getStudentByIdDto: GetStudentByIdDto,
  ): Promise<any> {
    return this.StudentService.getStudentById(getStudentByIdDto.id);
  }

  @Roles('admin', 'principal')
  @Get('/name/:name')
  async getStudentByName(@Param('name') name: string): Promise<any> {
    return this.StudentService.getStudentByName(name);
  }

  @Roles('admin', 'principal')
  @Get('class/:studentClass')
  async getStudentByClass(
    @Param('studentClass') studentClass: string,
  ): Promise<any> {
    console.log(studentClass);
    return this.StudentService.getStudentByClass(studentClass);
  }

  @Roles('admin')
  @Post('create')
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<any> {
    return this.StudentService.createStudent({
      name: createStudentDto.name,
      className: createStudentDto.className,
    });
  }

  @Roles('admin', 'teacher')
  @Put('update')
  async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<any> {
    console.log(updateStudentDto);
    return this.StudentService.updateStudent(updateStudentDto.id, {
      name: updateStudentDto.name,
      className: updateStudentDto.className,
    });
  }

  @Roles('admin')
  @Delete('delete')
  async deleteStudent(
    @Body() deleteStudentDto: DeleteStudentDto,
  ): Promise<any> {
    return this.StudentService.deleteStudent(deleteStudentDto.id);
  }
}
