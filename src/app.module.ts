import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
      process.env.MONGOURL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: true,
      logging: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TasksModule],

})
export class AppModule {}
