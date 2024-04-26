import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserEntity) private repo:Repository <UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sourav',
    });
  }

  async validate(payload: {email:string}) {

    const {email} = payload;
    
    const user = await this.repo.findOne({where: {email: email}})

    if(!user){
        throw new UnauthorizedException('User not match')
    }

    return user
    // return { userId: payload.sub, username: payload.username };
  }

//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
}