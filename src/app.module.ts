import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { Patient } from './entities/patient.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or another supported database
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'patientlog',
      entities: [Patient],
      synchronize: true, // ONLY FOR DEVELOPMENT - NEVER USE IN PRODUCTION
    }),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
