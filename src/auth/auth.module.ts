import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { JwtCustomStrategy } from './jwt-custom.strategy';
import {JwtStrategy} from "./jwt.strategy"

@Module({
  imports: [
    TypeOrmModule.forFeature( [UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'sourav',
      signOptions: {
        // algorithm: 'HS512',
        expiresIn: '5d'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
