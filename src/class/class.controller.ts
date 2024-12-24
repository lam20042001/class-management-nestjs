import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dtos/create-class.dto';
import { UpdateClassDto } from './dtos/update-class.dto';
import { DeleteClassDto } from './dtos/delete-class.dto';
import { GetClassByIdDto } from './dtos/get-class-id.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('class')
@UseGuards(RolesGuard)
export class ClassController {
  constructor(private classService: ClassService) {}

  @Roles('admin', 'principal', 'teacher')
  @Get('/')
  async getAllClasses(): Promise<any> {
    return this.classService.getAllClasses();
  }

  @Roles('admin', 'principal', 'teacher')
  @Post('/id')
  async getClassById(@Body() getClassByIdDto: GetClassByIdDto): Promise<any> {
    return this.classService.getClassById(getClassByIdDto.id);
  }

  @Roles('admin', 'principal')
  @Post('create')
  async createClass(@Body() createClassDto: CreateClassDto): Promise<any> {
    return this.classService.createClass({ name: createClassDto.name });
  }

  @Roles('admin', 'principal')
  @Put('update')
  async updateClass(@Body() updateClassDto: UpdateClassDto): Promise<any> {
    return this.classService.updateClass(updateClassDto.id, {
      name: updateClassDto.name,
    });
  }

  @Roles('admin', 'principal')
  @Delete('delete')
  async deleteClass(@Body() deleteClassDto: DeleteClassDto): Promise<any> {
    return this.classService.deleteClass(deleteClassDto.id);
  }
}
