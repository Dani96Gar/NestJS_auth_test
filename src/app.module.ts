import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { Auth } from './auth/entities/auth.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TasksModule, AuthModule, UsersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432, // Puerto predeterminado de PostgreSQL
    username: 'postgres',
    password: 'ppp999JJ',
    database: 'nestdb',
    entities: [Task, User, Auth], // Asegúrate de añadir tus entidades
    synchronize: true, // Solo en desarrollo, para sincronizar la base de datos con tus entidades
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
