import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/Email/email.service';
import { ActivationDto } from 'src/DTO/activation.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) private repo:Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  

  async registerUser(registerDTO: RegisterUserDto, responce: Response) {
    const {username, password, email, phone_number} = registerDTO;


    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(phone_number)) {
        throw new BadRequestException("Phone number contains only number.");
      }

    if(phone_number.length != 10){
        throw new BadRequestException(`Mobile shold be 10 digit`)
    }
    const option:FindOneOptions<UserEntity> = {
        where: {email: email}
    }

    const isEmailExist = await this.repo.findOne(option)

   
   if (isEmailExist) {
    throw new BadRequestException('User already exist with this email!');
  }
    
    const hashed = await bcrypt.hash(password, 12);
    // const salt = await bcrypt.getSalt(hashed);

     const user = {
      username,
      email,
      password: hashed,
      phone_number,
    };

    const activation_code = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activation_code,
      },
      {
        secret: 'sourav',
        expiresIn: '5m',
      },
    );

    await this.emailService.sendMail({
      email,
      subject: 'Activate your account!',
      template: './activation-mail',
      username,
      activation_code,
    });


  return {messge: `we send a OTP with your registred email: ${email}. This OTP validate Only 5 min.`,token:token, }

  }

  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activation_token, activation_code } = activationDto;

    const newUser: { user: UserEntity; activation_code: string } = this.jwtService.verify(activation_token, { secret: ('sourav')} as JwtVerifyOptions) as { user: UserEntity; activation_code: string };

    if (newUser.activation_code !== activation_code) {
      throw new UnauthorizedException('Invalid activation code');
    }

    const { username, email, password, phone_number } = newUser.user;

    const option:FindOneOptions<UserEntity> = {
      where: {email: email}
    }

    const isEmailExist = await this.repo.findOne(option)

 
   if (isEmailExist) {
     throw new InternalServerErrorException('User already exist with this email!');
    }

    

    const user = await this.repo.create({
      username: username,
      email: email,
      password: password,
      phone_number: phone_number,
    });

    await this.repo.save(user)



    return { user, response };
  }

 
  async Login(loginDto: UserLoginDto) {
    const { email, password } = loginDto;
   

    const option:FindOneOptions<UserEntity> = {
      where: {email: email}
    }

    const user = await this.repo.findOne(option)

 
   if (!user) {
     throw new UnauthorizedException('User not found with this email!');
    }

    if (user && (await this.comparePassword(password, user.password))) {
      

      const jwtPayload = {sub: user.id, email:user.email}
      

      return {token: await this.jwtService.signAsync(jwtPayload), user: user}

    } else {
      return {
        user: null,
        error: {
          message: 'Invalid email or password',
        },
      };
    }
  }


   // compare with hashed password
   async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }


 


  


  

}
