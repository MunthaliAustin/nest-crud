import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(patient: Patient): Promise<Patient> {
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient | null> {
    return this.patientRepository.findOne({ where: { id } });
  }

  async update(id: number, patient: Patient): Promise<Patient> {
    await this.patientRepository.update(id, patient);
    const updatedPatient = await this.patientRepository.findOne({ where: { id } });
    if (!updatedPatient) {
      throw new Error(`Patient with id ${id} not found`);
    }
    return updatedPatient;
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}