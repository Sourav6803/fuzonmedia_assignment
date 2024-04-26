import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './Entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './Email/email.module';
import { ContactModule } from './contact/contact.module';
import { BlogModule } from './blog/blog.module';
import { ContactEntity } from './Entity/contact.entity';
import { BlogEntity } from './Entity/blog.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      // url: 'postgres://postgres:Sourav6803@@postgres:5432/postgres',
      // port: 3306,
      port: 5432,
      username: 'postgres',
      password: 'Sourav6803@',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [UserEntity, ContactEntity, BlogEntity],
      synchronize: true,
  }), UserModule, AuthModule,  EmailModule, ContactModule, BlogModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

