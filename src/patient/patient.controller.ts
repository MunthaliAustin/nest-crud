import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common'; // Import ParseIntPipe and NotFoundException
import { PatientService } from './patient.service';
import { Patient } from 'src/entities/patient.entity';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() patient: Patient): Promise<Patient> {
    return this.patientService.create(patient);
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Patient> { // Use ParseIntPipe
    const patient = await this.patientService.findOne(id);
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

   @Patch(':id') // 
  async update(
    @Param('id', ParseIntPipe) id: number, // Use ParseIntPipe
    @Body() patient: Patient,
  ): Promise<Patient> {
    return this.patientService.update(id, patient);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> { // Use ParseIntPipe
    await this.patientService.remove(id);
  }
}
