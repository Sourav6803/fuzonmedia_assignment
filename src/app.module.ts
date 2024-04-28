import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './Entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './Email/email.module';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './Entity/contact.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      url: 'postgres://postgres:Sourav6803@@postgres:5432/fuzonmedia',
      // port: 3306,
      port: 5432,
      username: 'postgres',
      password: 'Sourav6803@',
      database: 'fuzonmedia',
      autoLoadEntities: true,
      entities: [UserEntity, ContactEntity],
      synchronize: true,
  }),  AuthModule,  EmailModule, ContactModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

